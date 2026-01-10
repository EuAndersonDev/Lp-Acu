import axios, { AxiosError } from 'axios';
import { axiosClient } from './axiosClient';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  status?: number;
}

export class ContactError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ContactError';
  }
}

const buildRequestInfo = (path: string) => {
  const base = axiosClient.defaults.baseURL ?? '';
  const url = `${base}${path}`;
  return { baseURL: base, url };
};

/**
 * Envia formulário de contato para o backend
 * @param data - Dados do formulário (nome, email, mensagem)
 * @returns Resposta do servidor
 */
export const sendContact = async (data: ContactFormData): Promise<ContactResponse> => {
  const payload = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim(),
  };

  const { baseURL, url } = buildRequestInfo('/api/contact');

  try {
    const response = await axiosClient.post('/api/contact', payload);

    console.info('sendContact: sucesso', {
      status: response.status,
      statusText: response.statusText,
    });

    return {
      success: true,
      message: response.data?.message || 'Mensagem enviada com sucesso!',
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('sendContact: falha na requisição', {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data,
        message: error.message,
      });

      const status = error.response?.status || 0;
      const errorData = error.response?.data as { message?: string; error?: string; errors?: Record<string, string> } | undefined;
      const message =
        errorData?.message ||
        errorData?.error ||
        `Erro ao enviar (status ${status})`;

      throw new ContactError(status, message, errorData);
    } else if (error instanceof Error) {
      console.error('sendContact: erro padrão', { name: error.name, message: error.message, stack: error.stack });
    }

    console.error('sendContact: erro inesperado', error);
    throw new ContactError(0, 'Erro ao enviar formulário. Tente novamente mais tarde.');
  }
};
