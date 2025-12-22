import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Há anos no mercado
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Materiais de Construção de
              <span className="text-orange-400"> Alta Qualidade</span>
            </h2>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Tudo o que você precisa para sua obra em um só lugar. Preços competitivos,
              qualidade garantida e entrega rápida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="https://wa.me/5511952815167"
                className="flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition font-semibold text-lg"
              >
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#produtos"
                className="flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-50 transition font-semibold text-lg"
              >
                Ver Produtos
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-sm">Entrega Rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-sm">Preços Justos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-sm">Melhor Atendimento</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-orange-500 h-48 rounded-2xl shadow-2xl"></div>
                <div className="bg-blue-700 h-64 rounded-2xl shadow-2xl"></div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-blue-600 h-64 rounded-2xl shadow-2xl"></div>
                <div className="bg-orange-600 h-48 rounded-2xl shadow-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
