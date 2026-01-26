

# 🩺 LP-Acu — Frontend do Sistema ACU

Este repositório contém o **frontend responsivo** da landing page e interface do **Sistema ACU**, desenvolvido como parte de um projeto completo que inclui tanto frontend quanto backend.

O frontend foi construído para funcionar em conjunto com o backend disponível em:

👉 [https://github.com/EuAndersonDev/Backend-Sistema-Acu.git](https://github.com/EuAndersonDev/Backend-Sistema-Acu.git)

---

## 🚀 Sobre o Projeto

O **LP-Acu** é a interface web que usuários interagem para acessar e utilizar o **Sistema ACU**. Ele foi criado com foco em:

* 🧠 Usabilidade e UX clean
* 📱 Design responsivo para dispositivos móveis e desktop
* ⚡ Integração com API backend para envio e recebimento de dados
* 💻 Experiência moderna com tecnologias web

---

## 🗂 Estrutura do Repositório

A estrutura de pastas segue boas práticas de organização de frontend:

```
Lp-Acu/
├── public/           # Arquivos públicos estáticos
├── src/              # Código fonte do frontend
│   ├── assets/       # Imagens, ícones, fontes
│   ├── components/   # Componentes reutilizáveis
│   ├── pages/        # Páginas principais da aplicação
│   ├── styles/       # Estilos globais e variáveis
│   ├── App.js        # Ponto de entrada visual
│   └── main.js       # Inicialização da aplicação
├── .gitignore
├── index.html
├── package.json
└── README.md
```

> ⚙️ A estrutura pode variar conforme o framework utilizado e suas configurações.

---

## 🛠️ Tecnologias Utilizadas

Esse projeto utiliza tecnologias modernas de desenvolvimento frontend:

| Tecnologia                                     | Função                                 |
| ---------------------------------------------- | -------------------------------------- |
| ⚛️ React.js (ou outro framework, se aplicável) | Construção de interface reativa        |
| 📜 HTML5                                       | Marcação semântica                     |
| 🎨 CSS3 / Sass / Tailwind                      | Estilização e design visual            |
| 📦 Vite / Webpack / Create React App           | Build e ferramentas de desenvolvimento |
| 🧪 (Opcional) Jest / Testing Library           | Testes de interface                    |

> Coloque ou ajuste a tecnologia correta se o projeto não for React.

---

## 🔌 Integração com o Backend

Este frontend consome a API REST do backend disponível em:

📌 **Backend Sistema ACU**
👉 [https://github.com/EuAndersonDev/Backend-Sistema-Acu.git](https://github.com/EuAndersonDev/Backend-Sistema-Acu.git)

Certifique-se de configurar a URL base da API no frontend antes de rodar a aplicação.

Exemplo de variável de ambiente:

```env
VITE_API_URL=http://localhost:3000/api
```

Ou, se estiver usando CRA:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

---

## 💻 Como Rodar o Projeto

Siga estes passos para iniciar o frontend localmente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/EuAndersonDev/Lp-Acu.git
   ```

2. Acesse a pasta:

   ```bash
   cd Lp-Acu
   ```

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn
   ```

4. Crie o arquivo de variáveis de ambiente (`.env`) com a URL da API do backend.

5. Inicie a aplicação em modo de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

6. Abra no navegador:

   ```
   http://localhost:3000
   ```

---

## 📌 Funcionalidades Principais

✔️ Landing Page com informações sobre o Sistema ACU
✔️ Seções com benefícios, contato e formulários
✔️ Integração com backend para envio/recebimento de dados
✔️ Design responsivo e acessível

> Detalhe mais funcionalidades específicas dependendo do que está implementado no projeto.

---

## 📝 Notas de Desenvolvimento

* Configure variáveis de ambiente antes de rodar
* Verifique se o backend está rodando corretamente
* Use ferramentas como **ESLint** e **Prettier** para manter padrão de código
* Componentize a UI para facilitar manutenção

---

## 🤝 Contribuições

Contribuições e melhorias são bem-vindas!
Sinta-se à vontade para abrir issues ou fazer pull requests.

---

## 🧑‍💻 Autor

**Anderson Reis**
Estudante e desenvolvedor focado em frontend e backend com JavaScript/TypeScript

