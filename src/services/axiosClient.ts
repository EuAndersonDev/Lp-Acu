import axios, { AxiosError, AxiosResponse } from 'axios';
import { CONFIG } from '../config/env';
import { getAccessToken, getRefreshToken, setTokens, clearAuthData } from './storage';

// Criar instância do axios
export const axiosClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: 10000,
});

// Flag para evitar múltiplas chamadas de refresh simultâneas
let isRefreshing = false;
let failedQueue: Array<{
  onSuccess: (token: string) => void;
  onFailed: (error: AxiosError) => void;
}> = [];

// Processar fila de requisições aguardando novo token
const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.onFailed(error);
    } else if (token) {
      prom.onSuccess(token);
    }
  });

  failedQueue = [];
};

// Request Interceptor: Adicionar accessToken ao header
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Gerenciar token expirado
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Se receber 401 e ainda não tentou fazer refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Se já está fazendo refresh, adicionar à fila
        return new Promise((onSuccess, onFailed) => {
          failedQueue.push({ onSuccess, onFailed });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          // Sem refresh token, fazer logout
          clearAuthData();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Chamar endpoint de refresh
        const response = await axios.post(
          `${CONFIG.API_BASE_URL}/api/auth/refresh`,
          { refreshToken },
          {
            timeout: 10000,
          }
        );

        const { accessToken: newAccessToken } = response.data;

        // Salvar novo access token
        setTokens(newAccessToken, refreshToken);

        // Processar fila de requisições com novo token
        processQueue(null, newAccessToken);

        // Retry da requisição original com novo token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Refresh falhou, fazer logout
        clearAuthData();
        processQueue(refreshError as AxiosError, null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
