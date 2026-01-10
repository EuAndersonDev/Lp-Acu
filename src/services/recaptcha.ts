/**
 * OPCIONAL: Integração com Google reCAPTCHA v3
 * Para proteger contra bots e spam
 */

import { axiosClient } from './axiosClient';

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

/**
 * Envia token reCAPTCHA para validação no backend
 * Requer configuração do reCAPTCHA v3 no Google Cloud
 */
export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const response = await axiosClient.post('/verify-recaptcha', { token });
    return response.data?.success === true;
  } catch (error) {
    console.error('Erro ao verificar reCAPTCHA:', error);
    return false;
  }
};

/**
 * Carrega o script do reCAPTCHA
 * Chame uma única vez no App.tsx ou em main.tsx
 */
export const loadRecaptcha = (siteKey: string) => {
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

/**
 * Executa o reCAPTCHA e retorna o token
 */
export const executeRecaptcha = async (action: string): Promise<string> => {
  if (!window.grecaptcha) {
    throw new Error('reCAPTCHA não carregado');
  }

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  return window.grecaptcha.execute(siteKey, { action });
};

/**
 * Tipo para resposta do reCAPTCHA
 */
export interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error_codes?: string[];
}

export default {
  verifyRecaptcha,
  loadRecaptcha,
  executeRecaptcha,
};
