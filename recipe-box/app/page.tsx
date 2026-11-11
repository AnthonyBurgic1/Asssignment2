"use client";

import Link from "next/link";
import StatBadge from "@/components/StatBadge";
import RecipeCard from "@/components/RecipeCard";
import { useRecipes } from "@/context/RecipesContext";
import { useSettings } from "@/context/SettingsContext";

export default function HomePage() {
  const { recipes, loaded, toggleFavorite } = useRecipes();
  const { cookName } = useSettings();

  const favorites = recipes.filter((r) => r.favorite);
  const avgMinutes = recipes.length
    ? Math.round(recipes.reduce((sum, r) => sum + r.minutes, 0) / recipes.length)
    : 0;
  const categories = new Set(recipes.map((r) => r.category)).size;

  return (
    <>
      <h1>Welcome back, {cookName}! 👋</h1>
      <p className="lead">Your personal recipe collection, always within reach.</p>

      <div className="row">
        <Link href="/recipes" className="btn primary">Add a recipe</Link>
        <Link href="/discover" className="btn">Find new ideas</Link>
      </div>

      <div className="stats">
        <StatBadge label="Recipes saved" value={loaded ? recipes.length : "…"} />
        <StatBadge label="Favorites" value={loaded ? favorites.length : "…"} />
        <StatBadge label="Categories" value={loaded ? categories : "…"} />
        <StatBadge label="Avg. minutes" value={loaded ? avgMinutes : "…"} />
      </div>

      <h2>⭐ Your favorites</h2>
      {favorites.length === 0 ? (
        <p className="empty card">No favorites yet — tap the star on any recipe.</p>
      ) : (
        <div className="grid">
          {favorites.map((r) => (
            <RecipeCard key={r.id} recipe={r} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </>
  );
}
