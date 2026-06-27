/**
 * Constantes de API e configuração centralizada
 * Facilita manutenção e evita hardcoding de URLs
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const API_UPLOADS_URL = `${API_BASE_URL}/uploads`;

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/cadastrar',

  // Avisos
  AVISOS_PUBLIC: '/api/avisos/public',
  AVISOS_LIST: '/api/avisos',
  AVISOS_GET: (id: string) => `/api/avisos/${id}`,
  AVISOS_CREATE: '/api/avisos',
  AVISOS_UPDATE: (id: string) => `/api/avisos/${id}`,
  AVISOS_DELETE: (id: string) => `/api/avisos/${id}`,
  AVISOS_UPLOAD_FOTO: (id: string) => `/api/avisos/${id}/foto`,

  // Usuários
  USUARIOS_GET: '/api/usuarios',
};

/**
 * Função auxiliar para construir URL de imagem
 * Garante que sempre retorna a URL completa correta
 */
export const buildImageUrl = (fotoUrl?: string): string => {
  if (!fotoUrl) return '';
  if (fotoUrl.startsWith('http')) return fotoUrl;
  return `${API_UPLOADS_URL}/${fotoUrl}`;
};
