"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const getDesktopLinkClasses = (path: string) => {
    const active = isActive(path);
    return `font-mono uppercase tracking-widest flex items-center gap-2 font-meta-label text-meta-label transition-all duration-200 scale-[0.99] active:scale-95 ${
      active
        ? "text-[#cf6317] dark:text-[#cf6317] before:content-['['] after:content-[']']"
        : "text-stone-500 dark:text-stone-400 hover:text-text-main dark:hover:text-stone-100 hover:bg-stone-100/50 dark:hover:bg-stone-900/50"
    }`;
  };

  const getMobileLinkClasses = (path: string) => {
    const active = isActive(path);
    return `flex flex-col items-center gap-1 ${
      active
        ? "text-[#cf6317] dark:text-[#cf6317]"
        : "text-stone-500 dark:text-stone-400 hover:text-text-main"
    }`;
  };

  return (
    <>
      <nav className="fixed left-0 top-0 h-full flex-col py-12 px-8 w-64 border-r border-muted dark:border-stone-800 bg-background-light shadow-none z-10 hidden md:flex">
        <div className="mb-16">
          <h1 className="font-serif italic text-3xl text-text-main font-headline-lg text-headline-lg">Reader´s Diary</h1>
          <p className="font-meta-label text-meta-label text-stone-500 dark:text-stone-400 uppercase mt-2">Cuaderno editorial</p>
        </div>
        <ul className="flex flex-col gap-6 flex-grow">
          <li>
            <Link className={getDesktopLinkClasses("/")} href="/">
              <span className="material-symbols-outlined text-[1.25rem]">menu_book</span>
              BIBLIOTECA
            </Link>
          </li>
          <li>
            <Link className={getDesktopLinkClasses("/citas")} href="/citas">
              <span className="material-symbols-outlined text-[1.25rem]">format_quote</span>
              CITAS
            </Link>
          </li>
          <li>
            <Link className={getDesktopLinkClasses("/nueva-entrada")} href="/nueva-entrada">
              <span className="material-symbols-outlined text-[1.25rem]">edit_note</span>
              NUEVA ENTRADA
            </Link>
          </li>
        </ul>
        <div className="mt-auto flex items-center gap-4 pt-8 border-t border-muted dark:border-stone-800">
          <div className="w-10 h-10 rounded-full border border-muted overflow-hidden bg-surface-card">
            <img alt="Scholar's Portrait" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaYUeIMEwfbxQQ-Ln8V1hmooFhdRkAecmKNKNi7HMSTBAQiLcqZ8T3xUDE8Efno9IwKYofRXrAP3OIxhya31ewHDVlOfZ8hRlV52EJYH3eGnERUjU9YPWnCmMB4qaFrI-A7D7HtX6w29w39oI7xzhhjdmE9LUkOaooVQhW8nMasuiis-FAVsCqgPKBfY9jxp3OFaqlHJEiVlKwP-6tgMPnJJNMRgfRObLqNGx7vJsL0ND3zo_UGMZRNgNHnRs9GVxQJpoUDtL-JmIX" />
          </div>
          <div className="flex flex-col">
            <span className="font-meta-label text-meta-label text-stone-500 dark:text-stone-400">Facundo Vergara</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 w-full bg-background-light border-t border-outline-variant z-50 px-4 py-3 flex justify-around">
        <Link className={getMobileLinkClasses("/")} href="/">
          <span className="material-symbols-outlined text-[1.5rem]" style={isActive("/") ? { fontVariationSettings: "'FILL' 1" } : {}}>menu_book</span>
          <span className="font-meta-label text-[10px] tracking-widest">BIBLIOTECA</span>
        </Link>
        <Link className={getMobileLinkClasses("/citas")} href="/citas">
          <span className="material-symbols-outlined text-[1.5rem]" style={isActive("/citas") ? { fontVariationSettings: "'FILL' 1" } : {}}>format_quote</span>
          <span className="font-meta-label text-[10px] tracking-widest">CITAS</span>
        </Link>
        <Link className={getMobileLinkClasses("/nueva-entrada")} href="/nueva-entrada">
          <span className="material-symbols-outlined text-[1.5rem]" style={isActive("/nueva-entrada") ? { fontVariationSettings: "'FILL' 1" } : {}}>edit_note</span>
          <span className="font-meta-label text-[10px] tracking-widest">NUEVA ENTRADA</span>
        </Link>
      </nav>
    </>
  );
}
