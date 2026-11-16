npm# 🍲 Recipe Box

A multi-page Next.js (App Router) + TypeScript web app for saving, organizing and discovering recipes.

**Live site:** https://YOUR-APP-NAME.onrender.com  <!-- replace after deploying -->
**GitHub repo:** https://github.com/AnthonyBurgic1/Asssignment2 

## Purpose

The purpose of me building my website called 
Recipe Box lets you keep a personal collection of recipes, mark favorites, and discover new meals from a public API. Everything you add is stored in your browser's `localStorage`.

## Pages

| Route | Description |
Home: 
greeting, live stats and your favorite recipes 

Recipes: Add, edit, delete, favorite and search your recipes. 

Discover: Search meals from TheMealDB and save them to your box 

Settings: Set your name and light/dark theme 
(global context) 

About Page: Tells you about the project and what i used. 

## Requirements checklist

- create-next-app + TypeScript: Project follows the standard `create-next-app` structure.

- Next.js `Link` navigation: 'components/NavBar.tsx` (shared sidebar, collapses to a menu on mobile).

- useState: Context/RecipesContext.tsx` holds the recipe array and add / edit / delete / favorite actions.

- useEffect: loads/saves localStorage and triggers the API fetch.

- Props:`RecipeCard` and `StatBadge` receive data and callbacks from their parent pages.

- `fetch`: `app/discover/page.tsx` calls the [TheMealDB API](https://www.themealdb.com/api.php).

- Context: `context/SettingsContext.tsx` stores `cookName` and `theme`, set on the Settings page and read in the NavBar and Home page.

- Responsive styling: CSS variables, grid layouts, dark mode, mobile nav.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy on Render or Vercel 
