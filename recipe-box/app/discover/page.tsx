"use client";

import { FormEvent, useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { Recipe, useRecipes } from "@/context/RecipesContext";

// TheMealDB: free public API, no key required // 
const API = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

type Meal = Record<string, string | null>;

function mealToRecipe(m: Meal): Recipe {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = m[`strIngredient${i}`]?.trim();
    const measure = m[`strMeasure${i}`]?.trim();
    if (name) ingredients.push(measure ? `${measure} ${name}` : name);
  }
  return {
    id: `api-${m.idMeal}`,
    title: m.strMeal ?? "Untitled",
    category: m.strCategory ?? "Other",
    minutes: 0,
    ingredients: ingredients.join(", "),
    instructions: m.strInstructions ?? "",
    image: m.strMealThumb ?? undefined,
    favorite: false,
  };
}

export default function DiscoverPage() {
  const { recipes, addRecipe } = useRecipes();
  const [term, setTerm] = useState("chicken");
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch whenever the active search term changes
  const [active, setActive] = useState("chicken");
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API + encodeURIComponent(active));
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        if (!cancelled) setResults((data.meals ?? []).map(mealToRecipe));
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [active]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (term.trim()) setActive(term.trim());
  };

  const alreadySaved = (r: Recipe) => recipes.some((x) => x.title === r.title);

  const save = (r: Recipe) => {
    if (alreadySaved(r)) return;
    addRecipe({
      title: r.title,
      category: r.category,
      minutes: r.minutes,
      ingredients: r.ingredients,
      instructions: r.instructions,
      image: r.image,
    });
  };

  return (
    <>
      <h1>🔍 Discover</h1>
      <p className="lead">Search thousands of meals from TheMealDB and save them to your box.</p>

      <form className="row" onSubmit={onSearch} style={{ marginBottom: "1.5rem" }}>
        <input
          style={{ flex: 1, minWidth: 200 }}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Try pasta, beef, salmon…"
          aria-label="Search meals"
        />
        <button className="btn primary" type="submit">Search</button>
      </form>

      {loading && <p className="muted">Loading recipes…</p>}
      {error && <p className="error">Could not load recipes: {error}</p>}
      {!loading && !error && results.length === 0 && (
        <p className="empty card">No meals found for “{active}”.</p>
      )}

      <div className="grid">
        {results.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            actionLabel={alreadySaved(r) ? "✓ Saved" : "Save to my box"}
            onAction={save}
          />
        ))}
      </div>
    </>
  );
}
