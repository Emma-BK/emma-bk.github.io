# Déploiement sur GitHub Pages

## 1. Créer le dépôt sur GitHub

1. Allez sur https://github.com/new (connecté avec **Emma-BK**).
2. Nom du dépôt :
   - **Recommandé :** `emma-bk.github.io` → site sur `https://emma-bk.github.io`
   - Ou `portfolio` → site sur `https://emma-bk.github.io/portfolio/`
3. Laissez le dépôt **Public**.
4. **Ne cochez pas** « Initialize this repository with a README » (plus simple pour le premier envoi).
5. Cliquez sur **Create repository**.

## 2. Envoyer les fichiers depuis Windows

Ouvrez PowerShell et exécutez :

```powershell
cd C:\Users\lenovo\OneDrive\Bureau\portfolio
git init
git add .
git commit -m "Portfolio Fatima Boubker"
git branch -M main
git remote add origin https://github.com/Emma-BK/emma-bk.github.io.git
git push -u origin main
```

> Si vous avez choisi le dépôt `portfolio`, remplacez l'URL par :
> `https://github.com/Emma-BK/portfolio.git`

Si Git vous demande vos identifiants :
- **Username** : `Emma-BK`
- **Password** : un *Personal Access Token* (et non le mot de passe du compte).
  Générez-le ici : https://github.com/settings/tokens → **Generate new token (classic)** → cochez `repo` → copiez le token.
- Alternativement, installez le GitHub CLI (`winget install GitHub.cli`) puis `gh auth login`.

## 3. Activer GitHub Pages

Dans le dépôt GitHub :

1. **Settings** → **Pages** (dans la colonne de gauche).
2. **Build and deployment** → **Source** : **Deploy from a branch**.
3. **Branch** : `main` — dossier : **/ (root)**.
4. Cliquez sur **Save**.
5. Cochez aussi **Enforce HTTPS** une fois le site actif.

Attendez 1 à 2 minutes, puis ouvrez :
- `https://emma-bk.github.io` (dépôt `emma-bk.github.io`)
- ou `https://emma-bk.github.io/portfolio/` (dépôt `portfolio`)

## 4. Mettre à jour le site plus tard

Après chaque modification (CV, couleurs, projet...) :

```powershell
cd C:\Users\lenovo\OneDrive\Bureau\portfolio
git add .
git commit -m "Mise à jour du portfolio"
git push
```

GitHub Pages se met à jour automatiquement en quelques secondes.

## Vérifications

Tout est déjà prêt pour l'hébergement statique :
- `index.html`, `assets/styles.css`, `assets/script.js`, `assets/portrait.jpg`, `assets/favicon.svg`
- CV téléchargeable : `assets/Boubker_Fatima_CV.pdf`
- Liens `mailto:`, `tel:` et GitHub fonctionnels
- Aucun build, aucune dépendance, aucun serveur requis
