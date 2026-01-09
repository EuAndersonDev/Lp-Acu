export type AuthData = {
  accessToken: string;
  refreshToken: string;
  user?: unknown;
};

const ACCESS_TOKEN_KEY = 'acu_access_token';
const REFRESH_TOKEN_KEY = 'acu_refresh_token';
const USER_KEY = 'acu_auth_user';

/**
 * Obter access token da memória ou localStorage
 */
export function getAccessToken(): string | null {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token;
  } catch (err) {
    console.error('getAccessToken error:', err);
    return null;
  }
}

/**
 * Obter refresh token do localStorage
 */
export function getRefreshToken(): string | null {
  try {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);
    return token;
  } catch (err) {
    console.error('getRefreshToken error:', err);
    return null;
  }
}

/**
 * Salvar tokens e dados do usuário
 * @param accessToken Token de acesso
 * @param refreshToken Token de refresh
 * @param user Dados do usuário (opcional)
 */
export function setTokens(accessToken: string, refreshToken: string, user?: unknown) {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    if (user !== undefined) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth:updated'));
    }
  } catch (err) {
    console.error('setTokens error:', err);
  }
}

/**
 * Obter todos os dados de autenticação
 */
export function getAuthData(): AuthData | null {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!accessToken || !refreshToken) return null;

    const rawUser = localStorage.getItem(USER_KEY);
    const user = rawUser ? JSON.parse(rawUser) : undefined;

    return { accessToken, refreshToken, user };
  } catch (err) {
    console.error('getAuthData error:', err);
    return null;
  }
}

/**
 * Obter apenas dados do usuário
 */
export function getUserData(): unknown | null {
  try {
    const rawUser = localStorage.getItem(USER_KEY);
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    console.error('getUserData error:', err);
    return null;
  }
}

/**
 * Limpar todos os dados de autenticação
 */
export function clearAuthData() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
  } catch (err) {
    console.error('clearAuthData error:', err);
  }
}
