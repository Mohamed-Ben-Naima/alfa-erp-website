// Shared by the FAQ section and its FAQPage structured data.
// Answers may contain simple inline HTML (links, <strong>).
export const faqs: { q: string; a: string }[] = [
  {
    q: 'Faut-il une connexion internet ?',
    a: "Non. Alfa ERP s'installe et fonctionne sur votre PC, sans internet. L'activation de la licence se fait aussi hors ligne, avec votre numéro de série.",
  },
  {
    q: 'Où sont stockées mes données ?',
    a: "Chez vous : sur votre PC avec l'édition Solo, sur un serveur dans vos locaux avec l'édition Entreprise. Elles ne partent sur aucun serveur externe, et nous n'y avons pas accès.",
  },
  {
    q: 'Que contient la version d\'essai ? Est-elle limitée ?',
    a: "Elle contient tout le logiciel. Au premier lancement, choisissez « Mode démo » : une société d'exemple est créée avec clients, fournisseurs, articles, factures et écritures. Un bandeau rappelle que vous êtes en démo. Quand vous activez votre licence, rien n'est perdu.",
  },
  {
    q: 'Quelle configuration faut-il ?',
    a: "Un PC sous Windows 10 ou Windows 11, 64 bits. Pour plusieurs postes (édition Entreprise), un PC ou un serveur de votre réseau accueille la base de données PostgreSQL ; nous l'installons sur place.",
  },
  {
    q: 'Windows affiche un avertissement pendant l\'installation. Est-ce normal ?',
    a: "Oui. Windows SmartScreen prévient pour tout logiciel récent qu'il ne connaît pas encore. Cliquez sur « Informations complémentaires », puis « Exécuter quand même ». Téléchargez Alfa ERP uniquement depuis ce site. <a href=\"/telecharger#installer\">Voir le guide d'installation</a>.",
  },
  {
    q: 'Alfa ERP respecte-t-il la fiscalité tunisienne ?',
    a: "Il est conçu pour : TVA à 19, 13 et 7 %, TVA sur les encaissements, matricule fiscal sur les factures, plan comptable tunisien et dinar à trois décimales. Ces paramètres restent modifiables. Comme pour tout logiciel, faites valider vos réglages par votre expert-comptable.",
  },
  {
    q: 'Je travaille sur Excel ou un autre logiciel. Puis-je reprendre mes données ?',
    a: "Envoyez-nous un exemple de vos fichiers actuels (clients, articles, fournisseurs) sur WhatsApp. Nous regardons avec vous comment les reprendre dans Alfa ERP à l'installation.",
  },
  {
    q: 'Puis-je gérer plusieurs sociétés ?',
    a: 'Oui. Chaque société a son propre dossier, avec sa comptabilité, son stock et ses numéros de facture. Vous passez de l\'une à l\'autre depuis le même poste.',
  },
  {
    q: 'Et si mon PC tombe en panne ?',
    a: "Alfa ERP crée des sauvegardes signées, puis les vérifie en relisant la copie. Gardez-en une copie sur une clé USB ou un disque externe. Pour restaurer sur un autre PC, contactez-nous : la signature est liée au poste par défaut et se configure pour plusieurs postes.",
  },
  {
    q: 'Comment se passent la formation et le support ?',
    a: "Par WhatsApp et par téléphone, avec l'équipe qui développe le logiciel. Nous installons Alfa ERP et vous formons, à distance ou sur place, et nous vous aidons à reprendre vos données. Les autres prestations sont sur devis.",
  },
];
