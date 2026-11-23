# Alfa ERP — site vitrine et téléchargement

Site statique (Astro) d'Alfa ERP, logiciel de gestion commerciale et comptable pour la Tunisie,
édité par Alfa Computers & Consulting. Déployé sur Render (static site, `render.yaml`).

## Développer

```bash
npm install
npm run dev        # http://localhost:4321
npm test           # règles de calcul de la facture (TVA, retenue à la source, arrondi au millime)
npm run build      # génère dist/
```

## Ce qu'il faut modifier avant la mise en ligne

Tout est centralisé dans `src/config.ts` (chercher `TODO`) :

- numéro WhatsApp, téléphone, e-mail, ville, horaires ;
- prix Solo / Entreprise (laisser `null` affiche « Sur devis ») ;
- fonctions et phrases de l'équipe ;
- lien et taille de l'installeur.

Photos de l'équipe : déposer `public/team/ferid.webp` et `public/team/mohamed.webp`
(carrées, 400 px minimum). Tant qu'elles manquent, un monogramme s'affiche.
Logo Alfa Computers : `public/brand/alfa-computers-logo.png`.

## Publier une nouvelle version du logiciel

L'installeur n'est jamais commité. Il est publié comme fichier d'une GitHub Release :

```bash
# dans ../alfa-erp
./build-installer.ps1                      # produit installer/Output/AlfaErp-Setup-<version>.exe
# puis, dans ce dépôt
cp ../alfa-erp/installer/Output/AlfaErp-Setup-<version>.exe AlfaErp-Setup.exe
gh release create v<version> AlfaErp-Setup.exe --title "Alfa ERP <version>"
```

Le lien `releases/latest/download/AlfaErp-Setup.exe` pointe toujours vers la dernière version.
Mettre à jour `release.version`, `sizeLabel` et `sha256` dans `src/config.ts`
(`Get-FileHash AlfaErp-Setup.exe` dans PowerShell) : la page /telecharger affiche l'empreinte.

**Sécurité de l'installeur.** `build-installer.ps1` publie avec `-p:AlfaShipDossierPacks=false` :
les packs de reprise (`Seeding/Packs`, données réelles d'Alfa Computers) ne sont pas embarqués.
Il compile sans chemin local (`-p:DebugType=none -p:ContinuousIntegrationBuild=true`, après un
`dotnet clean`), livre un `appsettings.json` sans les commentaires internes, et **refuse de
générer l'installeur** si l'exe contient encore un chemin local ou un fichier de pack de reprise.

## Sécurité du site

- CSP stricte : Astro écrit les empreintes de chaque script et style (`security.csp`), et
  `render.yaml` ajoute `frame-ancestors 'none'`, HSTS, `Permissions-Policy`, etc.
- Aucun script tiers, aucun cookie, aucune police chargée depuis Google (polices auto-hébergées).
- Ne jamais ajouter d'attribut `style="..."` ni de gestionnaire `onclick="..."` en ligne : la CSP les bloque.

## Vidéo de démonstration

`public/media/alfa-erp-demo.mp4` est filmée dans le vrai logiciel (société d'exemple), avec voix
off française générée hors ligne (Chatterbox Multilingual, licence MIT), chaque phrase contrôlée
par reconnaissance vocale (Whisper), sous-titres incrustés et `alfa-erp-demo.vtt`.
Pour une voix humaine, il suffit de remplacer la piste audio : le script et les minutages sont
dans `alfa-erp-demo.vtt`.
Les chapitres affichés sur la page sont dans `src/config.ts` (`video.chapters`).

## Règles de calcul (`src/lib/invoice.ts`)

Mêmes règles que le logiciel (profil TN) : TVA calculée par ligne, arrondi au millime
« half away from zero ». La retenue à la source (1,5 % du TTC dès 1 000 DT) est proposée sur le
site comme simulation et dans le calculateur : le logiciel la sait calculer (domaine testé) mais
aucun écran ne l'applique encore. Le droit de timbre n'est pas ajouté aux factures.
