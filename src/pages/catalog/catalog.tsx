import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../lp/components/Header';
import Footer from '../lp/components/Footer';
import CatalogCTA from './components/CatalogCTA';
import CatalogFilters from './components/CatalogFilters';
import CatalogHero from './components/CatalogHero';
import EmptyState from './components/EmptyState';
import ProductGrid from './components/ProductGrid';
import { CATEGORIES, PRODUCTS } from './catalogData';

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

      <CatalogHero />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        <CatalogFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <ProductGrid
            products={filteredProducts}
            onOpenProduct={(productId) => navigate(`/productPage/${productId}`)}
          />
        ) : (
          <EmptyState
            searchTerm={searchTerm}
            onClear={() => {
              setSearchTerm('');
              setSelectedCategory('Todos');
            }}
          />
        )}
      </main>

      <CatalogCTA
        onShowStoreAddress={() => {
          window.open('https://maps.app.goo.gl/T9GL22CvKWbJ8vSR6', '_blank', 'noopener,noreferrer');
        }}
      />

      <Footer />
    </div>
  );
}
