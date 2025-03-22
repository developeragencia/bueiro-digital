# Bueiro Digital

Sistema de integração com múltiplas plataformas de pagamento, construído com React e TypeScript.

## 🚀 Features

- ✅ Integração com 19+ plataformas de pagamento
- 📊 Dashboard com métricas em tempo real
- 🔄 Sincronização automática de transações
- 🎯 Gerador de UTMs para campanhas
- 🔐 Autenticação e autorização
- 🌙 Tema claro/escuro
- 📱 Design responsivo
- 🔍 Busca e filtros avançados

## 🛠️ Tecnologias

- React 18
- TypeScript 4.9+
- Vite
- TailwindCSS
- React Query
- React Hook Form
- Zod
- Jest
- React Testing Library

## 📦 Plataformas Suportadas

- Shopify
- Systeme
- StrivPay
- Appmax
- Pepper
- Logzz
- MaxWeb
- Digistore24
- FortPay
- ClickBank
- CartPanda
- Doppus
- Nitro
- MundPay
- PagTrust
- Hubla
- Ticto
- Kiwify
- FRC

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/developeragencia/bueiro-digital.git
cd bueiro-digital
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Preencha as variáveis no arquivo `.env`

5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

# Executar testes em watch mode
npm run test:watch
```

## 📦 Build

```bash
# Gerar build de produção
npm run build

# Visualizar build localmente
npm run preview
```

## 🚀 Deploy

O projeto está configurado para deploy automático na Vercel.

1. Conecte com sua conta Vercel
2. Configure as variáveis de ambiente necessárias
3. Deploy!

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📫 Contato

- Email: suporte@bueirodigital.com.br
- Twitter: [@bueirodigital](https://twitter.com/bueirodigital)
- Website: [bueirodigital.com.br](https://bueirodigital.com.br)

## Implantação

### Vercel

1. Faça fork deste repositório
2. Crie uma nova conta na [Vercel](https://vercel.com) se ainda não tiver uma
3. Importe o projeto do GitHub
4. Configure as variáveis de ambiente:
   - `VITE_API_URL`: URL da sua API em produção
   - `VITE_WEBHOOK_URL`: URL do webhook em produção
5. Clique em "Deploy"

A Vercel irá automaticamente:
- Detectar que é um projeto Vite + React
- Instalar as dependências
- Construir o projeto
- Fazer o deploy da aplicação

### Desenvolvimento Local

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

4. Configure as variáveis de ambiente no arquivo `.env`

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Constrói o projeto para produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter
- `npm test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo watch
- `npm run test:coverage` - Gera relatório de cobertura de testes

### Tecnologias

- React
- TypeScript
- Vite
- TailwindCSS
- React Query
- React Router DOM
- React Hook Form
- Zod
- Jest
- React Testing Library

### Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── contexts/      # Contextos React
  ├── hooks/         # Hooks customizados
  ├── lib/           # Utilitários e configurações
  ├── pages/         # Componentes de página
  └── types/         # Definições de tipos TypeScript
```

### Licença

MIT 