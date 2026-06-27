import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sobre from './pages/Sobre';
import MinisterioDetalhe from './pages/MinisterioDetalhe'; // <-- Importando a nova página de detalhes
import AdminDashboard from './pages/AdminDashboard';
import GerenciarAvisos from './pages/GerenciarAvisos';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sobre" element={<Sobre />} />
          
          {/* Rota dinâmica para detalhar cada ministério baseado no ID clicado */}
          <Route path="/ministerio/:id" element={<MinisterioDetalhe />} />
          
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="avisos" element={<GerenciarAvisos />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;