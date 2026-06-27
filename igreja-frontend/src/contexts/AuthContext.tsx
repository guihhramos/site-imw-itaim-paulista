import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

interface User {
  username: string;
  email: string;
  role: string;
  nome?: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  // =========================
  // USER
  // =========================
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // =========================
  // TOKEN
  // =========================
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  // =========================
  // LOADING
  // =========================
  const [loading, setLoading] = useState(false);

  // =========================
  // SINCRONIZA TOKEN AXIOS
  // =========================
  useEffect(() => {
    if (token) {
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // =========================
  // LOGIN
  // =========================
  const login = async (email: string, password: string) => {
    setLoading(true);

    try {

      // REQUEST LOGIN
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      // RESPONSE BACKEND
      let {
        token: newToken,
        username,
        email: resEmail,
        role,
        nome,
      } = response.data;

      // LIMPA ROLE
      if (typeof role === 'string') {
        role = role.replace(/[\[\]]/g, '');
      }

      // FALLBACK USERNAME
      if (!username && resEmail) {
        username = resEmail.split('@')[0];
      }

      // USER DATA
      const userData: User = {
        username,
        email: resEmail,
        role,
        nome,
      };

      // SAVE STATES
      setToken(newToken);
      setUser(userData);

      // LOCAL STORAGE
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));

      // AXIOS TOKEN
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${newToken}`;

    } catch (err) {
      console.error('Erro no fluxo de login:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {

    setToken(null);
    setUser(null);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// HOOK
// =========================
export const useAuth = () => useContext(AuthContext);