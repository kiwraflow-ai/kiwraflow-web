# KiwraFlow - SaaS Completo

Um micro-SaaS completo de gestão empresarial com landing page, autenticação, dashboard e funcionalidades de gestão de contratos, relatórios e cobranças.

## 🎨 Identidade Visual

- **Cores principais:**
  - Verde-kiwi: `#55D187` (primária)
  - Azul-fluido: `#4CC9F0` (secundária)
  - Cinza-escuro: `#3A3A3A`
  - Cinza-claro: `#F6F7FB`

- **Fontes:** Inter (leve e moderna)
- **Estilo:** minimalista, fluido e limpo

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Framer Motion** - Animações
- **Heroicons** - Ícones

### Backend & Database
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados principal
- **NextAuth.js** - Autenticação
- **Stripe** - Pagamentos (configuração)

### Deploy & Infraestrutura
- **Vercel** - Deploy automático
- **PlanetScale/Supabase** - Banco de dados em nuvem

## 📱 Funcionalidades

### 🏠 Landing Page
1. **Hero Section** - Apresentação principal com CTA
2. **Nossas Soluções** - 3 cards com funcionalidades principais
3. **Por que Escolher** - Diferenciais do produto
4. **Planos de Assinatura** - 3 planos de preços
5. **Footer** - Informações de contato

### 🔐 Sistema de Autenticação
- **Login/Registro** - Autenticação com email/senha
- **Google OAuth** - Login com Google
- **Proteção de Rotas** - Middleware de autenticação
- **Sessões Seguras** - JWT tokens

### 📊 Dashboard Principal
- **Visão Geral** - Métricas e estatísticas
- **Contratos Recentes** - Lista de contratos
- **Ações Rápidas** - Navegação rápida
- **Sidebar Responsiva** - Navegação principal

### 📄 Gestão de Contratos
- **Criação de Contratos** - Formulários inteligentes
- **Assinatura Digital** - Processo de assinatura
- **Templates** - Modelos pré-definidos
- **Status Tracking** - Acompanhamento de status

### 💰 Sistema de Cobranças
- **Geração de Boletos** - Automática
- **Integração Stripe** - Pagamentos online
- **Relatórios Financeiros** - Análise de receitas
- **Notificações** - Lembretes de pagamento

### 📈 Relatórios Inteligentes
- **Dashboards Interativos** - Gráficos em tempo real
- **Exportação** - PDF, Excel
- **Métricas de Negócio** - KPIs importantes
- **Análise de Dados** - Insights automáticos

### Características Técnicas

- ✅ **Responsivo** - Desktop, tablet e mobile
- ✅ **Animações suaves** - Framer Motion
- ✅ **Performance otimizada** - Next.js
- ✅ **SEO otimizado** - Meta tags e estrutura semântica
- ✅ **Acessibilidade** - Navegação por teclado e screen readers
- ✅ **Micro-interações** - Hover effects e transições

## 🛠️ Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Linting
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (auth)/              # Rotas de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Área logada
│   │   ├── dashboard/
│   │   ├── contracts/
│   │   ├── reports/
│   │   └── billing/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   └── [...nextauth]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Landing page
├── components/
│   ├── sections/            # Seções da landing page
│   ├── dashboard/           # Componentes do dashboard
│   ├── layout/              # Layout components
│   └── providers/           # Context providers
├── lib/
│   ├── auth.ts              # Configuração NextAuth
│   └── db.ts                # Prisma client
└── types/                   # Tipos TypeScript
```

## 🎯 Otimizações Implementadas

- **Lazy Loading** - Carregamento otimizado de imagens
- **Code Splitting** - Divisão automática do código
- **Font Optimization** - Carregamento otimizado de fontes
- **CSS Purging** - Remoção de CSS não utilizado
- **Image Optimization** - Otimização automática de imagens

## 📱 Responsividade

A landing page foi desenvolvida com abordagem mobile-first e inclui breakpoints para:

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

## 🚀 Deploy

### Deploy Automático na Vercel

O projeto está configurado para deploy automático no Vercel:

1. **Conecte o repositório ao Vercel**
2. **Configure as variáveis de ambiente (se necessário)**
3. **O deploy será automático a cada push na branch main**

### Deploy Manual

```bash
# Build do projeto
npm run build

# Deploy na Vercel
npx vercel --prod
```

### Botão "Deploy to Vercel"

A landing page inclui um botão "Deploy to Vercel" que permite deploy em 1 clique diretamente do GitHub.

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato através do WhatsApp integrado na landing page.

---

**KiwraFlow** - Gestão fluida e inteligente para pequenas empresas