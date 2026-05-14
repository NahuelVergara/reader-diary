import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { notFound } from 'next/navigation';
import DeleteButton from './DeleteButton';

export const revalidate = 0;

export default async function FichaLibro({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { data: book, error } = await insforge.database
    .from('entries')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  const { data: quotes } = await insforge.database
    .from('quotes')
    .select('*')
    .eq('entry_id', resolvedParams.id);

  if (error || !book) {
    notFound();
  }

  // The design expects text broken into paragraphs for drop-caps. We can split content by newlines.
  const contentParagraphs = book.content
    ? book.content.split('\n').filter((p: string) => p.trim() !== '')
    : [];

  return (
    <div className="flex-1 flex flex-col font-body bg-background-light text-text-main min-h-screen ml-0 md:ml-64 w-full items-center">
      <style dangerouslySetInnerHTML={{
        __html: `
        .drop-cap::first-letter {
            float: left;
            font-size: 4rem;
            line-height: 0.8;
            padding-top: 0.25rem;
            padding-right: 0.5rem;
            padding-left: 0;
            color: #8B4513; /* editorial-accent */
            font-family: 'Playfair Display', serif; /* heading */
            font-weight: 600;
        }
      `}} />

      {/* Header / Back Navigation */}
      <header className="w-full max-w-[800px] px-6 py-8 flex justify-between items-center box-border mt-8 md:mt-0">
        <Link href="/" className="flex items-center text-muted hover:text-text-main transition-colors duration-300">
          <span className="material-symbols-outlined mr-2">arrow_back</span>
          <span className="font-mono text-[13px] tracking-widest uppercase">Biblioteca</span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link href={`/editar-entrada/${book.id}`} className="font-mono text-[13px] tracking-widest uppercase text-text-main font-bold hover:text-accent transition-colors duration-300">
            Editar
          </Link>
          <span className="text-muted">|</span>
          <DeleteButton bookId={book.id} />
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[800px] px-6 pb-24 box-border flex flex-col gap-16">

        {/* PageHeading */}
        <div className="flex flex-col border-b border-muted pb-8 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold leading-tight text-text-main w-full md:w-2/3 whitespace-pre-wrap">
              {book.title}
            </h1>
            <div className="flex flex-col text-left md:text-right w-full md:w-1/3">
              <p className="font-mono text-muted text-[13px] tracking-widest uppercase mb-1">Autor</p>
              <p className="font-body text-text-main text-lg italic mb-4">{book.author}</p>
              <p className="font-mono text-muted text-[13px] tracking-widest uppercase mb-1">Leído en</p>
              <p className="font-mono text-text-main text-[13px] uppercase">{book.date_read || 'Desconocido'}</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="max-w-[680px] mx-auto w-full">
          <h2 className="font-mono text-[13px] tracking-widest uppercase text-muted mb-6">Resumen</h2>
          <div className="font-body text-lg leading-relaxed text-text-main space-y-6 whitespace-pre-wrap">
            {contentParagraphs.length > 0 ? (
              contentParagraphs.map((p: string, idx: number) => (
                <p key={idx} className={idx === 0 ? "drop-cap" : ""}>
                  {p}
                </p>
              ))
            ) : (
              <p className="italic text-muted">Sin contenido.</p>
            )}
          </div>
        </section>

        {/* Key Learnings Section (Dynamic) */}
        {book.key_learnings && Array.isArray(book.key_learnings) && book.key_learnings.length > 0 && (
          <section className="max-w-[680px] mx-auto w-full pl-0 md:pl-8 border-l-0 md:border-l border-accent">
            <h2 className="font-mono text-[13px] tracking-widest uppercase text-muted mb-6">Aprendizajes Clave</h2>
            <ul className="font-body text-lg leading-relaxed text-text-main space-y-4">
              {book.key_learnings.map((kl: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <span className="text-accent mr-3 mt-1">—</span>
                  <span className="whitespace-pre-wrap">{kl}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

      </main>

      {/* Quotes Section (Full Bleed - Dynamic) */}
      {quotes && quotes.length > 0 && (
        <section className="w-full bg-surface-card py-20 border-y border-muted">
          <div className="w-full max-w-[800px] mx-auto px-6 box-border flex flex-col items-center">
            <span className="material-symbols-outlined text-accent mb-8" style={{ fontSize: '2rem' }}>format_quote</span>
            <div className="w-full max-w-[600px] space-y-16">
              {quotes.map((quote: any, index: number) => (
                <div key={quote.id}>
                  <div className="text-center">
                    <p className="font-heading italic text-2xl text-accent leading-relaxed mb-4">
                      "{quote.text}"
                    </p>
                  </div>
                  {index < quotes.length - 1 && (
                    <div className="flex justify-center mt-16">
                      <div className="w-8 h-px bg-muted"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer Space */}
      <footer className="w-full h-24 bg-background-light"></footer>
    </div>
  );
}
