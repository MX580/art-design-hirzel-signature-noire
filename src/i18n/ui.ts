export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'fr';

/**
 * Toutes les infos ci-dessous marquées [À CONFIRMER] proviennent d’une lecture
 * publique du profil Instagram @artdesignbyhirzel et doivent être vérifiées /
 * complétées avec David avant mise en ligne (voir README.md).
 */
export const ui = {
  fr: {
    meta: {
      title: 'Art Design by Hirzel — Créations sur mesure en bois, métal & béton',
      description:
        "David Hirzel façonne des pièces uniques en bois, métal et béton dans son atelier vaudois : tables, planches à découper, armoires et créations sur mesure. Découvrez son travail et prenez contact.",
    },
    common: {
      skipToContent: 'Aller au contenu',
      langSwitch: 'EN',
      langSwitchLabel: 'Switch to English',
      instagramNewTab: 'Instagram (nouvel onglet)',
      openMenu: 'Ouvrir le menu',
      mainNav: 'Navigation principale',
      mobileNav: 'Navigation mobile',
    },
    nav: {
      about: 'À propos',
      skills: 'Savoir-faire',
      gallery: 'Réalisations',
      contact: 'Contact',
      cta: 'Discutons de votre projet',
    },
    hero: {
      kicker: 'Atelier de création — Bois · Métal · Béton — Vaud, Suisse',
      title: 'Des pièces uniques, façonnées à la main',
      quote: '« Métal & bois... l’association parfaite. »',
      lead: "David Hirzel imagine et façonne des créations sur mesure — tables, planches à découper, armoires, mobilier d’extérieur — en mêlant bois brut, métal et béton. Un savoir-faire artisanal, épaulé par des outils de précision modernes.",
      ctaPrimary: 'Voir les réalisations',
      ctaSecondary: 'Prendre contact',
      scroll: 'Découvrir',
      materialsBadge: 'Bois · Métal · Béton',
      materialsNote: 'Matières détournées, selon vos envies.',
    },
    about: {
      kicker: 'Qui je suis',
      title: 'David Hirzel — Founder, artiste, créateur',
      body: [
        "Passionné de matière depuis toujours, David Hirzel donne une seconde vie au bois, au métal et au béton dans son atelier, entre Genève et le canton de Vaud. Chaque pièce est pensée comme une création unique : rien n’est produit en série.",
        "Il aime détourner les matières selon les envies et les contraintes de chaque projet — une dalle de béton brut, une chute de métal, une pièce de bois massif — pour imaginer des objets qui n’existent nulle part ailleurs.",
        "Entre gestes traditionnels et outils de précision numérique (usinage CNC, découpe laser), sa signature tient en une phrase : des créations sur mesure, pensées avec vous, façonnées pour durer.",
      ],
      facts: [
        { label: 'Atelier', value: 'Genève / Vaud, Suisse' },
        { label: 'Matières', value: 'Bois, métal, béton' },
        { label: 'Approche', value: '100% sur mesure' },
        { label: 'Suivi', value: '1’900+ abonnés Instagram' },
      ],
      imageAlt: "L’atelier de David Hirzel, entre bois brut et outils de menuiserie",
    },
    skills: {
      kicker: 'Ce qui est possible',
      title: 'Des créations sur mesure, à votre image',
      lead: "Une envie précise ou juste une idée à dégrossir ensemble ? Voici un aperçu de ce que David peut imaginer et fabriquer pour vous.",
      items: [
        {
          title: 'Tables sur mesure',
          description: 'Bois massif, association bois-métal ou bois-béton : chaque table est pensée pour votre intérieur ou votre extérieur.',
        },
        {
          title: 'Planches à découper',
          description: 'Pièces uniques taillées dans la masse d’un bois massif — aussi belles que fonctionnelles, jamais deux identiques.',
        },
        {
          title: 'Armoires & rangements',
          description: 'Dressings, bibliothèques, meubles de rangement... conçus sur mesure, du dessin jusqu’à la pose.',
        },
        {
          title: 'Mobilier extérieur & foyers',
          description: 'Braseros, coins feu et structures en acier, pensés pour prolonger les soirées d’été.',
        },
        {
          title: 'Bois, métal & béton',
          description: 'Le mélange des matières comme signature : structures en acier soudé, plateaux en béton ciré, bois brut ou verni.',
        },
        {
          title: 'Créations sur demande',
          description: 'Une matière à détourner, un lieu atypique, une idée un peu folle ? Racontez-moi votre projet, on en parle.',
        },
      ],
    },
    gallery: {
      kicker: 'Le travail en images',
      title: 'Quelques réalisations de l’atelier',
      lead: "Un aperçu extrait du quotidien de l’atelier — la sélection complète et les dernières créations sont à suivre sur Instagram.",
      instagramCta: 'Suivre l’atelier sur Instagram',
      items: [
        { alt: 'Table sur mesure associant bois massif et structure en acier', caption: 'Métal & bois, l’association parfaite' },
        { alt: 'Planche à découper en bois massif, finition bout de fil', caption: 'Planche à découper, pièce unique' },
        { alt: 'Deux planches à découper en bois clair, forme galbée', caption: 'Planches à découper faites main' },
        { alt: 'Braise et flammes dans un foyer extérieur en acier', caption: 'Foyer & mobilier d’extérieur en acier' },
        { alt: 'Détail d’un piètement de table en acier soudé', caption: 'Précision des assemblages en acier' },
        { alt: 'Travail de finition à la main sur une pièce de bois brut', caption: 'Le geste, avant tout' },
      ],
    },
    contact: {
      kicker: 'Discutons',
      title: 'Une idée en tête ?\nParlons-en',
      lead: "Ce site est une vitrine du travail de David — il ne permet pas de commander en ligne. Pour toute question, demande de devis ou simple curiosité, écrivez-lui directement.",
      infoTitle: 'Coordonnées',
      email: 'contact@artdesignbyhirzel.ch',
      emailNote: '[À CONFIRMER avec David]',
      phone: '+41 00 000 00 00',
      phoneNote: '[À CONFIRMER avec David]',
      location: 'Vaud / Genève, Suisse',
      social: 'Réseaux sociaux',
      form: {
        name: 'Nom complet',
        namePlaceholder: 'Votre nom',
        email: 'E-mail',
        emailPlaceholder: 'vous@exemple.ch',
        subject: 'Sujet',
        subjectPlaceholder: 'Table sur mesure, planche à découper...',
        message: 'Message',
        messagePlaceholder: 'Décrivez votre projet, vos dimensions, vos envies de matières...',
        consent: "J’accepte que ces informations soient utilisées pour me recontacter au sujet de ma demande.",
        submit: 'Envoyer le message',
        submitting: 'Envoi en cours…',
        success: 'Merci ! Votre message a bien été envoyé, réponse à venir rapidement.',
        error: "Une erreur est survenue lors de l’envoi. Vous pouvez réessayer ou écrire directement à l’adresse e-mail ci-contre.",
        errorValidation: 'Merci de vérifier les champs du formulaire.',
      },
    },
    footer: {
      tagline: 'Créations sur mesure en bois, métal & béton — Genève / Vaud, Suisse.',
      nav: 'Navigation',
      legal: 'Informations légales',
      legalNotice: 'Mentions légales',
      privacy: 'Politique de confidentialité',
      rights: 'Tous droits réservés.',
      backToTop: 'Haut de page',
    },
    legalNotice: {
      title: 'Mentions légales',
      updated: 'Dernière mise à jour :',
      intro: "Conformément aux exigences légales suisses en matière de commerce électronique et de contenus commerciaux en ligne, les présentes mentions légales identifient l’éditeur de ce site.",
      sections: [
        {
          heading: 'Éditeur du site',
          body: [
            'Art Design by Hirzel',
            'David Hirzel, indépendant',
            '[Adresse complète à compléter]',
            '[Numéro IDE / registre du commerce, le cas échéant, à compléter]',
            '[À CONFIRMER avec David]',
          ],
        },
        {
          heading: 'Contact',
          body: ['E-mail : contact@artdesignbyhirzel.ch [À CONFIRMER]', 'Téléphone : [À CONFIRMER]'],
        },
        {
          heading: 'Hébergement',
          body: ['Infomaniak Network SA', 'Rue Eugène-Marziano 25, 1227 Les Acacias, Genève, Suisse', 'www.infomaniak.com'],
        },
        {
          heading: 'Propriété intellectuelle',
          body: [
            "L’ensemble des contenus de ce site (textes, photographies, logo, identité visuelle) est la propriété de David Hirzel / Art Design by Hirzel, sauf mention contraire. Toute reproduction, même partielle, est soumise à autorisation préalable.",
          ],
        },
        {
          heading: 'Limitation de responsabilité',
          body: [
            "Ce site est une vitrine à but informatif. Aucune commande ni transaction ne peut être passée directement sur le site. Malgré le soin apporté à sa réalisation, des erreurs ou omissions peuvent subsister ; David Hirzel décline toute responsabilité à ce titre.",
          ],
        },
      ],
    },
    privacy: {
      title: 'Politique de confidentialité',
      updated: 'Dernière mise à jour :',
      intro: "Cette politique explique quelles données sont traitées lors de votre visite sur ce site et via le formulaire de contact, conformément à la loi fédérale suisse sur la protection des données (nLPD).",
      sections: [
        {
          heading: 'Responsable du traitement',
          body: ['David Hirzel — Art Design by Hirzel', '[Adresse et e-mail à compléter — voir Mentions légales]'],
        },
        {
          heading: 'Formulaire de contact',
          body: [
            "Lorsque vous utilisez le formulaire de contact, votre nom, votre adresse e-mail et le contenu de votre message sont transmis par e-mail à David Hirzel dans le seul but de répondre à votre demande. Ces données ne sont ni revendues, ni utilisées à des fins publicitaires, ni conservées au-delà du temps nécessaire au traitement de votre demande.",
          ],
        },
        {
          heading: 'Cookies & mesure d’audience',
          body: [
            "Ce site n’utilise pas de cookies publicitaires ni de traceurs tiers. [À COMPLÉTER si un outil de statistiques respectueux de la vie privée est ajouté ultérieurement.]",
          ],
        },
        {
          heading: 'Liens vers des réseaux sociaux',
          body: [
            "Ce site contient des liens vers le profil Instagram d’Art Design by Hirzel. Une fois sur Instagram, votre navigation est soumise à la politique de confidentialité de Meta / Instagram, indépendante de ce site.",
          ],
        },
        {
          heading: 'Vos droits',
          body: [
            "Conformément à la nLPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données personnelles en écrivant à l’adresse de contact indiquée dans les Mentions légales.",
          ],
        },
      ],
    },
  },
  en: {
    meta: {
      title: 'Art Design by Hirzel — Custom wood, metal & concrete creations',
      description:
        'David Hirzel crafts one-of-a-kind wood, metal and concrete pieces in his workshop in Vaud, Switzerland: tables, cutting boards, cabinets and bespoke creations. Discover his work and get in touch.',
    },
    common: {
      skipToContent: 'Skip to content',
      langSwitch: 'FR',
      langSwitchLabel: 'Passer en français',
      instagramNewTab: 'Instagram (opens in a new tab)',
      openMenu: 'Open menu',
      mainNav: 'Main navigation',
      mobileNav: 'Mobile navigation',
    },
    nav: {
      about: 'About',
      skills: 'What I create',
      gallery: 'Work',
      contact: 'Contact',
      cta: "Let’s talk about your project",
    },
    hero: {
      kicker: 'Craft workshop — Wood · Metal · Concrete — Vaud, Switzerland',
      title: 'One-of-a-kind pieces, handcrafted',
      quote: '"Metal & wood... the perfect match."',
      lead: 'David Hirzel designs and builds bespoke creations — tables, cutting boards, cabinets, outdoor furniture — blending raw wood, metal and concrete. Traditional craftsmanship, backed by modern precision tools.',
      ctaPrimary: 'See the work',
      ctaSecondary: 'Get in touch',
      scroll: 'Discover',
      materialsBadge: 'Wood · Metal · Concrete',
      materialsNote: 'Materials repurposed, to fit your vision.',
    },
    about: {
      kicker: 'Who I am',
      title: 'David Hirzel — Founder, artist, creator',
      body: [
        "A lifelong lover of raw materials, David Hirzel gives wood, metal and concrete a second life in his workshop between Geneva and the canton of Vaud. Every piece is designed as a one-off — nothing is mass-produced.",
        'He enjoys repurposing materials to fit the mood and constraints of each project — a raw concrete slab, an offcut of metal, a solid piece of wood — to imagine objects that exist nowhere else.',
        'Between traditional gestures and modern precision tools (CNC machining, laser cutting), his signature comes down to one idea: bespoke creations, designed with you, built to last.',
      ],
      facts: [
        { label: 'Workshop', value: 'Geneva / Vaud, Switzerland' },
        { label: 'Materials', value: 'Wood, metal, concrete' },
        { label: 'Approach', value: '100% custom-made' },
        { label: 'Community', value: '1,900+ Instagram followers' },
      ],
      imageAlt: "David Hirzel’s workshop, surrounded by raw wood and joinery tools",
    },
    skills: {
      kicker: "What’s possible",
      title: 'Bespoke creations, made your way',
      lead: 'A precise idea, or just a concept to shape together? Here is a glimpse of what David can imagine and build for you.',
      items: [
        {
          title: 'Custom tables',
          description: 'Solid wood, wood-metal or wood-concrete pairings: every table is designed for your indoor or outdoor space.',
        },
        {
          title: 'Cutting boards',
          description: 'One-of-a-kind pieces carved from solid wood — as beautiful as they are functional, never quite the same twice.',
        },
        {
          title: 'Cabinets & storage',
          description: 'Wardrobes, bookshelves, storage furniture... designed to measure, from first sketch to final install.',
        },
        {
          title: 'Outdoor furniture & fire features',
          description: 'Fire pits, braziers and steel structures, built to make summer evenings last longer.',
        },
        {
          title: 'Wood, metal & concrete',
          description: 'Mixing materials as a signature move: welded steel structures, polished concrete tops, raw or varnished wood.',
        },
        {
          title: 'Custom requests',
          description: 'An unusual material, an odd-shaped space, a slightly wild idea? Tell me about your project — let’s talk.',
        },
      ],
    },
    gallery: {
      kicker: 'The work, in pictures',
      title: 'A few pieces from the workshop',
      lead: "A glimpse into the everyday life of the workshop — the full collection and latest creations are shared on Instagram.",
      instagramCta: 'Follow the workshop on Instagram',
      items: [
        { alt: 'Custom table pairing solid wood with a steel structure', caption: 'Metal & wood, the perfect match' },
        { alt: 'Solid wood cutting board with an end-grain finish', caption: 'One-of-a-kind cutting board' },
        { alt: 'Two light-wood cutting boards with a curved shape', caption: 'Handmade cutting boards' },
        { alt: 'Embers and flames inside a steel outdoor fire feature', caption: 'Steel fire features & outdoor furniture' },
        { alt: 'Detail of a welded steel table base', caption: 'Precision steel joinery' },
        { alt: 'Hand-finishing work on a raw wood piece', caption: 'The craft, above all' },
      ],
    },
    contact: {
      kicker: "Let’s talk",
      title: 'Got a project in mind?',
      lead: "This site is a showcase of David’s work — it does not take online orders. For any question, quote request, or simple curiosity, write to him directly.",
      infoTitle: 'Contact details',
      email: 'contact@artdesignbyhirzel.ch',
      emailNote: '[TO CONFIRM with David]',
      phone: '+41 00 000 00 00',
      phoneNote: '[TO CONFIRM with David]',
      location: 'Vaud / Geneva, Switzerland',
      social: 'Social media',
      form: {
        name: 'Full name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@example.com',
        subject: 'Subject',
        subjectPlaceholder: 'Custom table, cutting board...',
        message: 'Message',
        messagePlaceholder: 'Describe your project, dimensions, material preferences...',
        consent: 'I agree that this information may be used to respond to my request.',
        submit: 'Send message',
        submitting: 'Sending…',
        success: 'Thank you! Your message has been sent — you should hear back soon.',
        error: 'Something went wrong while sending. Please try again or email the address shown here directly.',
        errorValidation: 'Please check the form fields.',
      },
    },
    footer: {
      tagline: 'Custom wood, metal & concrete creations — Geneva / Vaud, Switzerland.',
      nav: 'Navigation',
      legal: 'Legal information',
      legalNotice: 'Legal notice',
      privacy: 'Privacy policy',
      rights: 'All rights reserved.',
      backToTop: 'Back to top',
    },
    legalNotice: {
      title: 'Legal notice',
      updated: 'Last updated:',
      intro: 'In accordance with Swiss legal requirements for e-commerce and commercial online content, this legal notice identifies the publisher of this website.',
      sections: [
        {
          heading: 'Site publisher',
          body: [
            'Art Design by Hirzel',
            'David Hirzel, self-employed / sole proprietor',
            '[Full address to be completed]',
            '[Business ID / trade register number, if applicable, to be completed]',
            '[TO CONFIRM with David]',
          ],
        },
        {
          heading: 'Contact',
          body: ['Email: contact@artdesignbyhirzel.ch [TO CONFIRM]', 'Phone: [TO CONFIRM]'],
        },
        {
          heading: 'Hosting',
          body: ['Infomaniak Network SA', 'Rue Eugène-Marziano 25, 1227 Les Acacias, Geneva, Switzerland', 'www.infomaniak.com'],
        },
        {
          heading: 'Intellectual property',
          body: [
            'All content on this site (text, photographs, logo, visual identity) is the property of David Hirzel / Art Design by Hirzel unless stated otherwise. Any reproduction, even partial, requires prior authorization.',
          ],
        },
        {
          heading: 'Limitation of liability',
          body: [
            'This site is an informational showcase. No order or transaction can be placed directly through the site. Despite the care taken in producing it, errors or omissions may remain; David Hirzel disclaims liability in that respect.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy policy',
      updated: 'Last updated:',
      intro: 'This policy explains what data is processed when you visit this site and use the contact form, in accordance with the Swiss Federal Act on Data Protection (nFADP).',
      sections: [
        {
          heading: 'Data controller',
          body: ['David Hirzel — Art Design by Hirzel', '[Address and email to be completed — see Legal notice]'],
        },
        {
          heading: 'Contact form',
          body: [
            'When you use the contact form, your name, email address and message content are sent by email to David Hirzel for the sole purpose of responding to your request. This data is not resold, not used for advertising, and not kept beyond the time needed to handle your request.',
          ],
        },
        {
          heading: 'Cookies & analytics',
          body: [
            'This site does not use advertising cookies or third-party trackers. [TO COMPLETE if a privacy-friendly analytics tool is added later.]',
          ],
        },
        {
          heading: 'Links to social media',
          body: [
            "This site links to Art Design by Hirzel’s Instagram profile. Once there, your browsing is subject to Meta/Instagram’s own privacy policy, independent of this site.",
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'Under the nFADP, you may request access to, correction of, or deletion of your personal data by writing to the contact address listed in the Legal notice.',
          ],
        },
      ],
    },
  },
} as const;
