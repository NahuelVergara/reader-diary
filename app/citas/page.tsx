import { insforge } from '@/lib/insforge';

export const revalidate = 0;

export default async function Citas() {
  const { data: quotes, error } = await insforge.database
    .from('quotes')
    .select('id, text, entries(title, author)')
    .order('created_at', { ascending: false });

  return (
    <main className="ml-0 md:ml-64 flex-1 p-6 md:p-16 xl:p-24 w-full font-display">
      {/* Page Header */}
      <header className="mb-16 lg:mb-24">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#2C241B]">Páginas Marcadas</h2>
        <p className="mt-4 text-lg text-stone-600 max-w-2xl italic font-body">Una colección de fragmentos, pensamientos y resonancias encontradas entre páginas.</p>
      </header>

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded mb-8">
          Error al cargar las citas: {error.message}
        </div>
      )}

      {/* Masonry Gallery */}
      <div className="masonry-grid pb-24">
        {quotes?.map((quote) => (
          <div key={quote.id} className="masonry-item group p-6 -mx-6 rounded-sm transition-all duration-300 ease-in-out hover:bg-white hover:shadow-[0_10px_40px_rgba(44,36,27,0.05)] cursor-default">
            <div className="border-l-[3px] border-[#984300] pl-6 py-2">
              <blockquote className="quote-text text-[#2C241B] mb-6">
                &quot;{quote.text}&quot;
              </blockquote>
              <div className="text-right">
                <cite className="quote-attribution block font-bold text-[#2C241B] not-italic">
                  {/* @ts-ignore */}
                  {quote.entries?.title || 'Desconocido'}
                </cite>
                <span className="quote-attribution block mt-1">
                  {/* @ts-ignore */}
                  {quote.entries?.author || 'Desconocido'}
                </span>
              </div>
            </div>
          </div>
        ))}

        {(!quotes || quotes.length === 0) && !error && (
          <div className="text-center text-muted italic col-span-full mt-12">
            No hay citas guardadas aún.
          </div>
        )}
      </div>
    </main>
  );
}
