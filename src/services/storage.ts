export type AuthData = {
  token: string;
  user?: unknown;
};

const TOKEN_KEY = 'acu_auth_token';
const USER_KEY = 'acu_auth_user';

export function setAuthData(data: AuthData) {
  try {
    localStorage.setItem(TOKEN_KEY, data.token);
    if (data.user !== undefined) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth:updated'));
    }
  } catch (err) {
    console.error('setAuthData error:', err);
  }
}

export function getAuthData(): AuthData | null {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const rawUser = localStorage.getItem(USER_KEY);
    const user = rawUser ? JSON.parse(rawUser) : undefined;
    return { token, user };
  } catch (err) {
    console.error('getAuthData error:', err);
    return null;
  }
}

export function clearAuthData() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth:updated'));
    }
  } catch (err) {
    console.error('clearAuthData error:', err);
  }
}
