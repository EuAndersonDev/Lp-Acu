/**
 * Exemplo de testes para o formulário de contato
 * Use Jest + React Testing Library para executar
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import * as contactService from '../../../services/contact';

// Mock do serviço de contato
jest.mock('../../../services/contact');

describe('Componente Contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário com todos os campos', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar mensagem/i })).toBeInTheDocument();
  });

  it('deve exibir erro se nome estiver vazio ao enviar', async () => {
    render(<Contact />);

    const button = screen.getByRole('button', { name: /enviar mensagem/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
    });
  });

  it('deve exibir erro se email for inválido', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const button = screen.getByRole('button', { name: /enviar mensagem/i });

    await userEvent.type(nameInput, 'João Silva');
    await userEvent.type(emailInput, 'email-invalido');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
  });

  it('deve exibir erro se mensagem tiver menos de 10 caracteres', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const messageInput = screen.getByLabelText(/mensagem/i);
    const button = screen.getByRole('button', { name: /enviar mensagem/i });

    await userEvent.type(nameInput, 'João Silva');
    await userEvent.type(emailInput, 'joao@example.com');
    await userEvent.type(messageInput, 'Oi');
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/mensagem deve ter no mínimo 10 caracteres/i)
      ).toBeInTheDocument();
    });
  });

  it('deve enviar formulário com dados válidos', async () => {
    (contactService.sendContact as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Mensagem enviada com sucesso!',
    });

    render(<Contact />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const messageInput = screen.getByLabelText(/mensagem/i);
    const button = screen.getByRole('button', { name: /enviar mensagem/i });

    await userEvent.type(nameInput, 'João Silva');
    await userEvent.type(emailInput, 'joao@example.com');
    await userEvent.type(messageInput, 'Gostaria de saber mais sobre seus produtos');

    fireEvent.click(button);

    await waitFor(() => {
      expect(contactService.sendContact).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@example.com',
        message: 'Gostaria de saber mais sobre seus produtos',
      });
    });
  });

  it('deve exibir mensagem de erro ao falhar no envio', async () => {
    (contactService.sendContact as jest.Mock).mockRejectedValue(
      new Error('Erro ao conectar com servidor')
    );

    render(<Contact />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const messageInput = screen.getByLabelText(/mensagem/i);
    const button = screen.getByRole('button', { name: /enviar mensagem/i });

    await userEvent.type(nameInput, 'João Silva');
    await userEvent.type(emailInput, 'joao@example.com');
    await userEvent.type(messageInput, 'Gostaria de saber mais sobre seus produtos');

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/erro ao enviar/i)).toBeInTheDocument();
    });
  });

  it('deve desabilitar o botão enquanto envia', async () => {
    (contactService.sendContact as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ success: true }), 1000)
        )
    );

    render(<Contact />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const messageInput = screen.getByLabelText(/mensagem/i);
    const button = screen.getByRole('button', { name: /enviar mensagem/i });

    await userEvent.type(nameInput, 'João Silva');
    await userEvent.type(emailInput, 'joao@example.com');
    await userEvent.type(messageInput, 'Gostaria de saber mais sobre seus produtos');

    fireEvent.click(button);

    // Botão deve estar desabilitado durante envio
    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(screen.getByText(/enviando/i)).toBeInTheDocument();
    });
  });

  it('deve limpar o formulário após envio bem-sucedido', async () => {
    (contactService.sendContact as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Mensagem enviada com sucesso!',
    });

    render(<Contact />);

    const nameInput = screen.getByLabelText(/nome completo/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/e-mail/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/mensagem/i) as HTMLTextAreaElement;
    const button = screen.getByRole('button', { name: /enviar mensagem/i });

    await userEvent.type(nameInput, 'João Silva');
    await userEvent.type(emailInput, 'joao@example.com');
    await userEvent.type(messageInput, 'Gostaria de saber mais sobre seus produtos');

    fireEvent.click(button);

    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });
});
