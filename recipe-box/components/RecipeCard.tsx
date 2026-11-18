import type { Recipe } from "@/context/RecipesContext";
import type { CSSProperties } from "react";

type Props = {
  recipe: Recipe;
  onToggleFavorite?: (id: string) => void;
  onEdit?: (recipe: Recipe) => void;
  onDelete?: (id: string) => void;
  actionLabel?: string;
  onAction?: (recipe: Recipe) => void;
};

const CATEGORY_COLORS: Record<string, string> = {
  Breakfast: "#d18a00",
  Lunch: "#2f9d6a",
  Dinner: "#d9622b",
  Pasta: "#c8453b",
  Dessert: "#c2549c",
  Snack: "#4f7bd9",
};

function colorFor(category: string) {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  let h = 0;
  for (const c of category) h = (h * 31 + c.charCodeAt(0)) % 360;
  return `hsl(${h} 60% 45%)`;
}

// The Child component // 
export default function RecipeCard({
  recipe,
  onToggleFavorite,
  onEdit,
  onDelete,
  actionLabel,
  onAction,
}: Props) {
  return (
    <article className="card recipe-card">
      {recipe.image && (

        <img src={recipe.image} alt={recipe.title} loading="lazy" />
      )}
      <div className="body">
        <div className="row between">
          <h3>{recipe.title}</h3>
          {onToggleFavorite && (
            <button
              className="fav"
              onClick={() => onToggleFavorite(recipe.id)}
              aria-label={recipe.favorite ? "Remove from favorites" : "Add to favorites"}>
              {recipe.favorite ? "⭐" : "☆"}
            </button>
          )}
          
        </div>
        <div className="row">
          <span className="tag">{recipe.category}</span>
          {recipe.minutes > 0 && <span className="muted">⏱ {recipe.minutes} min</span>}
        </div>
        <p className="muted">
          <strong>Ingredients:</strong> {recipe.ingredients}
        </p>
        <div className="row" style={{ marginTop: "auto" }}>
          {onEdit && (
            <button className="btn small" onClick={() => onEdit(recipe)}>
              Edit
            </button>
          )}
          {onDelete && (
            <button className="btn small danger" onClick={() => onDelete(recipe.id)}>
              Delete
            </button>
          )}
          {onAction && actionLabel && (
            <button className="btn small primary" onClick={() => onAction(recipe)}>
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
