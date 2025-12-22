import { Truck, Shield, Clock, Award, Users, TrendingDown } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Entregas em até 24h para a região metropolitana',
  },
  {
    icon: Shield,
    title: 'Garantia de Qualidade',
    description: 'Produtos certificados e garantia em todos os materiais',
  },
  {
    icon: TrendingDown,
    title: 'Melhores Preços',
    description: 'Preços competitivos e condições especiais para grandes volumes',
  },
  {
    icon: Clock,
    title: 'Atendimento Ágil',
    description: 'Equipe pronta para atender de segunda a sábado',
  },
  {
    icon: Award,
    title: '20 Anos de Experiência',
    description: 'Tradição e confiança no mercado de construção',
  },
  {
    icon: Users,
    title: 'Consultoria Técnica',
    description: 'Profissionais especializados para ajudar em seu projeto',
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Por Que Escolher a Açu?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vantagens que fazem a diferença em sua obra
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">
            Pronto para Começar Seu Projeto?
          </h3>
          <p className="text-xl mb-8 text-orange-100">
            Fale com nossos especialistas e receba um orçamento personalizado
          </p>
          <a
            href="https://wa.me/5511952815167"
            className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
          >
            Solicitar Orçamento Agora
          </a>
        </div>
      </div>
    </section>
  );
}
