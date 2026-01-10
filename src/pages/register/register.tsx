import { useState, useEffect } from 'react';
import AuthLayout from '../auth/AuthLayout';
import AuthTitle from '../auth/components/AuthTitle';
import ErrorAlert from '../auth/components/ErrorAlert';
import TextInput from '../auth/components/TextInput';
import PasswordInput from '../auth/components/PasswordInput';
import SubmitButton from '../auth/components/SubmitButton';
import SwitchAuthLink from '../auth/components/SwitchAuthLink';
import { swal } from '../../lib/swal';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !confirm) {
      setError('Preencha todos os campos.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('As senhas não conferem.');
      return;
    }

    // Iniciar countdown
    setCountdown(5);

    // Mostrar alerta de espera (sem await)
    swal.fire({
      title: 'Aguarde',
      html: 'Processando seu cadastro...',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
    });

    // Esperar a requisição E no mínimo 2 segundos
    const [result] = await Promise.all([
      registerUser({ name, email, password }),
      new Promise(resolve => setTimeout(resolve, 2000))
    ]);
    
    // Fechar alert de espera
    swal.close();
    if (result.success) {
      await swal.fire({
        title: 'Conta criada!',
        text: 'Seu cadastro foi realizado com sucesso. Faça login para continuar.',
        icon: 'success',
        confirmButtonText: 'Ir para login',
      });
      navigate('/login');
    } else {
      // Alerts específicos baseado no tipo de erro
      let alertMessage = 'Tente novamente mais tarde.';
      let alertTitle = 'Erro no cadastro';

      switch (result.errorType) {
        case 'user_exists':
          alertTitle = 'Email já cadastrado';
          alertMessage = 'Este email já está em uso. Faça login ou use outro email.';
          break;
        case 'missing_fields':
          alertTitle = 'Campos obrigatórios';
          alertMessage = 'Por favor, preencha todos os campos obrigatórios.';
          break;
        case 'server_error':
          alertTitle = 'Erro no servidor';
          alertMessage = 'Ocorreu um problema no servidor. Tente novamente em alguns instantes.';
          break;
        default:
          alertTitle = 'Erro ao cadastrar';
          alertMessage = 'Não foi possível completar o cadastro. Verifique sua conexão e tente novamente.';
      }

      await swal.fire({
        title: alertTitle,
        text: alertMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <AuthTitle title="Criar conta" subtitle="Preencha seus dados para começar" />
        <ErrorAlert message={error} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Nome"
            value={name}
            onChange={setName}
            placeholder="Seu nome"
            autoComplete="name"
            disabled={countdown > 0}
          />
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="seuemail@exemplo.com"
            autoComplete="email"
            disabled={countdown > 0}
          />
          <PasswordInput
            label="Senha"
            value={password}
            onChange={setPassword}
            disabled={countdown > 0}
          />
          <PasswordInput
            label="Confirmar senha"
            value={confirm}
            onChange={setConfirm}
            disabled={countdown > 0}
          />
          <SubmitButton label="Criar conta" countdown={countdown} />
        </form>
        <SwitchAuthLink to="/login" textBefore="Já tem conta?" linkText="Entrar" />
      </div>
    </AuthLayout>
  );
}
