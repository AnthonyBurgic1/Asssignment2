"use client";

import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import RecipeForm from "@/components/RecipeForm";
import { Recipe, useRecipes } from "@/context/RecipesContext";

export default function RecipesPage() {
  const { recipes, loaded, addRecipe, updateRecipe, deleteRecipe, toggleFavorite } = useRecipes();
  const [editing, setEditing] = useState<Recipe | null>(null);
  const [query, setQuery] = useState("");

  const visible = recipes.filter((r) =>
    `${r.title} ${r.category} ${r.ingredients}`.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (values: Omit<Recipe, "id" | "favorite">) => {
    if (editing) {
      updateRecipe(editing.id, values);
      setEditing(null);
    } else {
      addRecipe(values);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this recipe?")) {
      deleteRecipe(id);
      if (editing?.id === id) setEditing(null);
    }
  };

  return (
    <>
      <h1>📖 My Recipes</h1>
      <p className="lead">Add, edit, favorite and delete — everything saves in your browser.</p>

      <RecipeForm editing={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />

      <h2>Your collection ({recipes.length})</h2>
      <input
        placeholder="Search by title, category or ingredient…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search recipes"
        style={{ marginBottom: "1rem" }}
      />

      {!loaded ? (
        <p className="muted">Loading…</p>
      ) : visible.length === 0 ? (
        <p className="empty card">No recipes match. Add one above!</p>
      ) : (
        <div className="grid">
          {visible.map((r) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              onToggleFavorite={toggleFavorite}
              onEdit={(rec) => {
                setEditing(rec);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}
