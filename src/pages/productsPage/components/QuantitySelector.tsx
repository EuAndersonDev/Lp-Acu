interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange, onAddToCart }: QuantitySelectorProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center border border-gray-300 rounded-lg">
        <button 
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))} 
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
        >
          -
        </button>
        <span className="px-4 py-2 text-gray-900 font-medium">{quantity}</span>
        <button 
          onClick={() => onQuantityChange(quantity + 1)} 
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
        >
          +
        </button>
      </div>
      <button 
        onClick={onAddToCart}
        className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Adicionar à Sacola
      </button>
    </div>
  );
};
