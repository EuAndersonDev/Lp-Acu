type Env = {
  VITE_API_BASE_URL?: string;
  VITE_API_KEY?: string;
};

const env = import.meta.env as unknown as Env;

export const CONFIG = {
  API_BASE_URL: env.VITE_API_BASE_URL ?? '',
  API_KEY: env.VITE_API_KEY ?? '',
};

// Observação: credenciais em front-end são públicas.
// Use um backend/proxy para esconder chaves sensíveis quando possível.
