import { ShoppingBag } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
  onClear: () => void;
}

export default function EmptyState({ searchTerm, onClear }: EmptyStateProps) {
  return (
    <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-6">
        <ShoppingBag className="h-10 w-10 text-blue-300" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum produto encontrado</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Não encontramos produtos correspondentes à sua busca por "{searchTerm}".
        Tente verificar a ortografia ou usar termos mais genéricos.
      </p>
      <button
        onClick={onClear}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
      >
        Limpar todos os filtros
      </button>
    </div>
  );
}
