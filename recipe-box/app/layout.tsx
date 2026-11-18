import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { SettingsProvider } from "@/context/SettingsContext";
import { RecipesProvider } from "@/context/RecipesContext";
import { ToastProvider } from "@/context/ToastContext";
import AnimatedBackground from "@/components/AnimatedBackground";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Recipe Box",
  description: "Save, organize and discover recipes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <html lang="en" className={fraunces.variable} suppressHydrationWarning>
  
  <body>
    <SettingsProvider>
    <RecipesProvider>
    <ToastProvider>
    <AnimatedBackground />
    
    <div className="shell">
    
    <NavBar />
    
    <main className="content">

    {children}
                  
    <footer className="footer">
      Made with Recipes from{" "} <a href="https://www.themealdb.com" target="_blank" rel="noreferrer"> <u>TheMealDB</u> </a>
      
      </footer>
      </main>
        </div>
    </ToastProvider>
    </RecipesProvider>
    </SettingsProvider>
      </body>
    </html>
  );
}
