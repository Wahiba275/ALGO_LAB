# Mode TP surveillé : guide de la formatrice

Le mode TP permet à chaque stagiaire de se connecter avec son prénom et son nom,
de rejoindre un TP avec un code, et de travailler dans AlgoLab pendant que la
formatrice suit tout en direct depuis l'**espace formatrice**.

- Application : `https://wahiba275.github.io/ALGO_LAB/app/`
- Espace formatrice : `https://wahiba275.github.io/ALGO_LAB/formatrice/`

---

## Ce que fait le mode TP

**Bloqué pendant le TP (avec un message d'erreur au stagiaire) :**

- l'accès aux autres fichiers : seul le fichier du TP est visible (les exemples
  seulement si la formatrice les autorise), pas de nouveau fichier ;
- le collage de texte venant de l'extérieur du fichier du TP (ChatGPT, Claude, sites
  web, documents…). Copier-coller *à l'intérieur* de l'éditeur reste permis ;
- le glisser-déposer de texte ;
- l'ouverture d'un fichier depuis l'ordinateur ;
- l'exécution d'un code qui contient des marques typiques d'une IA (blocs
  ```` ``` ````, « Voici l'algorithme… », texte en gras Markdown, nom d'un outil d'IA…).

**Signalé à la formatrice (notification en direct) :**

| Signalement | Gravité |
|---|---|
| Collage externe bloqué (le texte tenté est visible) | importante |
| Glisser-déposer bloqué | importante |
| Texte typique d'une IA dans le code | importante |
| Gros bloc de texte apparu d'un coup sans frappe | importante |
| A quitté la fenêtre AlgoLab (durée affichée) | moyenne, importante au-delà d'1 min |
| Frappe anormalement rapide (outil de saisie automatique) | moyenne |
| Tentative d'ouverture de fichier | moyenne |

Le code du stagiaire est enregistré automatiquement (toutes les 15 secondes
environ) et le bouton **Rendre le TP** envoie la version finale.

### Les limites, à connaître

Aucune application ne peut savoir quel site un stagiaire a ouvert ni prouver
qu'il a utilisé une IA. AlgoLab détecte des **signaux** : ce sont des indices
pour engager la discussion, pas des preuves. Un stagiaire qui recopie à la main
une réponse affichée sur son téléphone ne sera pas détecté.

Les stagiaires sont prévenus au début du TP que celui-ci est surveillé : c'est
plus transparent, et c'est aussi ce qui dissuade le plus.

---

## Les contrôles

Dans l'espace formatrice, **Nouveau → Un contrôle** :

1. Téléversez le **sujet en PDF** (5 Mo maximum). AlgoLab repère les titres
   « Exercice 1 (4 pts) », « Exercice 2 : … (6 points) »… et pré-remplit les
   exercices et le barème. Vérifiez et corrigez si besoin.
2. Fixez la **durée** (en minutes) et la **pénalité par tentative** (0,5 par défaut).
3. **Créer le contrôle** → donnez le code aux stagiaires (bouton « Afficher le code en grand »).

Côté stagiaire (AlgoLab → **Mode TP** → code du contrôle) :

- le contrôle passe en **plein écran** ; en sortir bloque l'écran jusqu'au retour ;
- le sujet PDF s'affiche dans la fenêtre (bouton **Sujet**) ;
- un fichier par exercice, exécution possible pour tester ;
- **tout copier-coller est désactivé** ;
- un compte à rebours s'affiche ; à la fin, la copie est **rendue automatiquement** ;
- une copie rendue ne peut plus être modifiée.

**Tentatives de triche pénalisées** (−0,5 chacune par défaut) : collage venant de
l'extérieur, glisser-déposer, sortie de la fenêtre ou du plein écran de plus de
5 secondes. Le stagiaire voit le nombre de tentatives dans sa barre.

**Correction** : bouton **Corriger** sur chaque stagiaire → saisissez les points de
chaque exercice et un commentaire. La note finale se calcule seule :
points − pénalités (jamais en dessous de 0). Une fausse alerte peut être annulée en
décochant la tentative.

**Copies en PDF** : bouton **PDF** (une copie) ou **Télécharger toutes les copies**
(un zip avec un PDF par stagiaire et un tableau des notes). Chaque PDF contient le
nom du stagiaire, le barème, l'énoncé et la réponse de chaque exercice, les points,
les commentaires, les tentatives de triche et la note finale.

> Pensez à **fermer le contrôle** à la fin : plus aucune copie ne peut alors être modifiée.

---

## Mise en place (une seule fois, environ 15 minutes)

Tant que Firebase n'est pas configuré, AlgoLab fonctionne en **mode démo** : tout
reste dans le navigateur. Pratique pour essayer (ouvrez l'application dans un
onglet et l'espace formatrice dans un autre), mais inutilisable avec une classe.

### 1. Créer le projet Firebase (gratuit)

1. Allez sur <https://console.firebase.google.com> avec votre compte Google.
2. **Créer un projet** → nom : `algolab` → vous pouvez désactiver Google Analytics.

### 2. Activer la connexion par mot de passe

1. Menu **Création › Authentication** → **Commencer**.
2. Onglet **Mode de connexion** → **Adresse e-mail/Mot de passe** → **Activer** → Enregistrer.

### 3. Créer la base de données

1. Menu **Création › Firestore Database** → **Créer une base de données**.
2. Emplacement : `eur3 (Europe)` ou `europe-west1` → **Démarrer en mode production**.

### 4. Coller les règles de sécurité

> Si vous aviez déjà publié des règles avant l'ajout des contrôles, recollez le
> nouveau fichier `firestore.rules` et publiez à nouveau (il ajoute le sujet PDF et
> les notes).

1. Dans Firestore, onglet **Règles**.
2. Remplacez tout le contenu par celui du fichier `firestore.rules` du dépôt.
3. Remplacez `VOTRE.ADRESSE@exemple.com` par **votre adresse e-mail**.
4. Cliquez sur **Publier**.

Ces règles garantissent que :
- un stagiaire ne voit que son propre travail, jamais celui des autres ;
- un stagiaire ne peut ni lire, ni modifier, ni effacer les signalements ;
- seule la formatrice (adresse vérifiée) voit tout et gère les TP.

### 5. Relier AlgoLab à votre projet

1. Roue dentée **Paramètres du projet** → section **Vos applications** → icône **`</>`** (Web).
2. Nom : `AlgoLab` → **Enregistrer l'application**.
3. Copiez les valeurs de `firebaseConfig` (apiKey, authDomain, projectId…).
4. Ouvrez `algolab-config.js` à la racine du dépôt, collez ces valeurs, et
   remplacez `formatriceEmail` par votre adresse (la même que dans les règles).
5. Envoyez le fichier modifié sur GitHub.

> La clé `apiKey` de Firebase n'est pas un secret : elle peut être publique.
> La sécurité vient des règles de l'étape 4.

### 6. Créer votre compte formatrice

1. Ouvrez l'espace formatrice → **Créer le compte formatrice**.
2. Choisissez un mot de passe → un e-mail de vérification arrive (pensez aux spams).
3. Cliquez sur le lien, revenez, puis **J'ai vérifié mon adresse**.

---

## Déroulement d'un TP

1. Dans l'espace formatrice : **Nouveau TP** → titre, groupe, énoncé → **Créer le TP**.
   Le code (par ex. `PGCD-4821`) s'affiche en grand : projetez-le.
2. Les stagiaires ouvrent AlgoLab → **Mode TP** → **Créer mon compte** (prénom,
   nom, groupe, mot de passe) → entrent le code → lisent les règles → **Commencer**.
3. Vous suivez en direct : stagiaires en ligne, code, rendus et alertes.
   Cliquez sur **Activer les notifications** pour être prévenue même si l'onglet
   est en arrière-plan, et laissez **Son** activé.
4. Cliquez sur un stagiaire pour voir son code et le détail de ses signalements
   (y compris le texte qu'il a tenté de coller).
5. À la fin : **Fermer le TP**, puis **Exporter (CSV)** pour garder une trace (s'ouvre dans Excel).

**Mot de passe oublié par un stagiaire :** Firebase › Authentication › Utilisateurs,
supprimez son compte ; il pourra en recréer un avec le même prénom et nom.

---

## Quotas gratuits

Le plan gratuit de Firebase (Spark) permet 20 000 écritures et 50 000 lectures
par jour. Une séance de 2 heures avec 30 stagiaires représente environ
10 000 écritures : c'est suffisant pour une à deux séances par jour.

## Données personnelles

AlgoLab enregistre uniquement : prénom, nom, groupe, le code écrit pendant le TP
et les signalements. Informez vos stagiaires de cette collecte (c'est fait
automatiquement au début de chaque TP) et supprimez les données en fin d'année
depuis la console Firebase.

---

AlgoLab · © 2026 Wahiba BOUZYAN
