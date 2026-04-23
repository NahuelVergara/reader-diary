export default function Home() {
  return (
    <main className="ml-0 md:ml-64 flex-1 p-6 md:p-16 w-full">
      <header className="mb-16 md:hidden">
        <h1 className="font-headline-md text-headline-md italic">La Biblioteca</h1>
      </header>

      {/* 2023 Divider */}
      <div className="relative flex items-center py-5 mb-12">
        <div className="flex-grow border-t border-[#A8A39D]"></div>
        <span className="flex-shrink-0 mx-4 font-meta-label text-meta-label text-[#2C241B]">2023</span>
        <div className="flex-grow border-t border-[#A8A39D]"></div>
      </div>

      {/* Asymmetrical Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-24 items-start">
        {/* Book 1 */}
        <article className="flex flex-col group cursor-pointer lg:mt-12">
          <div className="aspect-[3/4] bg-white border border-[#A8A39D] p-6 flex flex-col justify-center items-center text-center transition-transform duration-500 ease-out group-hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#F9F6F0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply pointer-events-none"></div>
            <h2 className="font-headline-md text-headline-md mb-4 px-4 leading-tight group-hover:text-primary transition-colors">
              El Nombre<br />de la Rosa
            </h2>
            <div className="w-8 h-px bg-[#A8A39D] mb-4"></div>
            <p className="font-meta-label text-meta-label text-[#574238]">UMBERTO ECO</p>
          </div>
        </article>

        {/* Book 2 */}
        <article className="flex flex-col group cursor-pointer lg:-mt-8">
          <div className="aspect-[3/4] bg-white border border-[#A8A39D] p-6 flex flex-col justify-center items-center text-center transition-transform duration-500 ease-out group-hover:-translate-y-2 relative overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
            <div className="absolute inset-0 bg-[#F9F6F0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply pointer-events-none"></div>
            <h2 className="font-headline-md text-headline-md mb-4 px-4 leading-tight group-hover:text-primary transition-colors">
              Cien Años<br />de Soledad
            </h2>
            <div className="w-8 h-px bg-[#A8A39D] mb-4"></div>
            <p className="font-meta-label text-meta-label text-[#574238]">GABRIEL GARCÍA MÁRQUEZ</p>
          </div>
        </article>

        {/* Book 3 */}
        <article className="flex flex-col group cursor-pointer lg:mt-24">
          <div className="aspect-[3/4] bg-white border border-[#A8A39D] p-6 flex flex-col justify-center items-center text-center transition-transform duration-500 ease-out group-hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#F9F6F0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply pointer-events-none"></div>
            <h2 className="font-headline-md text-headline-md mb-4 px-4 leading-tight group-hover:text-primary transition-colors">
              Walden
            </h2>
            <div className="w-8 h-px bg-[#A8A39D] mb-4"></div>
            <p className="font-meta-label text-meta-label text-[#574238]">HENRY DAVID THOREAU</p>
          </div>
        </article>
      </div>

      {/* 2022 Divider */}
      <div className="relative flex items-center py-5 mb-12">
        <div className="flex-grow border-t border-[#A8A39D]"></div>
        <span className="flex-shrink-0 mx-4 font-meta-label text-meta-label text-[#2C241B]">2022</span>
        <div className="flex-grow border-t border-[#A8A39D]"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-start pb-24">
        {/* Book 4 */}
        <article className="flex flex-col group cursor-pointer lg:mt-4">
          <div className="aspect-[3/4] bg-white border border-[#A8A39D] p-6 flex flex-col justify-center items-center text-center transition-transform duration-500 ease-out group-hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#F9F6F0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply pointer-events-none"></div>
            <h2 className="font-headline-md text-headline-md mb-4 px-4 leading-tight group-hover:text-primary transition-colors">
              Ficciones
            </h2>
            <div className="w-8 h-px bg-[#A8A39D] mb-4"></div>
            <p className="font-meta-label text-meta-label text-[#574238]">JORGE LUIS BORGES</p>
          </div>
        </article>

        {/* Book 5 */}
        <article className="flex flex-col group cursor-pointer lg:mt-20">
          <div className="aspect-[3/4] bg-white border border-[#A8A39D] p-6 flex flex-col justify-center items-center text-center transition-transform duration-500 ease-out group-hover:-translate-y-2 relative overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
            <div className="absolute inset-0 bg-[#F9F6F0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply pointer-events-none"></div>
            <h2 className="font-headline-md text-headline-md mb-4 px-4 leading-tight group-hover:text-primary transition-colors">
              La Metamorfosis
            </h2>
            <div className="w-8 h-px bg-[#A8A39D] mb-4"></div>
            <p className="font-meta-label text-meta-label text-[#574238]">FRANZ KAFKA</p>
          </div>
        </article>
      </div>
    </main>
  );
}
