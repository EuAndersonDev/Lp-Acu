interface CatalogCTAProps {
  onShowStoreAddress: () => void;
}

export default function CatalogCTA({ onShowStoreAddress }: CatalogCTAProps) {
  return (
    <section className="bg-white border-t border-gray-100 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
          Precisa de algo específico para sua obra?
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Temos um estoque completo em nossa loja física e consultores prontos para ajudar.
          Solicite um orçamento personalizado agora mesmo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5511952815167"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-1"
          >
            Solicitar Orçamento no WhatsApp
          </a>
          <button
            onClick={onShowStoreAddress}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-100 text-lg font-semibold rounded-xl text-blue-900 bg-transparent hover:bg-blue-50 transition-colors"
          >
            Ver endereço da loja
          </button>
        </div>
      </div>
    </section>
  );
}
