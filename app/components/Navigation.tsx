"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  // Helper function to determine if a route is active
  const isActive = (path: string) => pathname === path;

  // CSS classes based on active state
  const getDesktopLinkClasses = (path: string) => {
    const active = isActive(path);
    return `font-mono uppercase tracking-widest flex items-center gap-2 font-meta-label text-meta-label transition-all duration-200 scale-[0.99] active:scale-95 ${
      active
        ? "text-[#cf6317] dark:text-[#cf6317] before:content-['['] after:content-[']']"
        : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100/50 dark:hover:bg-stone-900/50"
    }`;
  };

  const getMobileLinkClasses = (path: string) => {
    const active = isActive(path);
    return `flex flex-col items-center gap-1 ${
      active
        ? "text-[#cf6317] dark:text-[#cf6317]"
        : "text-stone-500 hover:text-stone-900"
    }`;
  };

  return (
    <>
      {/* SideNavBar */}
      <nav className="fixed left-0 top-0 h-full flex-col py-12 px-8 w-64 border-r border-stone-300 dark:border-stone-800 bg-[#F9F6F0] dark:bg-stone-950 shadow-none z-10 hidden md:flex">
        <div className="mb-16">
          <h1 className="font-serif italic text-3xl text-stone-900 dark:text-stone-100 font-headline-lg text-headline-lg">Reader´s Diary</h1>
          <p className="font-meta-label text-meta-label text-stone-500 uppercase mt-2">Cuaderno editorial</p>
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
        <div className="mt-auto flex items-center gap-4 pt-8 border-t border-stone-300">
          <div className="w-10 h-10 rounded-full border border-stone-300 overflow-hidden bg-white">
            <img alt="Scholar's Portrait" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaYUeIMEwfbxQQ-Ln8V1hmooFhdRkAecmKNKNi7HMSTBAQiLcqZ8T3xUDE8Efno9IwKYofRXrAP3OIxhya31ewHDVlOfZ8hRlV52EJYH3eGnERUjU9YPWnCmMB4qaFrI-A7D7HtX6w29w39oI7xzhhjdmE9LUkOaooVQhW8nMasuiis-FAVsCqgPKBfY9jxp3OFaqlHJEiVlKwP-6tgMPnJJNMRgfRObLqNGx7vJsL0ND3zo_UGMZRNgNHnRs9GVxQJpoUDtL-JmIX" />
          </div>
          <div className="flex flex-col">
            <span className="font-meta-label text-meta-label text-stone-500">Facundo Vergara</span>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom NavBar (Hidden on md+) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-[#F9F6F0] border-t border-[#dec1b3] z-50 px-4 py-3 flex justify-around">
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
