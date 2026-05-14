import Link from 'next/link';
import { insforge } from '@/lib/insforge';

export const revalidate = 0;

export default async function Citas() {
  const { data: quotes, error } = await insforge.database
    .from('quotes')
    .select('id, text, entry_id, entries(title, author)')
    .order('created_at', { ascending: false });

  const booksWithQuotes: Record<string, {
    entry_id: string;
    title: string;
    author: string;
    quotes: { id: string; text: string }[];
  }> = {};

  quotes?.forEach((quote) => {
    const entry = quote.entries as { title?: string; author?: string } | null;
    const key = quote.entry_id;
    if (!booksWithQuotes[key]) {
      booksWithQuotes[key] = {
        entry_id: key,
        title: entry?.title || 'Desconocido',
        author: entry?.author || 'Desconocido',
        quotes: [],
      };
    }
    booksWithQuotes[key].quotes.push({ id: quote.id, text: quote.text });
  });

  const sortedBooks = Object.values(booksWithQuotes).sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <main className="ml-0 md:ml-64 flex-1 p-6 md:p-16 xl:p-24 w-full font-display">
      <header className="mb-16 lg:mb-24">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-text-main">Páginas Marcadas</h2>
        <p className="mt-4 text-lg text-stone-600 dark:text-stone-400 max-w-2xl italic font-body">
          Una colección de fragmentos, pensamientos y resonancias encontradas entre páginas.
        </p>
      </header>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-4 rounded mb-8">
          Error al cargar las citas: {error.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pb-24 items-start">
        {sortedBooks.map((book, index) => {
          const mtClasses = ['lg:mt-0', 'lg:mt-12', 'lg:mt-6', 'lg:mt-16', 'lg:mt-4'];
          const mtClass = mtClasses[index % mtClasses.length];
          const previewQuote = book.quotes[0]?.text;

          return (
            <Link
              key={book.entry_id}
              href={`/citas/${book.entry_id}`}
              className={`group cursor-pointer ${mtClass}`}
            >
              <article className="border border-muted bg-surface-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(44,36,27,0.06)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-xl font-semibold text-text-main leading-tight group-hover:text-primary transition-colors truncate">
                      {book.title}
                    </h3>
                    <p className="font-meta-label text-meta-label text-on-surface-variant uppercase mt-1 truncate">
                      {book.author}
                    </p>
                  </div>
                  <span className="font-mono text-[12px] tracking-widest text-muted flex items-center gap-1 shrink-0 ml-4">
                    <span className="material-symbols-outlined text-[16px]">format_quote</span>
                    {book.quotes.length}
                  </span>
                </div>

                {previewQuote && (
                  <>
                    <div className="w-8 h-px bg-muted/50 mb-4"></div>
                    <blockquote className="font-display italic text-[0.95rem] leading-relaxed text-stone-600 dark:text-stone-400 flex-1 line-clamp-4">
                      &quot;{previewQuote}&quot;
                    </blockquote>
                  </>
                )}
              </article>
            </Link>
          );
        })}
      </div>

      {sortedBooks.length === 0 && !error && (
        <div className="text-center text-muted italic mt-12">
          No hay citas guardadas aún.
        </div>
      )}
    </main>
  );
}
