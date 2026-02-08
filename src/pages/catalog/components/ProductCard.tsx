import { ArrowRight } from 'lucide-react';
import type { Product } from '../catalogData';

interface ProductCardProps {
  product: Product;
  onOpen: (id: string) => void;
}

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <div
      onClick={() => onOpen(product.id)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wide">
              Novo
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-xs font-semibold px-2 py-1 rounded-md border border-gray-100 shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-xs text-gray-500 font-medium">R$</span>
            <span className="text-2xl font-bold text-blue-900">
              {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(product.id);
            }}
            className="w-full bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group/btn"
          >
            Ver Detalhes
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
