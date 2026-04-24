"use client";

import Link from 'next/link';
import { useState, useRef, useEffect, use } from 'react';
import { insforge } from '@/lib/insforge';
import { useRouter } from 'next/navigation';

export default function EditarEntrada({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  
  const [keyLearnings, setKeyLearnings] = useState<string[]>(['']);
  const [quotes, setQuotes] = useState<string[]>(['']);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load entry data
  useEffect(() => {
    async function loadData() {
      const { data, error } = await insforge.database
        .from('entries')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();
        
      const { data: quotesData } = await insforge.database
        .from('quotes')
        .select('*')
        .eq('entry_id', resolvedParams.id);
        
      if (error) {
        alert("Error cargando la entrada: " + error.message);
      } else if (data) {
        setTitle(data.title || '');
        setAuthor(data.author || '');
        setDate(data.date_read || '');
        setContent(data.content || '');
        
        if (data.key_learnings && Array.isArray(data.key_learnings) && data.key_learnings.length > 0) {
          setKeyLearnings(data.key_learnings);
        }
        
        if (quotesData && quotesData.length > 0) {
          setQuotes(quotesData.map((q: any) => q.text));
        }
      }
      setIsLoading(false);
    }
    loadData();
  }, [resolvedParams.id]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content, isLoading]);

  const addKeyLearning = () => setKeyLearnings([...keyLearnings, '']);
  const updateKeyLearning = (index: number, value: string) => {
    const newKL = [...keyLearnings];
    newKL[index] = value;
    setKeyLearnings(newKL);
  };
  const removeKeyLearning = (index: number) => {
    setKeyLearnings(keyLearnings.filter((_, i) => i !== index));
  };

  const addQuote = () => setQuotes([...quotes, '']);
  const updateQuote = (index: number, value: string) => {
    const newQ = [...quotes];
    newQ[index] = value;
    setQuotes(newQ);
  };
  const removeQuote = (index: number) => {
    setQuotes(quotes.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title || !author || !date) {
      alert("Por favor completa el título, autor y fecha.");
      return; 
    }
    
    setIsSaving(true);
    
    const cleanKeyLearnings = keyLearnings.filter(kl => kl.trim() !== '');
    const cleanQuotes = quotes.filter(q => q.trim() !== '');
    
    try {
      const { data, error } = await insforge.database
        .from('entries')
        .update({ title, author, date_read: date, content, key_learnings: cleanKeyLearnings })
        .eq('id', resolvedParams.id);

      if (error) {
        console.error("Error actualizando entrada:", error);
        alert("Hubo un error al actualizar: " + error.message);
      } else {
        // Re-create quotes by first deleting existing and then inserting
        await insforge.database.from('quotes').delete().eq('entry_id', resolvedParams.id);
        
        if (cleanQuotes.length > 0) {
          const quotesToInsert = cleanQuotes.map(q => ({ text: q, entry_id: resolvedParams.id }));
          await insforge.database.from('quotes').insert(quotesToInsert);
        }

        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          router.push(`/libro/${resolvedParams.id}`);
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      console.error("Excepción inesperada:", err);
      alert("Error inesperado al guardar.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/libro/${resolvedParams.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center font-body ml-0 md:ml-64">
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative pb-48 font-body selection:bg-accent selection:text-white ml-0 md:ml-64 w-full">
      {/* Minimal Header / Back to Main */}
      <header className="w-full py-8 px-8 flex justify-between items-center sticky top-0 z-10 pointer-events-none">
        <Link href={`/libro/${resolvedParams.id}`} className="pointer-events-auto flex items-center gap-2 text-muted hover:text-primary transition-colors font-mono text-[13px] tracking-widest uppercase group">
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span>Volver a la ficha</span>
        </Link>
        <div className="font-heading italic text-muted opacity-50">Editando...</div>
      </header>

      {/* Main Drafting Canvas */}
      <main className="flex-grow flex justify-center pt-8 px-4">
        <div className="w-full max-w-[680px] relative">
          <article className="flex flex-col gap-8">
            {/* Title Input */}
            <div className="relative group">
              <input
                className={`editorial-input font-heading text-[48px] font-semibold leading-[1.2] text-primary w-full ${!title && isSaving ? 'border-b border-red-500' : ''}`}
                id="book-title"
                placeholder="Título del libro..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Author & Date Input */}
            <div className="flex items-center justify-between border-b border-muted/30 pb-4 gap-4">
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
                className="editorial-input font-body text-[18px] leading-[1.7] text-primary w-full resize-none overflow-hidden min-h-[150px]"
                placeholder="Comienza a escribir tu resumen..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            {/* Aprendizajes Clave Area */}
            <div className="mt-12 pt-8 border-t border-[#A8A39D]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-mono text-[13px] tracking-widest uppercase text-[#A8A39D]">Aprendizajes Clave</h2>
                <button onClick={addKeyLearning} className="text-primary hover:text-accent font-mono text-[13px] uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">add</span> Agregar
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {keyLearnings.map((kl, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-[#8B4513] mt-2">—</span>
                    <textarea
                      className="editorial-input font-body text-lg leading-relaxed text-[#2C241B] w-full resize-none"
                      rows={2}
                      placeholder="Escribe un aprendizaje clave..."
                      value={kl}
                      onChange={(e) => updateKeyLearning(idx, e.target.value)}
                    />
                    <button onClick={() => removeKeyLearning(idx)} className="text-[#A8A39D] hover:text-red-600 mt-2">
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Citas Area */}
            <div className="mt-12 pt-8 border-t border-[#A8A39D]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-mono text-[13px] tracking-widest uppercase text-[#A8A39D]">Citas Destacadas</h2>
                <button onClick={addQuote} className="text-primary hover:text-accent font-mono text-[13px] uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">add</span> Agregar
                </button>
              </div>
              <div className="flex flex-col gap-8">
                {quotes.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="material-symbols-outlined text-[#8B4513] mt-1 opacity-50">format_quote</span>
                    <textarea
                      className="editorial-input font-heading italic text-2xl text-[#8B4513] leading-relaxed w-full resize-none text-center bg-transparent"
                      rows={3}
                      placeholder="Escribe una cita memorable..."
                      value={q}
                      onChange={(e) => updateQuote(idx, e.target.value)}
                    />
                    <button onClick={() => removeQuote(idx)} className="text-[#A8A39D] hover:text-red-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
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
                <span>{isSaving ? 'Actualizando...' : 'Actualizar Entrada'}</span>
                {!isSaving && <span className="material-symbols-outlined text-[16px]">bookmark_add</span>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
