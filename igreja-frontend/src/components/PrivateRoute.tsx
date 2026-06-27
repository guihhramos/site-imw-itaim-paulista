import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // 1. Verificação de Token
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Normalização da Role
  // O backend pode enviar "ROLE_ADMIN", "[ROLE_ADMIN]" ou apenas "ADMIN".
  // Usar .includes garante que você capture a permissão mesmo se ela vier dentro de colchetes.
  const userRole = user?.role || '';
  const isAdmin = userRole.includes('ADMIN');

  if (!isAdmin) {
    // Dica: Em apps reais, evite o alert() pois ele trava a renderização. 
    // O redirecionamento já é uma boa prática.
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;