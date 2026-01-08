export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

// Futuras integrações com API podem substituir esses stubs.
export async function registerUser(payload: RegisterPayload) {
  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return { success: false };
  return { success: true };
}

import { getAuthData } from './storage';

export async function loginUser(payload: LoginPayload): Promise<{ success: boolean; token?: string }> {
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return { success: false };
  const data = await res.json();
  // Agora apenas retornamos o token; dados do usuário serão buscados via /me
  return { success: true, token: data?.token };
}

export async function fetchMe(token?: string): Promise<{ success: boolean; user?: unknown }> {
  // Busca dados do usuário autenticado via /me usando Bearer token
  const tkn = token ?? getAuthData()?.token;
  if (!tkn) return { success: false };
  const res = await fetch('http://localhost:3000/api/auth/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tkn}`,
    },
  });
  if (!res.ok) return { success: false };
  const user = await res.json();
  return { success: true, user };
}
