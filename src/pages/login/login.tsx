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
			// Alerts específicos baseado no tipo de erro
			let alertMessage = 'Tente novamente mais tarde.';
			let alertTitle = 'Erro no login';

			switch (loginRes.errorType) {
				case 'user_not_found':
					alertTitle = 'Usuário não encontrado';
					alertMessage = 'Nenhuma conta foi encontrada com este email. Deseja criar uma?';
					break;
				case 'password_invalid':
					alertTitle = 'Senha inválida';
					alertMessage = 'A senha está incorreta. Verifique e tente novamente.';
					break;
				case 'invalid_credentials':
					alertTitle = 'Credenciais inválidas';
					alertMessage = 'Email ou senha incorretos. Tente novamente.';
					break;
				case 'missing_fields':
					alertTitle = 'Campos obrigatórios';
					alertMessage = 'Por favor, preencha email e senha.';
					break;
				case 'server_error':
					alertTitle = 'Erro do servidor';
					alertMessage = 'Ocorreu um erro no servidor. Tente novamente em alguns instantes.';
					break;
				default:
					alertTitle = 'Erro ao conectar';
					alertMessage = 'Não foi possível conectar. Verifique sua conexão e tente novamente.';
			}

			await swal.fire({
				title: alertTitle,
				text: alertMessage,
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
			title: 'Login bem-sucedido',
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

