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
import { loginUser, fetchMe } from '../../services/auth';
import { setAuthData } from '../../services/storage';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		if (!email || !password) {
			setError('Preencha email e senha.');
			return;
		}

		// Handler preparado para API: login -> fetchMe -> persistir -> navegar
		const loginRes = await loginUser({ email, password });
		if (!loginRes.success || !loginRes.token) {
			await swal.fire({
				title: 'Erro no login',
				text: 'Tente novamente mais tarde.',
				icon: 'error',
				confirmButtonText: 'Ok',
			});
			return;
		}

		const meRes = await fetchMe(loginRes.token);
		if (meRes.success && meRes.user) {
			setAuthData({ token: loginRes.token, user: meRes.user });
		}

		await swal.fire({
			title: 'Login enviado',
			text: 'Você será redirecionado em breve.',
			icon: 'success',
			confirmButtonText: 'Entrar',
		});
		navigate('/');
	}

	return (
		<AuthLayout>
			<div className="space-y-6">
				<AuthTitle title="Entrar" subtitle="Acesse sua conta para continuar" />
				<ErrorAlert message={error} />
				<form onSubmit={handleSubmit} className="space-y-4">
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
					<SubmitButton label="Entrar" />
				</form>
				<SwitchAuthLink to="/register" textBefore="Não tem conta?" linkText="Registre-se" />
			</div>
		</AuthLayout>
	);
}

