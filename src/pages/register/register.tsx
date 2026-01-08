import { useState } from 'react';
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
  const navigate = useNavigate();

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

    // Handler preparado para API
    const result = await registerUser({ name, email, password });
    if (result.success) {
      await swal.fire({
        title: 'Registro enviado',
        text: 'Conta criada com sucesso (demo).',
        icon: 'success',
        confirmButtonText: 'Ir para login',
      });
      navigate('/login');
    } else {
      await swal.fire({
        title: 'Erro no registro',
        text: 'Tente novamente mais tarde.',
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
          />
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="seuemail@exemplo.com"
            autoComplete="email"
          />
          <PasswordInput
            label="Senha"
            value={password}
            onChange={setPassword}
          />
          <PasswordInput
            label="Confirmar senha"
            value={confirm}
            onChange={setConfirm}
          />
          <SubmitButton label="Criar conta" />
        </form>
        <SwitchAuthLink to="/login" textBefore="Já tem conta?" linkText="Entrar" />
      </div>
    </AuthLayout>
  );
}
