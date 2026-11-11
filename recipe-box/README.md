npm# 🍲 Recipe Box

A multi-page Next.js (App Router) + TypeScript web app for saving, organizing and discovering recipes.

**Live site:** https://YOUR-APP-NAME.onrender.com  <!-- replace after deploying -->
**GitHub repo:** https://github.com/YOUR-USERNAME/recipe-box  <!-- replace after pushing -->

## Purpose

Recipe Box lets you keep a personal collection of recipes, mark favorites, and discover new meals from a public API. Everything you add is stored in your browser's `localStorage`.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home: greeting, live stats and your favorite recipes |
| `/recipes` | Add, edit, delete, favorite and search your recipes |
| `/discover` | Search meals from TheMealDB and save them to your box |
| `/settings` | Set your name and light/dark theme (global context) |
| `/about` | About the project |

## Requirements checklist

- **create-next-app + TypeScript:** project follows the standard `create-next-app` structure.
- **Next.js `Link` navigation:** `components/NavBar.tsx` (shared sidebar, collapses to a menu on mobile).
- **`useState`:** `context/RecipesContext.tsx` holds the recipe array and add / edit / delete / favorite actions.
- **`useEffect`:** loads/saves localStorage and triggers the API fetch.
- **Props:** `RecipeCard` and `StatBadge` receive data and callbacks from their parent pages.
- **`fetch`:** `app/discover/page.tsx` calls the [TheMealDB API](https://www.themealdb.com/api.php).
- **Context:** `context/SettingsContext.tsx` stores `cookName` and `theme`, set on the Settings page and read in the NavBar and Home page.
- **Responsive styling:** CSS variables, grid layouts, dark mode, mobile nav.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy on Render

1. Push the repo to GitHub.
2. In Render, create a **Web Service** from the repo.
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Paste the resulting URL at the top of this README.
