export default function Citas() {
  const quotes = [
    {
      text: "El mundo era tan reciente, que muchas cosas carecían de nombre, y para mencionarlas había que señalarlas con el dedo.",
      book: "Cien años de soledad",
      author: "Gabriel García Márquez"
    },
    {
      text: "No hay barrera, cerradura ni cerrojo que puedas imponer a la libertad de mi mente.",
      book: "Una habitación propia",
      author: "Virginia Woolf"
    },
    {
      text: "Escribo porque es la única forma que tengo de entender lo que pienso.",
      book: "El año del pensamiento mágico",
      author: "Joan Didion"
    },
    {
      text: "La memoria del corazón elimina los malos recuerdos y magnifica los buenos, y que gracias a ese artificio logramos sobrellevar el pasado.",
      book: "El amor en los tiempos del cólera",
      author: "Gabriel García Márquez"
    },
    {
      text: "Quería vivir profundamente y chupar toda la médula de la vida, vivir tan reciamente y espartanamente como para hacer huir todo lo que no fuera vida.",
      book: "Walden",
      author: "Henry David Thoreau"
    }
  ];

  return (
    <main className="ml-0 md:ml-64 flex-1 p-6 md:p-16 xl:p-24 w-full font-display">
      {/* Page Header */}
      <header className="mb-16 lg:mb-24">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#2C241B]">Páginas Marcadas</h2>
        <p className="mt-4 text-lg text-stone-600 max-w-2xl italic font-body">Una colección de fragmentos, pensamientos y resonancias encontradas entre páginas.</p>
      </header>

      {/* Masonry Gallery */}
      <div className="masonry-grid pb-24">
        {quotes.map((quote, index) => (
          <div key={index} className="masonry-item group p-6 -mx-6 rounded-sm transition-all duration-300 ease-in-out hover:bg-white hover:shadow-[0_10px_40px_rgba(44,36,27,0.05)] cursor-default">
            <div className="border-l-[3px] border-[#984300] pl-6 py-2">
              <blockquote className="quote-text text-[#2C241B] mb-6">
                &quot;{quote.text}&quot;
              </blockquote>
              <div className="text-right">
                <cite className="quote-attribution block font-bold text-[#2C241B] not-italic">{quote.book}</cite>
                <span className="quote-attribution block mt-1">{quote.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
