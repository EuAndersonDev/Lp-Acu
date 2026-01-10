/**
 * Validações para formulários
 */

export const validation = {
  /**
   * Valida se o nome tem pelo menos 2 caracteres
   */
  isValidName: (name: string): boolean => {
    return name.trim().length >= 2;
  },

  /**
   * Valida formato de email
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  /**
   * Valida se a mensagem tem mínimo de 10 caracteres
   */
  isValidMessage: (message: string): boolean => {
    return message.trim().length >= 10;
  },

  /**
   * Retorna erro de validação
   */
  getErrors: (name: string, email: string, message: string) => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = 'Nome é obrigatório';
    } else if (!validation.isValidName(name)) {
      errors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!validation.isValidEmail(email)) {
      errors.email = 'Email inválido';
    }

    if (!message.trim()) {
      errors.message = 'Mensagem é obrigatória';
    } else if (!validation.isValidMessage(message)) {
      errors.message = 'Mensagem deve ter no mínimo 10 caracteres';
    }

    return errors;
  },
};
