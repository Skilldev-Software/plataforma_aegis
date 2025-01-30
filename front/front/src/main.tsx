import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import KitComercial from './pages/kitComercial/kitComercial';
import Acompanhamento from './pages/acompanhamento/acompanhamento';
import NovaProposta from './pages/nova_proposta/NovaProposta';
import Academy from './pages/academy/academy';
import Perfil from './pages/perfil/Perfil';
import Campanhas from './pages/campanhas/campanhas';
import SegmentoInternacional from './pages/segmento_internacional/SegmentoInternacional';
import SegmentoInvestimentos from './pages/segmento_investimentos/SegmentoInvestimentos';
import SegmentoOutros from './pages/segmento_outros/SegmentoOutros';
import SegmentoPj from './pages/segmento_pj/SegmentoPJ';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/auth" element={<Login />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kitComercial" element={<KitComercial />} />
          <Route path="/acompanhamento" element={<Acompanhamento />} />
          <Route path="/nova-proposta" element={<NovaProposta />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/campanha" element={<Campanhas />} />
          <Route path="/nova-proposta/segmentoInternacional" element={<SegmentoInternacional />} />
          <Route path="/nova-proposta/segmentoInvestimentos" element={<SegmentoInvestimentos />} />
          <Route path="/nova-proposta/segmentoOutros" element={<SegmentoOutros />} />
          <Route path="/nova-proposta/segmentoPj" element={<SegmentoPj />} />
        </Route>
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
