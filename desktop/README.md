# AlgoLab pour Windows (installateur)

Ce dossier construit l'installateur Windows `AlgoLab-Setup-<version>.exe`.

- Avec internet, l'application ouvre la version en ligne
  (`https://wahiba275.github.io/ALGO_LAB/app/`) : elle est toujours à jour et
  le Mode TP est relié à Firebase.
- Sans internet, elle ouvre la copie d'AlgoLab intégrée à l'installateur.

## Construire l'installateur

Prérequis : Node.js 18 ou plus récent.

```
cd desktop
npm install
npm run build
```

L'installateur est créé dans `desktop\dist\AlgoLab-Setup-<version>.exe`.

Avant chaque nouvelle version, changez `"version"` dans `package.json`
(par exemple `1.1.0` → `1.2.0`).

## Publier la nouvelle version

1. Sur GitHub : **Releases › Draft a new release**.
2. Tag : `v1.1.0` (le même numéro que dans `package.json`).
3. Glissez le fichier `AlgoLab-Setup-1.1.0.exe` dans la zone des fichiers.
4. **Publish release**.

Le bouton « Télécharger » du site récupère automatiquement le `.exe` de la
dernière release.

© 2026 Wahiba BOUZYAN
