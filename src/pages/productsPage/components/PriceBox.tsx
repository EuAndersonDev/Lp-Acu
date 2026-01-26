import { Platform } from './mockData';

interface PriceBoxProps {
  price: number;
  freeShipping: boolean;
  stockStatus: 'Disponível' | 'Últimas unidades';
  productUrl: string;
  platform: Platform;
}

const stockStyles = {
  'Disponível': 'text-green-600 bg-green-50 border-green-200',
  'Últimas unidades': 'text-amber-700 bg-amber-50 border-amber-200'
};

export const PriceBox = ({ price, freeShipping, stockStatus, productUrl, platform }: PriceBoxProps) => {
  const handleRedirect = () => {
    window.open(productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-3">
      <div className="flex items-center gap-3">
        <p className="text-4xl font-bold text-blue-900">R$ {price.toFixed(2)}</p>
        {freeShipping && (
          <span className="px-3 py-1 text-sm font-semibold bg-green-100 text-green-700 rounded-full border border-green-200">
            Frete grátis
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${stockStyles[stockStatus]}`}>
          {stockStatus}
        </span>
      </div>

      <button
        onClick={handleRedirect}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg shadow-orange-500/30 transition"
      >
        Comprar com segurança
        <span className="text-xs font-normal opacity-90">({platform === 'mercado-livre' ? 'Mercado Livre' : 'Shopee'})</span>
      </button>
    </div>
  );
};
