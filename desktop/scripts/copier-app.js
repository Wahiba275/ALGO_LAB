// Copie l'application AlgoLab (dossier app/ du dépôt) dans desktop/www avant la construction.
const fs = require('fs');
const path = require('path');

const racine = path.join(__dirname, '..', '..');
const www = path.join(__dirname, '..', 'www');
const copies = [
  [path.join(racine, 'app', 'index.html'), path.join(www, 'app', 'index.html')],
  [path.join(racine, 'algolab-config.js'), path.join(www, 'algolab-config.js')],
  [path.join(__dirname, '..', 'build', 'icon.png'), path.join(www, 'icon.png')]
];
for (const [de, vers] of copies) {
  if (!fs.existsSync(de)) {
    console.error(`Fichier introuvable : ${de}\nLancez cette commande depuis le dossier desktop du dépôt ALGO_LAB.`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(vers), { recursive: true });
  fs.copyFileSync(de, vers);
  console.log('copié :', path.relative(racine, vers));
}
