import type { Recipe } from "@/context/RecipesContext";

type Props = {
  recipe: Recipe;
  onToggleFavorite?: (id: string) => void;
  onEdit?: (recipe: Recipe) => void;
  onDelete?: (id: string) => void;
  actionLabel?: string;
  onAction?: (recipe: Recipe) => void;
};

// Child component: the parent passes a recipe plus callbacks as props
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
        // eslint-disable-next-line @next/next/no-img-element
        <img src={recipe.image} alt={recipe.title} loading="lazy" />
      )}
      <div className="body">
        <div className="row between">
          <h3>{recipe.title}</h3>
          {onToggleFavorite && (
            <button
              className="fav"
              onClick={() => onToggleFavorite(recipe.id)}
              aria-label={recipe.favorite ? "Remove from favorites" : "Add to favorites"}
            >
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
