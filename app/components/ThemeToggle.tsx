"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      className="w-10 h-10 rounded-full border border-muted overflow-hidden flex items-center justify-center bg-transparent hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <span className="material-symbols-outlined text-[1.25rem] text-muted">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
