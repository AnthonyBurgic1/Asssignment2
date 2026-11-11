import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { SettingsProvider } from "@/context/SettingsContext";
import { RecipesProvider } from "@/context/RecipesContext";

export const metadata: Metadata = {
  title: "Recipe Box",
  description: "Save, organize and discover recipes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SettingsProvider>
          <RecipesProvider>
            <div className="shell">
              <NavBar />
              <main className="content">{children}</main>
            </div>
          </RecipesProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
