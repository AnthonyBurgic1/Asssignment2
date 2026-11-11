"use client";

import { useSettings } from "@/context/SettingsContext";
import { useRecipes } from "@/context/RecipesContext";

export default function SettingsPage() {
  const { cookName, setCookName, theme, setTheme } = useSettings();
  const { recipes, deleteRecipe } = useRecipes();

  const clearAll = () => {
    if (confirm(`Delete all ${recipes.length} recipes? This cannot be undone.`)) {
      recipes.forEach((r) => deleteRecipe(r.id));
    }
  };

  return (
    <>
      <h1>⚙️ Settings</h1>
      <p className="lead">Changes here update the whole app instantly (see the sidebar and Home page).</p>

      <div className="card" style={{ maxWidth: 520 }}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          value={cookName}
          onChange={(e) => setCookName(e.target.value)}
          maxLength={30}
        />

        <label htmlFor="theme" style={{ marginTop: "1rem" }}>Theme</label>
        <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value as "light" | "dark")}>
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
        </select>

        <hr style={{ margin: "1.5rem 0", border: 0, borderTop: "1px solid var(--border)" }} />
        <button className="btn danger" onClick={clearAll} disabled={recipes.length === 0}>
          Delete all recipes
        </button>
      </div>
    </>
  );
}
