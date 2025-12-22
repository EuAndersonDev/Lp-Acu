

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Enviando...",
      text: "Aguarde enquanto processamos sua mensagem.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message
    };

    emailjs
      .send(
       "service_qhfupt5",
        "template_302bykb",
        templateParams,
        "OqeSiNeuJ86qPljc2"
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Mensagem enviada!",
          text: "Entraremos em contato em breve.",
          confirmButtonColor: "#ff7a00"
        });

        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Erro ao enviar",
          text: "Ocorreu um problema. Tente novamente mais tarde.",
          confirmButtonColor: "#ff0000"
        });
      });
  };

  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Entre em Contato</h2>
          <p className="text-xl text-gray-600">Estamos prontos para atender você</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* ---------------------------------------------------------
              LADO DAS INFORMAÇÕES (MANTIDO 100% IGUAL)
          ---------------------------------------------------------- */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h3>

              <div className="space-y-6">

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Telefone</h4>
                    <p className="text-gray-600">(11) 2016-8400</p>
                    <p className="text-gray-600">(11) 95281-5167</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-orange-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">E-mail</h4>
                    <p className="text-gray-600">acumateriascontrucao@gmail.com</p>
                    <p className="text-gray-600">acumateriaisconstrucao@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
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
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Horário</h4>
                    <p className="text-gray-600">Segunda a Sexta: 7h às 19h</p>
                    <p className="text-gray-600">Sábado: 7h às 17h</p>
                    <p className="text-gray-600">Sábado: 7h às 17h</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------
              FORMULÁRIO FINAL COM EMAILJS + SWEETALERT
          ---------------------------------------------------------- */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Solicite um Orçamento</h3>

              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="(11) 98765-4321"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mensagem</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                    placeholder="Conte-nos sobre seu projeto..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition font-semibold text-lg"
                >
                  Enviar Mensagem
                </button>

              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
