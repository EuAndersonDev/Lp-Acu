export interface Color {
  name: string;
  class: string;
  selectedClass: string;
}

export interface Specification {
  label: string;
  value: string;
}

export type Platform = 'mercado-livre' | 'shopee';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  soldCount: number;
  platform: Platform;
  productUrl: string;
  freeShipping: boolean;
  stockStatus: 'Disponível' | 'Últimas unidades';
  brand: string;
  model: string;
  voltage: string;
  specifications: Specification[];
  colors: Color[];
  sizes: number[];
  images: string[];
}

export const mockProduct: Product = {
  id: "1",
  title: "Furadeira de Impacto 750W",
  price: 349.90,
  description: "Furadeira de impacto 750W com mandril de 13mm, reversão e controle de velocidade. Ideal para concreto, alvenaria e madeira, garantindo precisão e segurança em qualquer projeto.",
  rating: 4.7,
  reviews: 214,
  soldCount: 320,
  platform: 'mercado-livre',
  productUrl: 'https://www.mercadolivre.com.br/',
  freeShipping: true,
  stockStatus: 'Disponível',
  brand: 'Açu Tools',
  model: 'Impact 750X',
  voltage: '110/220V',
  specifications: [
    { label: 'Marca', value: 'Açu Tools' },
    { label: 'Modelo', value: 'Impact 750X' },
    { label: 'Voltagem', value: 'Bivolt 110/220V' },
    { label: 'Potência', value: '750W' },
    { label: 'Mandril', value: '13mm com chave' },
    { label: 'Peso', value: '1,8 kg' },
    { label: 'Garantia', value: '12 meses' }
  ],
  colors: [
    { name: 'Preto', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    { name: 'Azul', class: 'bg-blue-600', selectedClass: 'ring-blue-600' },
    { name: 'Branco', class: 'bg-white', selectedClass: 'ring-gray-300' },
  ],
  sizes: [38, 39, 40, 41, 42, 43],
  images: [
    "https://images.unsplash.com/photo-1582719478248-54e9f2af4b24?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478171-2f2df57c2ef7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478181-1e1ef6f6c4d1?auto=format&fit=crop&w=1200&q=80"
  ]
};
