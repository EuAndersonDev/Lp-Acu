import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowRight, ShoppingBag } from 'lucide-react';
import Header from '../lp/components/Header';
import Footer from '../lp/components/Footer';

// Definição dos tipos
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  isNew?: boolean;
}

// Mock de Categorias
const CATEGORIES = [
  'Todos',
  'Cimento e Argamassa',
  'Ferramentas',
  'Hidráulica',
  'Elétrica',
  'Tintas',
  'Acabamentos'
];

// Mock de Produtos (Dados de exemplo)
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cimento CP II - 50kg - Votoran',
    category: 'Cimento e Argamassa',
    price: 34.90,
    image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Cimento',
    description: 'Cimento de alta qualidade para uso geral em obras residenciais e comerciais.',
    isNew: true
  },
  {
    id: '2',
    name: 'Areia Média Lavada - Saco 20kg',
    category: 'Cimento e Argamassa',
    price: 8.50,
    image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Areia',
    description: 'Areia lavada ideal para assentamento de tijolos e reboco.'
  },
  {
    id: '3',
    name: 'Kit Ferramentas 12 Peças Profissional',
    category: 'Ferramentas',
    price: 129.90,
    image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Ferramentas',
    description: 'Maleta completa com as principais ferramentas para manutenção e reparos.'
  },
  {
    id: '4',
    name: 'Tinta Acrílica Fosca Branco Neve 18L',
    category: 'Tintas',
    price: 389.90,
    image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Tinta',
    description: 'Tinta de alto rendimento e cobertura para paredes internas e externas.'
  },
  {
    id: '5',
    name: 'Bloco Cerâmico 9x19x29 (Milheiro)',
    category: 'Cimento e Argamassa',
    price: 1850.00,
    image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Bloco',
    description: 'Bloco de vedação cerâmico de alta resistência e qualidade garantida.'
  },
  {
    id: '6',
    name: 'Argamassa ACIII Branca 20kg',
    category: 'Cimento e Argamassa',
    price: 42.90,
    image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Argamassa',
    description: 'Argamassa colante de alta aderência para porcelanatos e pisos grandes.'
  },
  {
    id: '7',
    name: 'Tubo PVC Soldável 25mm - 3m',
    category: 'Hidráulica',
    price: 18.90,
    image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Tubo+PVC',
    description: 'Tubo para condução de água fria com alta durabilidade e resistência.'
  },
  {
    id: '8',
    name: 'Fio Cabo Flexível 2.5mm - 100m',
    category: 'Elétrica',
    price: 145.00,
    image: 'https://placehold.co/400x400/f8fafc/1e293b?text=Fio+Cabo',
    description: 'Cabo elétrico flexível antichama para instalações residenciais seguras.'
  }
];

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const navigate = useNavigate();

  // Lógica de filtragem
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      {/* Seção de Introdução (Hero) */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 pattern-grid-lg opacity-10" />
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Catálogo de Produtos
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Explore nossa seleção completa de materiais de construção. 
            Qualidade, durabilidade e os melhores preços para sua obra.
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Barra de Filtros e Busca */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            
            {/* Campo de Busca */}
            <div className="relative w-full md:max-w-sm xl:max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                placeholder="O que você procura hoje?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtro de Categorias (Desktop) */}
            <div className="hidden md:flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide max-w-full flex-1 min-w-0 justify-end">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de Categorias (Mobile) */}
          <div className="md:hidden">
            <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
              Categorias
            </label>
            <div className="relative">
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none bg-white"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <Filter className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => navigate(`/productsPage/${product.id}`)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full cursor-pointer"
              >
                {/* Imagem do Produto */}
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
                
                {/* Conteúdo do Card */}
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
                        navigate(`/productsPage/${product.id}`);
                      }}
                      className="w-full bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      Ver Detalhes
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Estado Vazio */
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
              onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </main>

      {/* Call To Action (CTA) */}
      <section className="bg-white border-t border-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Precisa de algo específico para sua obra?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Temos um estoque completo em nossa loja física e consultores prontos para ajudar. 
            Solicite um orçamento personalizado agora mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5511952815167"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-1"
            >
              Solicitar Orçamento no WhatsApp
            </a>
            <button
              onClick={() => navigate('/')} // Assumindo que existe rota de contato
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-100 text-lg font-semibold rounded-xl text-blue-900 bg-transparent hover:bg-blue-50 transition-colors"
            >
              Ver endereço da loja
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
