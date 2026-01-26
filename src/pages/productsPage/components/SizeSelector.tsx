interface SizeSelectorProps {
  sizes: number[];
  selectedSize: number;
  onSizeChange: (size: number) => void;
}

export const SizeSelector = ({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-900">Tamanho</h3>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-500 underline">
          Guia de medidas
        </a>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`py-2 rounded-md border text-sm font-medium transition-all ${
              selectedSize === size 
                ? 'border-blue-600 bg-blue-50 text-blue-600' 
                : 'border-gray-200 text-gray-900 hover:border-gray-300'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
