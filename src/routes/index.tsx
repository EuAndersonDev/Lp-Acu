import { Routes, Route } from 'react-router-dom';
import LP from '../pages/lp/lp';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import ProductPage from '../pages/productsPage/productsPage';
import Catalog from '../pages/catalog/Catalog';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LP />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/productPage" element={<ProductPage />} />
      <Route path="*" element={<div>Página não encontrada</div>} />
      <Route path="/catalog" element={<Catalog />} />
      {/* Adicione outras rotas aqui conforme necessário */}
    </Routes>
  );
}
