import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { churchInfo } from '../config/churchInfo';
import logoIMW from '../assets/logo_imw_pb.png';

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav
        className="text-white px-6 py-4 flex items-center justify-between shadow-lg"
        style={{ backgroundColor: churchInfo.colors.primary }}
      >
        <div className="flex items-center gap-4">
          <img src={logoIMW} alt="Logo IMW" className="h-10 w-auto" />
          <div>
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
            <p className="text-xs opacity-80">{churchInfo.shortName}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/admin"
            className="hover:opacity-80 transition font-medium text-sm"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/avisos"
            className="hover:opacity-80 transition font-medium text-sm"
          >
            Gerenciar Avisos
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded font-medium transition"
          >
            Sair
          </button>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer Admin */}
      <footer className="bg-gray-800 text-gray-300 text-center py-4 text-sm">
        <p>&copy; {new Date().getFullYear()} {churchInfo.name}. Painel Administrativo.</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
