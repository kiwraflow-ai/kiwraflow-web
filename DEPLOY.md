# 🚀 Deploy do KiwraFlow no Vercel

## 📋 Pré-requisitos

- [ ] Conta no Vercel
- [ ] Conta no GitHub/GitLab/Bitbucket
- [ ] Banco PostgreSQL (Neon, Supabase, Railway, etc.)

## 🛠️ Passo a Passo

### 1. **Preparar o Repositório**

```bash
# Fazer commit das mudanças
git add .
git commit -m "Prepare for Vercel deploy"
git push origin main
```

### 2. **Configurar Banco PostgreSQL**

#### Opção A: Neon (Recomendado)
1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a string de conexão

#### Opção B: Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Vá em Settings > Database
5. Copie a string de conexão

#### Opção C: Railway
1. Acesse [railway.app](https://railway.app)
2. Crie uma conta gratuita
3. Crie um novo projeto PostgreSQL
4. Copie a string de conexão

### 3. **Deploy no Vercel**

1. **Conectar Repositório**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Conecte seu repositório GitHub/GitLab/Bitbucket
   - Selecione o repositório do KiwraFlow

2. **Configurar Variáveis de Ambiente**
   - No painel do Vercel, vá em Settings > Environment Variables
   - Adicione as seguintes variáveis:

   ```
   DATABASE_URL=postgresql://username:password@host:5432/database
   NEXTAUTH_URL=https://seu-projeto.vercel.app
   NEXTAUTH_SECRET=seu-secret-super-seguro-aqui
   ```

3. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build completar

### 4. **Configurar Banco de Dados**

Após o deploy, execute no terminal:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Conectar ao projeto
vercel link

# Executar migrações
npx prisma db push
```

### 5. **Testar o Deploy**

1. Acesse sua URL do Vercel
2. Teste o cadastro de usuário
3. Teste a criação de contratos
4. Verifique se tudo está funcionando

## 🔧 Configurações Adicionais

### **Email (Opcional)**
Para funcionalidades de email, adicione:

```
RESEND_API_KEY=re_xxxxxxxxxx
# ou
SENDGRID_API_KEY=SG.xxxxxxxxxx
```

### **Pagamentos (Opcional)**
Para integrações de pagamento:

```
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx
```

## 🐛 Solução de Problemas

### **Erro de Banco de Dados**
- Verifique se a `DATABASE_URL` está correta
- Execute `npx prisma db push` novamente

### **Erro de Build**
- Verifique se todas as dependências estão no `package.json`
- Execute `npm run build` localmente para testar

### **Erro de Autenticação**
- Verifique se `NEXTAUTH_SECRET` está configurado
- Verifique se `NEXTAUTH_URL` está correto

## 📊 Monitoramento

- **Vercel Dashboard**: Monitore performance e logs
- **Database**: Monitore uso do banco de dados
- **Analytics**: Configure Vercel Analytics

## 🚀 Próximos Passos

1. **Configurar Domínio Personalizado**
2. **Configurar SSL/HTTPS**
3. **Configurar Backup do Banco**
4. **Configurar Monitoramento**
5. **Configurar CI/CD**

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Vercel Dashboard
2. Teste localmente primeiro
3. Verifique as variáveis de ambiente
4. Consulte a documentação do Vercel

---

**🎉 Parabéns! Seu KiwraFlow está online!**
