import axios from 'axios';
import { getAuthData } from './storage';
import { CONFIG } from '../config/env';

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
  token?: string;
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
    const response = await axios.post(
      `${CONFIG.API_BASE_URL}/api/auth/register`,
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
    const response = await axios.post(
      `${CONFIG.API_BASE_URL}/api/auth/login`,
      payload
    );
    
    // Agora apenas retornamos o token; dados do usuário serão buscados via /me
    return { success: true, token: response.data?.token };
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
    // Busca dados do usuário autenticado via /me usando Bearer token
    const tkn = token ?? getAuthData()?.token;
    if (!tkn) {
      return { success: false };
    }
    
    const response = await axios.get(
      `${CONFIG.API_BASE_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      }
    );
    
    return { success: true, user: response.data };
  } catch (error: any) {
    return { success: false };
  }
}