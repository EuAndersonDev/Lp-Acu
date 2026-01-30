import { useState } from 'react';
import { Platform } from './mockData';

interface PriceBoxProps {
  price: number;
  freeShipping: boolean;
  stockStatus: 'Disponível' | 'Últimas unidades';
  productUrl?: string;
  platform?: Platform;
  urls?: {
    mercadoLivre?: string;
    shopee?: string;
  };
}

const stockStyles = {
  'Disponível': 'text-green-600 bg-green-50 border-green-200',
  'Últimas unidades': 'text-amber-700 bg-amber-50 border-amber-200'
};

const MOCK_URLS = {
  'mercado-livre': 'https://www.mercadolivre.com.br',
  'shopee': 'https://shopee.com.br'
};

export const PriceBox = ({ price, freeShipping, stockStatus, productUrl, platform, urls }: PriceBoxProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(platform || 'mercado-livre');

  const handleRedirect = () => {
    let url = MOCK_URLS[selectedPlatform];

    if (urls) {
      if (selectedPlatform === 'mercado-livre' && urls.mercadoLivre) url = urls.mercadoLivre;
      if (selectedPlatform === 'shopee' && urls.shopee) url = urls.shopee;
    } else if (productUrl && platform === selectedPlatform) {
      url = productUrl;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-4">
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

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Escolha a plataforma:</p>
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setSelectedPlatform('mercado-livre')}
            className={`py-2 text-sm font-medium rounded-md transition-all ${
              selectedPlatform === 'mercado-livre'
                ? 'bg-white text-blue-900 shadow-sm ring-1 ring-black/5'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            Mercado Livre
          </button>
          <button
            onClick={() => setSelectedPlatform('shopee')}
            className={`py-2 text-sm font-medium rounded-md transition-all ${
              selectedPlatform === 'shopee'
                ? 'bg-white text-orange-600 shadow-sm ring-1 ring-black/5'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            Shopee
          </button>
        </div>
      </div>

      <button
        onClick={handleRedirect}
        className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-lg shadow-lg transition ${
          selectedPlatform === 'mercado-livre'
            ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'
            : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/30'
        }`}
      >
        Comprar no {selectedPlatform === 'mercado-livre' ? 'Mercado Livre' : 'Shopee'}
      </button>
    </div>
  );
};
