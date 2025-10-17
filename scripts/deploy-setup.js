#!/usr/bin/env node

/**
 * Script para configurar o projeto para deploy no Vercel
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando projeto para deploy no Vercel...\n');

// 1. Verificar se o package.json tem os scripts necessários
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Adicionar scripts de build se não existirem
if (!packageJson.scripts.build) {
  packageJson.scripts.build = 'next build';
}

if (!packageJson.scripts.start) {
  packageJson.scripts.start = 'next start';
}

if (!packageJson.scripts.postinstall) {
  packageJson.scripts.postinstall = 'prisma generate';
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Scripts de build configurados');

// 2. Criar vercel.json se não existir
const vercelJsonPath = path.join(process.cwd(), 'vercel.json');
if (!fs.existsSync(vercelJsonPath)) {
  const vercelConfig = {
    "buildCommand": "npm run build",
    "outputDirectory": ".next",
    "installCommand": "npm install && npx prisma generate",
    "framework": "nextjs",
    "functions": {
      "app/api/**/*.ts": {
        "runtime": "nodejs18.x"
      }
    }
  };
  
  fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2));
  console.log('✅ vercel.json criado');
}

// 3. Criar .vercelignore se não existir
const vercelIgnorePath = path.join(process.cwd(), '.vercelignore');
if (!fs.existsSync(vercelIgnorePath)) {
  const vercelIgnore = `# Dependencies
node_modules
npm-debug.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Database
*.db
*.sqlite
*.sqlite3

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# next.js build output
.next

# Nuxt.js build output
.nuxt

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;
  
  fs.writeFileSync(vercelIgnorePath, vercelIgnore);
  console.log('✅ .vercelignore criado');
}

console.log('\n🎉 Projeto configurado para deploy no Vercel!');
console.log('\n📋 Próximos passos:');
console.log('1. Faça commit das mudanças: git add . && git commit -m "Prepare for Vercel deploy"');
console.log('2. Conecte seu repositório no Vercel');
console.log('3. Configure as variáveis de ambiente no painel do Vercel');
console.log('4. Configure um banco PostgreSQL (Neon, Supabase, ou Railway)');
console.log('5. Execute: npx prisma db push');
console.log('\n🚀 Seu projeto estará online!');
