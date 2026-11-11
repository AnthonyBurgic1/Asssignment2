"use client";

import { useEffect, useState } from "react";
import type { Recipe } from "@/context/RecipesContext";

type FormValues = Omit<Recipe, "id" | "favorite">;

type Props = {
  editing: Recipe | null;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
};

const EMPTY: FormValues = { title: "", category: "Dinner", minutes: 30, ingredients: "", instructions: "" };
const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Pasta", "Dessert", "Snack", "Other"];

export default function RecipeForm({ editing, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<FormValues>(EMPTY);

  // When the parent selects a recipe to edit, load it into the form
  useEffect(() => {
    setValues(editing ? { ...editing } : EMPTY);
  }, [editing]);

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.title.trim()) return;
    onSubmit({ ...values, title: values.title.trim() });
    setValues(EMPTY);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2 style={{ marginTop: 0 }}>{editing ? "Edit recipe" : "Add a recipe"}</h2>
      <div className="form-grid">
        <div className="full">
          <label htmlFor="title">Title</label>
          <input id="title" required value={values.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select id="category" value={values.category} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="minutes">Minutes</label>
          <input
            id="minutes"
            type="number"
            min={0}
            value={values.minutes}
            onChange={(e) => set("minutes", Number(e.target.value))}
          />
        </div>
        <div className="full">
          <label htmlFor="ingredients">Ingredients (comma separated)</label>
          <input id="ingredients" value={values.ingredients} onChange={(e) => set("ingredients", e.target.value)} />
        </div>
        <div className="full">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            rows={4}
            value={values.instructions}
            onChange={(e) => set("instructions", e.target.value)}
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: "1rem" }}>
        <button className="btn primary" type="submit">
          {editing ? "Save changes" : "Add recipe"}
        </button>
        {editing && (
          <button className="btn" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
