import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function CitasLibro({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const { data: entry, error: entryError } = await insforge.database
    .from('entries')
    .select('title, author')
    .eq('id', resolvedParams.id)
    .single();

  const { data: quotes } = await insforge.database
    .from('quotes')
    .select('id, text, created_at')
    .eq('entry_id', resolvedParams.id)
    .order('created_at', { ascending: false });

  if (entryError || !entry) {
    notFound();
  }

  return (
    <main className="ml-0 md:ml-64 flex-1 p-6 md:p-16 xl:p-24 w-full font-display">
      <header className="mb-16 lg:mb-24">
        <Link href="/citas" className="flex items-center text-muted hover:text-text-main transition-colors duration-300 mb-8">
          <span className="material-symbols-outlined mr-2">arrow_back</span>
          <span className="font-mono text-[13px] tracking-widest uppercase">Volver a Páginas Marcadas</span>
        </Link>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-text-main">{entry.title}</h2>
        <p className="mt-2 text-lg text-stone-600 dark:text-stone-400 italic font-body">{entry.author}</p>
        <p className="mt-6 text-sm text-muted font-mono tracking-widest uppercase">
          {quotes?.length || 0} {quotes?.length === 1 ? 'cita' : 'citas'}
        </p>
      </header>

      {(!quotes || quotes.length === 0) && (
        <div className="text-center text-muted italic mt-12">
          No hay citas guardadas para este libro.
        </div>
      )}

      <div className="masonry-grid pb-24">
        {quotes?.map((quote) => (
          <div key={quote.id} className="masonry-item group p-6 -mx-6 rounded-sm transition-all duration-300 ease-in-out hover:bg-surface-card dark:hover:bg-surface hover:shadow-[0_10px_40px_rgba(44,36,27,0.05)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] cursor-default">
            <div className="border-l-[3px] border-primary pl-6 py-2">
              <blockquote className="quote-text text-text-main mb-6">
                &quot;{quote.text}&quot;
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
