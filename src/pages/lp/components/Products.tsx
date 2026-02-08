import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  installments?: string;
  freeShipping?: boolean;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cimento CP II - 50kg - Votoran Todas as Obras',
    price: 34.90,
    imageUrl: 'https://placehold.co/300x300/white/1e293b?text=Cimento',
    installments: '3x R$ 11,63 sem juros',
  },
  {
    id: '2',
    name: 'Areia Média Lavada - Saco 20kg para Construção',
    price: 8.50,
    imageUrl: 'https://placehold.co/300x300/white/1e293b?text=Areia',
  },
  {
    id: '3',
    name: 'Kit Ferramentas 12 Peças Profissional Maleta Completa',
    price: 129.90,
    imageUrl: 'https://placehold.co/300x300/white/1e293b?text=Ferramentas',
    installments: '12x R$ 10,82',
    freeShipping: true,
  },
  {
    id: '4',
    name: 'Tinta Acrílica Fosca Branco Neve 18L Suvinil',
    price: 389.90,
    imageUrl: 'https://placehold.co/300x300/white/1e293b?text=Tinta',
    installments: '10x R$ 38,99 sem juros',
    freeShipping: true,
  },
  {
    id: '5',
    name: 'Bloco Cerâmico 9x19x29 de Vedação (Milheiro)',
    price: 1850.00,
    imageUrl: 'https://placehold.co/300x300/white/1e293b?text=Bloco',
    installments: '12x R$ 154,16',
  },
  {
    id: '6',
    name: 'Argamassa ACIII Branca 20kg Colante',
    price: 42.90,
    imageUrl: 'https://placehold.co/300x300/white/1e293b?text=Argamassa',
  },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = current.clientWidth * 0.8;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="produtos" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-light text-gray-600">
            Ofertas em destaque
          </h2>
          <div className="h-px bg-gray-300 flex-1"></div>
          <button 
            onClick={() => navigate('/catalog')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver tudo
          </button>
        </div>

        <div className="relative group/carousel">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white text-blue-900 p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-gray-50 focus:outline-none hidden md:block"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/productPage/${product.id}`)}
              className="min-w-[280px] max-w-[280px] sm:min-w-[260px] sm:max-w-[260px] flex-shrink-0 snap-start bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group border border-gray-100 overflow-hidden"
            >
              <div className="aspect-square w-full relative border-b border-gray-50">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:opacity-95 transition-opacity"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-2xl font-normal text-gray-900">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  {product.freeShipping && (
                     <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-auto">
                       ON
                     </span>
                  )}
                </div>

                {product.installments && (
                  <p className="text-xs text-green-600 font-medium mb-2">
                    em {product.installments}
                  </p>
                )}

                {product.freeShipping && (
                  <p className="text-xs font-bold text-green-600 mb-2">
                    Frete grátis
                  </p>
                )}

                <h3 className="text-sm text-gray-600 font-light line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white text-blue-900 p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-gray-50 focus:outline-none hidden md:block"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-8 text-center">
           <button
            onClick={() => navigate('/catalog')}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition font-medium shadow-md shadow-blue-500/20"
          >
            Ver todas as ofertas
          </button>
        </div>
      </div>
    </section>
  );
}
