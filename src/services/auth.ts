import axiosClient from './axiosClient';
import { getAccessToken, getRefreshToken, setTokens, clearAuthData } from './storage';


export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: any;
  errorType?: 'invalid_credentials' | 'user_not_found' | 'password_invalid' | 'server_error' | 'missing_fields' | 'unknown';
  errorMessage?: string;
};

export type RegisterResponse = {
  success: boolean;
  errorType?: 'user_exists' | 'missing_fields' | 'server_error' | 'unknown';
  errorMessage?: string;
};

// Futuras integrações com API podem substituir esses stubs.
export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  try {
    const response = await axiosClient.post(
      '/api/auth/register',
      payload
    );
    
    return { success: true };
  } catch (error: any) {
    const status = error.response?.status;
    const data = error.response?.data;
    const errorMessage = data?.error || data?.message || error.message;
    
    let errorType: 'user_exists' | 'missing_fields' | 'server_error' | 'unknown' = 'unknown';
    
    if (status === 400) {
      if (errorMessage?.toLowerCase().includes('já existe') || errorMessage?.toLowerCase().includes('already exists')) {
        errorType = 'user_exists';
      } else if (errorMessage?.toLowerCase().includes('obrigatório') || errorMessage?.toLowerCase().includes('required')) {
        errorType = 'missing_fields';
      }
    } else if (status === 500) {
      errorType = 'server_error';
    }
    
    return { 
      success: false, 
      errorType,
      errorMessage
    };
  }
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await axiosClient.post(
      '/api/auth/login',
      payload
    );
    
    const { accessToken, refreshToken, user } = response.data;
    
    // Salvar tokens e dados do usuário
    setTokens(accessToken, refreshToken, user);
    
    return { 
      success: true, 
      accessToken, 
      refreshToken,
      user
    };
  } catch (error: any) {
    const status = error.response?.status;
    const data = error.response?.data;
    const errorMessage = data?.error || data?.message || error.message;
    
    let errorType: 'invalid_credentials' | 'user_not_found' | 'password_invalid' | 'server_error' | 'missing_fields' | 'unknown' = 'unknown';
    
    // Detectar tipo de erro baseado na resposta
    if (status === 401) {
      errorType = 'invalid_credentials';
    } else if (status === 404) {
      errorType = 'user_not_found';
    } else if (status === 400) {
      if (errorMessage?.toLowerCase().includes('obrigatório') || errorMessage?.toLowerCase().includes('required')) {
        errorType = 'missing_fields';
      } else if (errorMessage?.toLowerCase().includes('password') || errorMessage?.toLowerCase().includes('senha')) {
        errorType = 'password_invalid';
      } else {
        errorType = 'invalid_credentials';
      }
    } else if (status === 500) {
      errorType = 'server_error';
    }
    
    return { 
      success: false, 
      errorType,
      errorMessage
    };
  }
}

export async function fetchMe(token?: string): Promise<{ success: boolean; user?: unknown }> {
  try {
    const accessToken = token ?? getAccessToken();
    if (!accessToken) {
      return { success: false };
    }
    
    const response = await axiosClient.get('/api/auth/me');
    
    return { success: true, user: response.data };
  } catch (error: any) {
    return { success: false };
  }
}

/**
 * Fazer logout do usuário
 * Chama endpoint de logout no backend e limpa tokens locais
 */
export async function logoutUser(): Promise<void> {
  try {
    const refreshToken = getRefreshToken();
    
    // Tentar notificar o backend
    if (refreshToken) {
      try {
        await axiosClient.post('/api/auth/logout', { refreshToken });
      } catch (error) {
        // Ignorar erro de logout no backend
        // Ainda vamos limpar os dados locais
      }
    }
  } finally {
    // Sempre limpar dados locais
    clearAuthData();
  }
}

/**
 * Fazer refresh do access token manualmente
 * Útil para cenários específicos
 */
export async function refreshAccessToken(): Promise<boolean> {
  try {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
      clearAuthData();
      return false;
    }
    
    const response = await axiosClient.post('/api/auth/refresh', {
      refreshToken,
    });
    
    const { accessToken } = response.data;
    
    // Atualizar apenas o access token
    setTokens(accessToken, refreshToken);
    
    return true;
  } catch (error) {
    // Refresh falhou
    clearAuthData();
    return false;
  }
}