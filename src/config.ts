// ─────────────────────────────────────────────────────────────────────────────
// Everything the team will want to change lives here: version, download link,
// contacts, prices, team. Values marked TODO are placeholders — replace them
// before announcing the site.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  url: 'https://alfa-erp-website-0wgx.onrender.com', // TODO: replace with the final domain once it is set on Render
  name: 'Alfa ERP',
  publisher: 'Alfa Computers & Consulting',
  city: 'Mahdia, Tunisie',
  locality: 'Mahdia',
  region: 'Gouvernorat de Mahdia',
  country: 'TN',
};

export const release = {
  version: '0.3.1',
  date: '2026-11',
  sizeLabel: '64 Mo',
  // SHA-256 of the published AlfaErp-Setup.exe, shown on /telecharger so users can check the file.
  sha256: 'F96BF0A6F67C33BC444DE328115EF3B91E21672D28A2C322B2656806EF0801B9',
  // Installer is hosted on GitHub Releases, never committed to the repo.
  downloadUrl:
    'https://github.com/Mohamed-Ben-Naima/alfa-erp-website/releases/latest/download/AlfaErp-Setup.exe',
  requirements: 'Windows 10 ou 11, 64 bits',
};

export const contact = {
  // International format without + or spaces, used to build wa.me links.
  whatsapp: '21625577542',
  phoneDisplay: '+216 25 577 542',
  phoneHref: '+21625577542',
  email: '', // TODO: public contact e-mail (hidden on the site while empty)
  hours: '', // TODO: support hours, e.g. 'Du lundi au samedi, 8 h – 18 h' (hidden while empty)
};

export function whatsappLink(message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  general: "Bonjour, je souhaite en savoir plus sur Alfa ERP pour mon entreprise.",
  demo: "Bonjour, j'aimerais une démonstration d'Alfa ERP.",
  solo: "Bonjour, je suis intéressé(e) par Alfa ERP Solo. Pouvez-vous m'envoyer les détails ?",
  enterprise: "Bonjour, je suis intéressé(e) par Alfa ERP Entreprise (plusieurs postes). Pouvez-vous me rappeler ?",
  install: "Bonjour, j'ai besoin d'aide pour installer Alfa ERP.",
  einvoice: "Bonjour, prévenez-moi quand la facture électronique El Fatoora sera disponible dans Alfa ERP.",
};

// Prices in DT HT. Set `price` to null to show "Sur devis" instead of a figure.
export const video = {
  src: '/media/alfa-erp-demo.mp4',
  poster: '/media/alfa-erp-demo-poster.jpg',
  captions: '/media/alfa-erp-demo.vtt',
  durationIso: 'PT2M5S',
  uploadDate: '2026-11-23',
  // Chapter starts in seconds, matching the scene cuts of the rendered video.
  chapters: [
    { t: 9, label: '0:09', title: 'Le tableau de bord' },
    { t: 21, label: '0:21', title: 'Créer un devis' },
    { t: 42, label: '0:42', title: 'Bon de commande, bon de livraison' },
    { t: 64, label: '1:04', title: 'La facture validée et comptabilisée' },
    { t: 89, label: '1:29', title: "L'écriture au journal des ventes" },
    { t: 104, label: '1:44', title: 'Stock et balance âgée' },
  ],
};

export const plans = [
  {
    id: 'solo',
    name: 'Solo',
    tagline: 'Pour un commerce ou un cabinet, sur un seul poste.',
    price: 1200 as number | null,
    priceNote: 'licence à vie, mises à jour incluses, HT',
    features: [
      'Un poste Windows, base de données intégrée',
      'Ventes, achats, stock, encaissements',
      'Comptabilité complète et déclaration de TVA',
      'Plusieurs sociétés sur le même PC',
      'Sauvegardes signées et vérifiables',
      'Installation et prise en main à distance',
      'Toutes les mises à jour incluses',
    ],
    message: 'solo' as const,
  },
  {
    id: 'entreprise',
    name: 'Entreprise',
    tagline: 'Pour une équipe : plusieurs postes, un serveur, des droits par métier.',
    price: null as number | null, // « Sur devis » until a figure is set
    priceNote: 'licence à vie, selon le nombre de postes, HT',
    features: [
      'Tout Solo, en réseau sur plusieurs postes',
      'Serveur PostgreSQL dans vos locaux',
      'Rôles : caissier, magasinier, comptable…',
      'Droits par module et séparation des tâches',
      'Installation sur site et formation',
      'Toutes les mises à jour incluses',
    ],
    message: 'enterprise' as const,
    featured: true,
  },
];

export const team = [
  {
    name: 'Ferid HELALI',
    role: "Auteur d'Alfa ERP", // TODO: Ferid's title, in his words
    line: '', // TODO: one sentence in Ferid's own words (hidden while empty)
    photo: '/team/ferid.webp', // TODO: add the photo (square, ≥ 400 px); a monogram shows until then
    linkedin: '', // optional
  },
  {
    name: 'Mohamed Ben Naima',
    role: "Auteur d'Alfa ERP", // TODO: Mohamed's title, in his words
    line: '', // TODO: one sentence in Mohamed's own words (hidden while empty)
    photo: '/team/mohamed.webp', // TODO: add the photo (square, ≥ 400 px)
    linkedin: '', // optional
  },
];
