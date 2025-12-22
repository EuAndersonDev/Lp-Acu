import { Routes, Route } from 'react-router-dom';
import LP from '../pages/lp/lp';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LP />} />
      {/* Adicione outras rotas aqui conforme necessário */}
    </Routes>
  );
}
