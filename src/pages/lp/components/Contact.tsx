import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { swal } from '../../../lib/swal';
import { sendContact, ContactError } from '../../../services/contact';
import { validation } from '../../../lib/validation';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Atualiza os dados do formulário
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Limpar erro do campo quando usuário começa a digitar
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  /**
   * Valida o formulário
   */
  const validateForm = (): boolean => {
    const newErrors = validation.getErrors(
      formData.name,
      formData.email,
      formData.message
    );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Envia o formulário
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar antes de enviar
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    let loadingAlertId: any;

    try {
      console.info('Contact: submit iniciado', {
        name: formData.name,
        email: formData.email,
        messageLength: formData.message.length,
      });

      // Exibir loading (mais rápido)
      loadingAlertId = swal.fire({
        title: 'Enviando...',
        text: 'Processando sua mensagem.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => swal.showLoading(),
      });

      // Enviar para o backend
      await sendContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      console.info('Contact: envio concluído com sucesso');

      // Fechar loading e exibir sucesso
      swal.close();
      
      swal.fire({
        icon: 'success',
        title: 'Enviado com sucesso!',
        text: 'Obrigado por entrar em contato. Responderemos em breve.',
        confirmButtonColor: '#f97316',
      });

      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      // Fechar loading
      swal.close();

      // Tratamento específico de erros
      let icon: 'error' | 'warning' = 'error';
      let title = 'Erro ao enviar';
      let text = 'Tente novamente mais tarde.';

      if (error instanceof ContactError) {
        const status = error.status;

        console.error('Contact: erro com status', { status, message: error.message, data: error.data });

        // 400 - Validação (nome, email, mensagem inválidos)
        if (status === 400) {
          icon = 'warning';
          title = '⚠️ Dados Inválidos';
          text = error.message || 'Verifique se todos os campos estão preenchidos corretamente.';
        }
        // 429 - Rate limit
        else if (status === 429) {
          icon = 'warning';
          title = '⏱️ Muitas Requisições';
          text = 'Você enviou vários formulários. Aguarde alguns minutos antes de enviar novamente.';
        }
        // 500 - Erro ao enviar email
        else if (status === 500) {
          icon = 'error';
          title = '😞 Erro no Servidor';
          text = 'Erro ao processar sua mensagem. Tente novamente em alguns minutos.';
        }
        // Outros erros com status
        else if (status > 0) {
          icon = 'error';
          title = `Erro ${status}`;
          text = error.message || 'Falha ao enviar formulário.';
        }
        // Erro de rede (status 0)
        else {
          icon = 'error';
          title = '🔌 Erro de Conexão';
          text = 'Verifique sua conexão com a internet e tente novamente.';
        }
      } else if (error instanceof Error) {
        console.error('Contact: erro padrão', { error: error.message });
        text = error.message;
      } else {
        console.error('Contact: erro desconhecido', error);
      }

      swal.fire({
        icon,
        title,
        text,
        confirmButtonColor: icon === 'warning' ? '#f59e0b' : '#ef4444',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Entre em Contato</h2>
          <p className="text-xl text-gray-600">Estamos prontos para atender você</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* LADO ESQUERDO - INFORMAÇÕES */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h3>

              <div className="flex-1 flex flex-col justify-evenly">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Telefone</h4>
                    <p className="text-gray-600">(11) 2016-8400</p>
                    <p className="text-gray-600">(11) 95281-5167</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">E-mail</h4>
                    <p className="text-gray-600">acumateriascontrucao@gmail.com</p>
                    <p className="text-gray-600">acumateriaisconstrucao@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Endereço</h4>
                    <p className="text-gray-600">
                      R. Manuel da Mota Coutinho, 222 B <br />
                      Lajeado, São Paulo - SP, 08451-420
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Horário</h4>
                    <p className="text-gray-600">Segunda a Sexta: 7h às 19h</p>
                    <p className="text-gray-600">Sábado: 7h às 17h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO - FORMULÁRIO */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Solicite um Orçamento
              </h3>

              <div className="flex-1 flex flex-col justify-evenly">
                {/* Campo Nome */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border rounded-lg transition ${
                      errors.name
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    placeholder="Seu nome"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Campo Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border rounded-lg transition ${
                      errors.email
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Campo Mensagem */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensagem * (mínimo 10 caracteres)
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border rounded-lg resize-none transition ${
                      errors.message
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    placeholder="Conte-nos sobre seu projeto, produto ou dúvida..."
                  />
                  <div className="flex justify-between items-end mt-1">
                    {errors.message && (
                      <p className="text-red-600 text-sm">{errors.message}</p>
                    )}
                    <p className="text-gray-500 text-sm">
                      {formData.message.length} caracteres
                    </p>
                  </div>
                </div>

                {/* Botão Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
                    isLoading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
                  }`}
                >
                  {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  * Campos obrigatórios. Suas informações são seguras e protegidas.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
