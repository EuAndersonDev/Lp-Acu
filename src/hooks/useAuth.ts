import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, clearAuthData, getUserData } from '../services/storage';
import { logoutUser } from '../services/auth';

/**
 * Hook para gerenciar autenticação
 * Fornece access token, dados do usuário e função de logout
 */
export function useAuth() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Restaurar estado de autenticação ao montar
    const token = getAccessToken();
    const userData = getUserData();

    if (token) {
      setAccessToken(token);
      setUser(userData);
      setIsAuthenticated(true);
    }

    setIsLoading(false);

    // Ouvir eventos de autenticação
    const handleAuthUpdate = () => {
      const newToken = getAccessToken();
      const newUser = getUserData();

      if (newToken) {
        setAccessToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
      } else {
        setAccessToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    const handleAuthLogout = () => {
      setAccessToken(null);
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    };

    window.addEventListener('auth:updated', handleAuthUpdate);
    window.addEventListener('auth:logout', handleAuthLogout);

    return () => {
      window.removeEventListener('auth:updated', handleAuthUpdate);
      window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, [navigate]);

  const logout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return {
    accessToken,
    user,
    isLoading,
    isAuthenticated,
    logout,
  };
}

/**
 * Hook para proteger rotas
 * Redireciona para login se não autenticado
 */
export function useProtectedRoute() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return { isLoading, isAuthenticated };
}
