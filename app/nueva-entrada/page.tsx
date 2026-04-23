"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function NuevaEntrada() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('10/2023');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSave = () => {
    if (!title) return; // simple validation
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setTitle('');
    setAuthor('');
    setDate('');
    setContent('');
  };

  return (
    <div className="flex-1 flex flex-col relative pb-32 font-body selection:bg-accent selection:text-white ml-0 md:ml-64 w-full">
      {/* Minimal Header / Back to Main */}
      <header className="w-full py-8 px-8 flex justify-between items-center sticky top-0 z-10 pointer-events-none">
        <Link href="/" className="pointer-events-auto flex items-center gap-2 text-muted hover:text-primary transition-colors font-mono text-[13px] tracking-widest uppercase group">
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span>Volver</span>
        </Link>
        <div className="font-heading italic text-muted opacity-50">Borrador</div>
      </header>

      {/* Main Drafting Canvas */}
      <main className="flex-grow flex justify-center pt-16 px-4">
        <div className="w-full max-w-[680px] relative">
          {/* Contextual Adder Button (Hover in margin) */}
          <div className="absolute -left-12 top-48 hidden md:flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-muted hover:text-accent">
            <span className="material-symbols-outlined text-2xl">add</span>
          </div>
          <article className="flex flex-col gap-8">
            {/* Title Input */}
            <div className="relative group">
              <input
                className={`editorial-input font-heading text-[48px] font-semibold leading-[1.2] text-primary ${!title && isSaving ? 'input-error' : ''}`}
                id="book-title"
                placeholder="Título del libro..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Author & Date Input */}
            <div className="flex items-center justify-between border-b border-muted/30 pb-4">
              <input
                className="editorial-input font-mono text-[18px] text-primary w-2/3"
                placeholder="Autor..."
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <input
                className="editorial-input font-mono text-[13px] tracking-widest uppercase text-muted text-right w-1/3"
                placeholder="MM/AAAA"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Editor Area */}
            <div className="mt-8 relative">
              <textarea
                ref={textareaRef}
                className="editorial-input font-body text-[18px] leading-[1.7] text-primary w-full resize-none overflow-hidden"
                placeholder="Comienza a escribir tu resumen..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </article>
        </div>
      </main>

      {/* Floating Action Bar */}
      <div className="fixed bottom-24 md:bottom-12 left-1/2 md:left-[calc(50%+8rem)] -translate-x-1/2 z-20">
        <div className="bg-surface border border-primary px-8 py-4 shadow-float flex items-center gap-6 transition-all">
          {saved ? (
            <div className="font-mono text-[14px] font-bold uppercase tracking-wider text-green-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Guardado</span>
            </div>
          ) : (
            <>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="font-mono text-[14px] font-bold uppercase tracking-wider text-muted hover:text-primary transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <div className="w-px h-4 bg-muted/30"></div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="font-mono text-[14px] font-bold uppercase tracking-wider text-primary hover:text-accent transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <span>{isSaving ? 'Guardando...' : 'Guardar Entrada'}</span>
                {!isSaving && <span className="material-symbols-outlined text-[16px]">bookmark_add</span>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
