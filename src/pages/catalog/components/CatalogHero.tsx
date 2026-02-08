export default function CatalogHero() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 pattern-grid-lg opacity-10" />
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Catálogo de Produtos
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Explore nossa seleção completa de materiais de construção.
          Qualidade, durabilidade e os melhores preços para sua obra.
        </p>
      </div>
    </div>
  );
}
