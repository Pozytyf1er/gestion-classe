# Gestion Classe

Application de gestion de classe avec cahier de presence, gestion d'effectif, notes et calcul de moyennes automatique.

## Fonctionnalites

- («Cahier de Présence � Gestion des présences au quotidien
- («Gestion d'Effectif * Manuel des eleves et attribution aux classes
- +*ëAttribution des Notes * Envestissement et suivi des notes par eleve
- «Calcul de Moyennes * Calcul automatique mensuel, trimestriel, annuel
- +*ëSysteme d'Observation * Notes et observations des enseignants

## Tech Stack

- **Frontend:** Next.js 14 + React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Prisma ORM + SQLite
- **Icons:** Lucide React

*# Installation

```bash
git clone https://github.com/Pozytyf1er/gestion-classe.git
cd gestion-classe
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Generer le schema Prisma
npm run db:generate

# Appliquer les migrations manuelles
npm run db:push

# Semer la base de données (optionnel)
npm run db:seed

# Lancer le serveur de développement
npm run dev
```

*# Utilisation
1. Connexez-vous à [http://localhost:3000](http://localhost:3000)
2. Commencez à gerer votre classe !

## Licence

MIT