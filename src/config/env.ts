type Env = {
  VITE_API_BASE_URL?: string;
};

const env = import.meta.env as unknown as Env;

export const CONFIG = {
  API_BASE_URL: env.VITE_API_BASE_URL ?? 'https://backend-sistema-acu.onrender.com',
};

// Observação: variáveis de front-end são públicas; não coloque segredos aqui.
