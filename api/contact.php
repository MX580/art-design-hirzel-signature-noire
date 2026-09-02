<?php
/**
 * Point d'entrée du formulaire de contact — Art Design by Hirzel.
 *
 * Aucune dépendance externe (compatible hébergement mutualisé Infomaniak,
 * PHP natif uniquement). Reçoit le formulaire de la section #contact,
 * valide et assainit les champs, applique quelques garde-fous anti-spam,
 * puis envoie un e-mail à l'artisan.
 *
 * ⚠️ À CONFIGURER avant mise en ligne : voir la section CONFIGURATION
 * ci-dessous (adresse de réception) et le README.md du projet.
 */

declare(strict_types=1);

// Les erreurs ne doivent jamais fuiter vers le client (réponse JSON propre).
error_reporting(E_ALL);
ini_set('display_errors', '0');

// ---------------------------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------------------------

// Adresse qui reçoit les demandes de contact.
const CONTACT_RECIPIENT = 'contact@artdesignbyhirzel.ch'; // TODO: confirmer avec David

// Adresse d'expédition technique (doit idéalement être sur le même domaine
// que le site pour une meilleure délivrabilité — évite les filtres anti-spam
// qui rejettent un "From" ne correspondant pas au domaine d'envoi réel).
const MAIL_FROM = 'noreply@artdesignbyhirzel.ch'; // TODO: confirmer avec David
const MAIL_FROM_NAME = 'Art Design by Hirzel — Site web';

// Nombre maximal de soumissions acceptées par adresse IP sur la fenêtre ci-dessous.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 3600; // 1 heure

// Délai minimal (secondes) entre l'affichage du formulaire et son envoi.
// Les robots soumettent en général quasi instantanément.
const MIN_FILL_SECONDS = 3;

// ---------------------------------------------------------------------------
// EN-TÊTES DE RÉPONSE
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function respond(int $statusCode, bool $ok, string $message = ''): never
{
    http_response_code($statusCode);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------------------------------------------------------------------------
// MÉTHODE HTTP
// ---------------------------------------------------------------------------

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'method_not_allowed');
}

// ---------------------------------------------------------------------------
// LIMITATION DE DÉBIT (fichier, best-effort — fail-open en cas d'erreur)
// ---------------------------------------------------------------------------

function client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

function is_rate_limited(string $ip): bool
{
    $dir = __DIR__ . '/.rate-limit';
    if (!is_dir($dir)) {
        if (!@mkdir($dir, 0700, true) && !is_dir($dir)) {
            return false; // impossible de vérifier : on laisse passer plutôt que de bloquer un vrai client
        }
        // Empêche l'accès web direct au dossier de stockage.
        @file_put_contents($dir . '/.htaccess', "Require all denied\n");
    }

    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $now = time();
    $timestamps = [];

    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return false;
    }

    if (flock($handle, LOCK_EX)) {
        $raw = stream_get_contents($handle);
        if ($raw) {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                $timestamps = $decoded;
            }
        }

        // Ne garde que les soumissions dans la fenêtre glissante.
        $timestamps = array_values(array_filter(
            $timestamps,
            static fn($t) => is_int($t) && $t > $now - RATE_LIMIT_WINDOW_SECONDS
        ));

        $limited = count($timestamps) >= RATE_LIMIT_MAX;

        if (!$limited) {
            $timestamps[] = $now;
            ftruncate($handle, 0);
            rewind($handle);
            fwrite($handle, json_encode($timestamps));
        }

        flock($handle, LOCK_UN);
    }
    fclose($handle);

    return $limited;
}

if (is_rate_limited(client_ip())) {
    respond(429, false, 'rate_limited');
}

// ---------------------------------------------------------------------------
// LECTURE & ASSAINISSEMENT DES CHAMPS
// ---------------------------------------------------------------------------

function field(string $key, int $maxLength = 2000): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    // Retire les retours chariot/nouvelle ligne (protection contre l'injection
    // d'en-têtes e-mail) et les tags, puis coupe à une longueur raisonnable.
    $clean = str_replace(["\r", "\n"], ' ', $value);
    $clean = trim(strip_tags($clean));
    return mb_substr($clean, 0, $maxLength);
}

// Le message, lui, peut légitimement contenir des sauts de ligne.
function messageField(string $key, int $maxLength = 5000): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $clean = trim(strip_tags($value));
    return mb_substr($clean, 0, $maxLength);
}

$honeypot = field('company');
$renderedAt = (int) ($_POST['rendered_at'] ?? 0);

$name = field('name', 150);
$email = field('email', 254);
$subject = field('subject', 200);
$message = messageField('message', 5000);
$consent = isset($_POST['consent']) && $_POST['consent'] !== '';

// ---------------------------------------------------------------------------
// GARDE-FOUS ANTI-SPAM (échec silencieux : on répond succès sans envoyer)
// ---------------------------------------------------------------------------

$looksLikeSpam = false;

if ($honeypot !== '') {
    $looksLikeSpam = true;
}

if ($renderedAt > 0) {
    $elapsedMs = round(microtime(true) * 1000) - $renderedAt;
    if ($elapsedMs < MIN_FILL_SECONDS * 1000) {
        $looksLikeSpam = true;
    }
}

// Plus de deux URLs dans le message : forte odeur de spam de liens.
if (substr_count(strtolower($message), 'http://') + substr_count(strtolower($message), 'https://') > 2) {
    $looksLikeSpam = true;
}

if ($looksLikeSpam) {
    // On ne révèle jamais à un robot qu'il a été détecté.
    respond(200, true);
}

// ---------------------------------------------------------------------------
// VALIDATION
// ---------------------------------------------------------------------------

$errors = [];

if ($name === '' || mb_strlen($name) < 2) {
    $errors[] = 'name';
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}

if ($message === '' || mb_strlen($message) < 10) {
    $errors[] = 'message';
}

if (!$consent) {
    $errors[] = 'consent';
}

if (!empty($errors)) {
    respond(422, false, 'validation_failed:' . implode(',', $errors));
}

// ---------------------------------------------------------------------------
// ENVOI DE L'E-MAIL
// ---------------------------------------------------------------------------

// Retire, en plus des retours chariot déjà filtrés par field(), les caractères
// qui pourraient perturber la structure d'un en-tête "Nom <adresse>" (<, >, ",").
// Le nom original (non filtré) reste utilisé tel quel dans le corps du message.
function header_safe_display_name(string $value): string
{
    return trim(str_replace(['<', '>', '"', ','], '', $value));
}

function send_contact_email(string $name, string $email, string $subject, string $message): bool
{
    $to = CONTACT_RECIPIENT;
    $mailSubject = '[Site web] ' . ($subject !== '' ? $subject : 'Nouveau message de ' . $name);
    $safeName = header_safe_display_name($name) ?: 'Visiteur du site';

    $body = "Nouveau message reçu via le formulaire de contact du site.\n\n"
        . "Nom : {$name}\n"
        . "E-mail : {$email}\n"
        . "Sujet : " . ($subject !== '' ? $subject : '(non précisé)') . "\n\n"
        . "Message :\n{$message}\n";

    // From = domaine du site (délivrabilité) — l'adresse du visiteur est en
    // Reply-To, jamais dans From, pour éviter tout risque d'usurpation.
    $headers = [
        'From: ' . MAIL_FROM_NAME . ' <' . MAIL_FROM . '>',
        'Reply-To: ' . $safeName . ' <' . $email . '>',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion(),
    ];

    return @mail($to, $mailSubject, $body, implode("\r\n", $headers));
}

$sent = send_contact_email($name, $email, $subject, $message);

if (!$sent) {
    error_log('[contact.php] Échec envoi e-mail pour ' . $email);
    respond(502, false, 'send_failed');
}

respond(200, true);
