import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { churchInfo } from '../config/churchInfo';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import logoIMW from '../assets/logo-preta.png';

const Header: React.FC = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Nome */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <img src={logoIMW} alt="Logo IMW" className="h-16 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-black text-black">{churchInfo.shortName}</h1>
              <p className="text-xs text-gray-600">{churchInfo.region}</p>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-gray-900 font-medium transition text-sm"
            >
              Início
            </Link>
            <a
              href="#avisos"
              className="text-gray-700 hover:text-gray-900 font-medium transition text-sm"
            >
              Comunidade
            </a>
            <a
              href="/sobre"
              className="text-gray-700 hover:text-gray-900 font-medium transition text-sm"
            >
              Sobre
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium transition text-sm"
            >
              Contato
            </a>
            {token && isAdmin && (
              <Link 
                to="/admin" 
                className="text-gray-700 hover:text-gray-900 font-medium transition text-sm flex items-center gap-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin
              </Link>
            )}
          </nav>

          {/* Botões de Ação Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Olá, <span className="font-semibold">{user?.username}</span></span>
                <button
                  onClick={handleLogout}
                  className="text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 text-sm"
                  style={{ backgroundColor: '#B59A57' }}
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-black px-6 py-2 rounded-lg font-bold transition shadow-md flex items-center gap-2 text-sm"
                style={{ backgroundColor: '#B59A57' }}
              >
                👤 Entrar
              </Link>
            )}
          </div>

          {/* Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100 space-y-3">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-gray-900 font-medium transition py-2 text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <a
              href="#avisos"
              className="block text-gray-700 hover:text-gray-900 font-medium transition py-2 text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comunidade
            </a>
            <a
              href="#"
              className="block text-gray-700 hover:text-gray-900 font-medium transition py-2 text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre
            </a>
            <a
              href="#"
              className="block text-gray-700 hover:text-gray-900 font-medium transition py-2 text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </a>
            {token && isAdmin && (
              <Link 
                to="/admin" 
                className="block text-gray-700 hover:text-gray-900 font-medium transition py-2 flex items-center gap-1 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                Painel Admin
              </Link>
            )}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              {token ? (
                <>
                  <p className="text-sm text-gray-600 py-2">Olá, <span className="font-semibold">{user?.username}</span></p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 text-sm"
                    style={{ backgroundColor: '#B59A57' }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block text-center text-black px-4 py-2 rounded-lg font-bold transition text-sm"
                  style={{ backgroundColor: '#B59A57' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  👤 Entrar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
