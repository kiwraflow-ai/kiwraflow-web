# 🚀 Configuração do KiwraFlow SaaS

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL (local ou em nuvem)
- Conta no Google Cloud (para OAuth)
- Conta no Stripe (para pagamentos)

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Copie o arquivo `env.example` para `.env.local` e configure:

```bash
cp env.example .env.local
```

Configure as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/kiwraflow"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# Stripe (opcional)
STRIPE_PUBLISHABLE_KEY="sua-stripe-publishable-key"
STRIPE_SECRET_KEY="sua-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="sua-stripe-webhook-secret"
```

### 2. Banco de Dados

#### Opção A: PostgreSQL Local
```bash
# Instalar PostgreSQL
# Criar banco de dados
createdb kiwraflow

# Configurar DATABASE_URL no .env.local
```

#### Opção B: Supabase (Recomendado)
1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Copie a connection string para `DATABASE_URL`

#### Opção C: PlanetScale
1. Crie uma conta no [PlanetScale](https://planetscale.com)
2. Crie um novo banco de dados
3. Copie a connection string para `DATABASE_URL`

### 3. Configurar Prisma

```bash
# Gerar cliente Prisma
npm run db:generate

# Aplicar schema ao banco
npm run db:push

# Ou criar migração
npm run db:migrate
```

### 4. Google OAuth (Opcional)

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione existente
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Configure URIs de redirecionamento:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://seu-dominio.com/api/auth/callback/google`

### 5. Stripe (Opcional)

1. Crie uma conta no [Stripe](https://stripe.com)
2. Acesse as chaves da API
3. Configure as variáveis no `.env.local`

## 🚀 Executar o Projeto

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

## 📱 Funcionalidades Disponíveis

### ✅ Implementado
- ✅ Landing page responsiva
- ✅ Sistema de autenticação (email/senha + Google)
- ✅ Dashboard principal
- ✅ Proteção de rotas
- ✅ Layout responsivo
- ✅ Componentes reutilizáveis

### 🔄 Em Desenvolvimento
- 🔄 Gestão de contratos
- 🔄 Sistema de cobranças
- 🔄 Relatórios avançados
- 🔄 Integração Stripe
- 🔄 Notificações por email

## 🎯 Próximos Passos

1. **Configurar banco de dados**
2. **Testar autenticação**
3. **Implementar funcionalidades de contratos**
4. **Integrar pagamentos**
5. **Deploy na Vercel**

## 🐛 Troubleshooting

### Erro de conexão com banco
- Verifique se o PostgreSQL está rodando
- Confirme a string de conexão no `.env.local`
- Execute `npm run db:push`

### Erro de autenticação
- Verifique as variáveis `NEXTAUTH_URL` e `NEXTAUTH_SECRET`
- Confirme se o banco está configurado corretamente

### Erro de build
- Execute `npm run db:generate`
- Verifique se todas as dependências estão instaladas
- Execute `npm run type-check`

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Logs do terminal
2. Console do navegador
3. Documentação do Next.js
4. Documentação do Prisma
