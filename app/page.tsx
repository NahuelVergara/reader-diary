import { insforge } from '@/lib/insforge';
import Link from 'next/link';

export const revalidate = 0; // Disable static rendering for this page

export default async function Home() {
  const { data: entries, error } = await insforge.database
    .from('entries')
    .select('*')
    .order('date_read', { ascending: false }); // Note: date_read might need complex sorting if just text, but we'll group by year.

  // Agrupar por año extrayendo el año de "MM/YYYY" o usando el campo directamente
  const groupedEntries: Record<string, any[]> = {};
  
  if (entries) {
    entries.forEach(entry => {
      // Intenta extraer el año si está en formato MM/YYYY
      const yearMatch = entry.date_read?.match(/\d{4}$/);
      const year = yearMatch ? yearMatch[0] : 'Desconocido';
      
      if (!groupedEntries[year]) {
        groupedEntries[year] = [];
      }
      groupedEntries[year].push(entry);
    });
  }

  // Ordenar años de mayor a menor
  const sortedYears = Object.keys(groupedEntries).sort((a, b) => {
    if (a === 'Desconocido') return 1;
    if (b === 'Desconocido') return -1;
    return parseInt(b) - parseInt(a);
  });

  return (
    <main className="ml-0 md:ml-64 flex-1 p-6 md:p-16 w-full">
      <header className="mb-16 md:hidden">
        <h1 className="font-headline-md text-headline-md italic">La Biblioteca</h1>
      </header>

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded mb-8">
          Error al cargar los datos: {error.message}
        </div>
      )}

      {sortedYears.map((year) => (
        <div key={year} className="mb-24">
          {/* Divider */}
          <div className="relative flex items-center py-5 mb-12">
            <div className="flex-grow border-t border-[#A8A39D]"></div>
            <span className="flex-shrink-0 mx-4 font-meta-label text-meta-label text-[#2C241B]">{year}</span>
            <div className="flex-grow border-t border-[#A8A39D]"></div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {groupedEntries[year].map((book, index) => {
              // Create asymmetrical margins logic based on index
              const mtClasses = [
                'lg:mt-12', // 1st
                'lg:-mt-8', // 2nd
                'lg:mt-24', // 3rd
                'lg:mt-4',  // 4th
                'lg:mt-20'  // 5th
              ];
              const mtClass = mtClasses[index % mtClasses.length];

              return (
                <Link key={book.id} href={`/libro/${book.id}`} className={`flex flex-col group cursor-pointer ${mtClass}`}>
                  <article className="h-full">
                    <div className="aspect-[3/4] bg-white border border-[#A8A39D] p-6 flex flex-col justify-center items-center text-center transition-transform duration-500 ease-out group-hover:-translate-y-2 relative overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] h-full">
                      <div className="absolute inset-0 bg-[#F9F6F0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply pointer-events-none"></div>
                      <h2 className="font-headline-md text-headline-md mb-4 px-4 leading-tight group-hover:text-primary transition-colors whitespace-pre-wrap">
                        {book.title}
                      </h2>
                      <div className="w-8 h-px bg-[#A8A39D] mb-4"></div>
                      <p className="font-meta-label text-meta-label text-[#574238] uppercase">{book.author}</p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {(!entries || entries.length === 0) && !error && (
        <div className="text-center text-muted italic mt-24">
          La biblioteca está vacía. Añade tu primera entrada.
        </div>
      )}
    </main>
  );
}
