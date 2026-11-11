"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Recipe = {
  id: string;
  title: string;
  category: string;
  minutes: number;
  ingredients: string;
  instructions: string;
  image?: string;
  favorite: boolean;
};

type RecipesValue = {
  recipes: Recipe[];
  loaded: boolean;
  addRecipe: (r: Omit<Recipe, "id" | "favorite">) => void;
  updateRecipe: (id: string, changes: Partial<Omit<Recipe, "id">>) => void;
  deleteRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
};

const STORAGE_KEY = "rb-recipes";

const STARTER_RECIPES: Recipe[] = [
  {
    id: "starter-1",
    title: "Garlic Butter Pasta",
    category: "Pasta",
    minutes: 20,
    ingredients: "Spaghetti, garlic, butter, parmesan, parsley",
    instructions: "Boil pasta. Melt butter with garlic, toss with pasta, finish with parmesan and parsley.",
    favorite: true,
  },
  {
    id: "starter-2",
    title: "Sheet Pan Chicken & Veg",
    category: "Dinner",
    minutes: 45,
    ingredients: "Chicken thighs, potatoes, carrots, olive oil, paprika",
    instructions: "Toss everything in oil and paprika, roast at 425°F for 35–40 minutes.",
    favorite: false,
  },
];

const RecipesContext = createContext<RecipesValue | undefined>(undefined);

// Stateful component that owns all recipe data (useState + localStorage)
export function RecipesProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setRecipes(saved ? (JSON.parse(saved) as Recipe[]) : STARTER_RECIPES);
    } catch {
      setRecipes(STARTER_RECIPES);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes, loaded]);

  const addRecipe: RecipesValue["addRecipe"] = (r) => {
    const id = `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setRecipes((prev) => [{ ...r, id, favorite: false }, ...prev]);
  };

  const updateRecipe: RecipesValue["updateRecipe"] = (id, changes) =>
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...changes } : r)));

  const deleteRecipe = (id: string) => setRecipes((prev) => prev.filter((r) => r.id !== id));

  const toggleFavorite = (id: string) =>
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r)));

  return (
    <RecipesContext.Provider
      value={{ recipes, loaded, addRecipe, updateRecipe, deleteRecipe, toggleFavorite }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error("useRecipes must be used inside <RecipesProvider>");
  return ctx;
}
