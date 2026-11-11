"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "light" | "dark";

type SettingsValue = {
  cookName: string;
  setCookName: (name: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const SettingsContext = createContext<SettingsValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [cookName, setCookName] = useState("Chef");
  const [theme, setTheme] = useState<Theme>("light");
  const [loaded, setLoaded] = useState(false);

  // Load saved settings once on the client
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rb-settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.cookName) setCookName(parsed.cookName);
        if (parsed.theme === "light" || parsed.theme === "dark") setTheme(parsed.theme);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  // Persist settings and apply the theme to the <html> element
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (loaded) {
      localStorage.setItem("rb-settings", JSON.stringify({ cookName, theme }));
    }
  }, [cookName, theme, loaded]);

  return (
    <SettingsContext.Provider value={{ cookName, setCookName, theme, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside <SettingsProvider>");
  return ctx;
}
