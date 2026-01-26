import Header from '../lp/components/Header';
import Footer from '../lp/components/Footer';
import { mockProduct } from './components/mockData';
import { Breadcrumb } from './components/Breadcrumb';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { PriceBox } from './components/PriceBox';
import { SpecificationsTable } from './components/SpecificationsTable';

const ProductPage = () => {
  const product = mockProduct;

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb productName={product.title} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery images={product.images} />

          <div className="flex flex-col gap-6">
            <ProductInfo
              title={product.title}
              rating={product.rating}
              reviews={product.reviews}
              soldCount={product.soldCount}
              platform={product.platform}
              description={product.description}
            />

            <PriceBox
              price={product.price}
              freeShipping={product.freeShipping}
              stockStatus={product.stockStatus}
              productUrl={product.productUrl}
              platform={product.platform}
            />
          </div>
        </div>

        <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Descrição do produto</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
            <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
              <li>Design ergonômico para uso prolongado.</li>
              <li>Controle de velocidade e reversão para múltiplas aplicações.</li>
              <li>Ideal para concreto, alvenaria e madeira.</li>
            </ul>
          </div>

          <SpecificationsTable specs={product.specifications} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;