"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";

const LINKS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/recipes", label: "My Recipes", icon: "📖" },
  { href: "/discover", label: "Discover", icon: "🔍" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
  { href: "/about", label: "About", icon: "ℹ️" },
];

// Shared sidebar navigation (collapses into a top bar with a menu button on small screens)
export default function NavBar() {
  const pathname = usePathname();
  const { cookName } = useSettings();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="sidebar-head">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          🍲 Recipe Box
        </Link>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <ul className={`nav-list ${open ? "open" : ""}`}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={pathname === l.href ? "nav-link active" : "nav-link"}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden>{l.icon}</span> {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-foot">Cooking as <strong>{cookName}</strong></div>
    </nav>
  );
}
