import { Routes, Route } from 'react-router-dom';
import LP from '../pages/lp/lp';
import Login from '../pages/login/login';
import Register from '../pages/register/register';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LP />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Adicione outras rotas aqui conforme necessário */}
    </Routes>
  );
}
