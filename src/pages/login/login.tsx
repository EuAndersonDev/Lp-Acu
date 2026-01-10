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
import { loginUser, fetchMe } from '../../services/auth';
import { setTokens } from '../../services/storage';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
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

		if (!email || !password) {
			setError('Preencha email e senha.');
			return;
		}

		// Iniciar countdown
		setCountdown(5);

		// Mostrar alerta de espera (sem await)
		swal.fire({
			title: 'Aguarde',
			html: 'Processando sua requisição...',
			icon: 'info',
			allowOutsideClick: false,
			allowEscapeKey: false,
			showConfirmButton: false,
		});

		// Esperar a requisição E no mínimo 2 segundos
		const [loginRes] = await Promise.all([
			loginUser({ email, password }),
			new Promise(resolve => setTimeout(resolve, 2000))
		]);
		
		// Fechar alert de espera
		swal.close();
		if (!loginRes.success || !loginRes.accessToken || !loginRes.refreshToken) {
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

		const meRes = await fetchMe();
		if (meRes.success && meRes.user) {
			setTokens(loginRes.accessToken!, loginRes.refreshToken!, meRes.user);
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
						disabled={countdown > 0}
					/>
					<PasswordInput
						label="Senha"
						value={password}
						onChange={setPassword}
						disabled={countdown > 0}
					/>
					<SubmitButton label="Entrar" countdown={countdown} />
				</form>
				<SwitchAuthLink to="/register" textBefore="Não tem conta?" linkText="Registre-se" />
			</div>
		</AuthLayout>
	);
}

