import { Box, Hammer, Wrench, Package, Droplet, Zap } from 'lucide-react';

const products = [
  {
    icon: Box,
    title: 'Cimento e Argamassa',
    description: 'Cimentos de alta resistência e argamassas para todo tipo de aplicação',
    color: 'bg-blue-500',
  },
  {
    icon: Hammer,
    title: 'Ferramentas',
    description: 'Ferramentas profissionais e acessórios para construção',
    color: 'bg-orange-500',
  },
  {
    icon: Wrench,
    title: 'Hidráulica',
    description: 'Tubos, conexões, registros e todo material hidráulico',
    color: 'bg-blue-600',
  },
  {
    icon: Zap,
    title: 'Elétrica',
    description: 'Materiais elétricos, fios, cabos e iluminação',
    color: 'bg-orange-600',
  },
  {
    icon: Droplet,
    title: 'Tintas e Texturas',
    description: 'Tintas premium, texturas e produtos para acabamento',
    color: 'bg-blue-700',
  },
  {
    icon: Package,
    title: 'Acabamentos',
    description: 'Pisos, revestimentos, louças e metais sanitários',
    color: 'bg-orange-400',
  },
];

export default function Products() {
  return (
    <section id="produtos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Nossos Produtos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferecemos uma linha completa de materiais de construção para sua obra
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div
                  className={`${product.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://wa.me/5511952815167"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition font-semibold text-lg"
          >
            Solicitar Catálogo Completo
          </a>
        </div>
      </div>
    </section>
  );
}
