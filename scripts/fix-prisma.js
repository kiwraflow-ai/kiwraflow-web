#!/usr/bin/env node

/**
 * Script para corrigir problemas do Prisma no Windows
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Corrigindo problemas do Prisma...\n');

try {
  // 1. Parar qualquer processo que possa estar usando o arquivo
  console.log('⏹️ Parando processos...');
  
  // 2. Tentar deletar o arquivo problemático
  const prismaPath = path.join(process.cwd(), 'node_modules', '.prisma', 'client');
  
  if (fs.existsSync(prismaPath)) {
    console.log('🗑️ Removendo cache do Prisma...');
    
    // Tentar deletar arquivos individuais
    const files = fs.readdirSync(prismaPath);
    files.forEach(file => {
      try {
        const filePath = path.join(prismaPath, file);
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
          console.log(`✅ Removido: ${file}`);
        }
      } catch (error) {
        console.log(`⚠️ Não foi possível remover: ${file}`);
      }
    });
  }

  // 3. Regenerar o Prisma Client
  console.log('🔄 Regenerando Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('\n✅ Prisma corrigido com sucesso!');
  console.log('🚀 Agora você pode fazer o build normalmente.');

} catch (error) {
  console.error('❌ Erro ao corrigir Prisma:', error.message);
  console.log('\n💡 Soluções alternativas:');
  console.log('1. Reinicie o terminal e tente novamente');
  console.log('2. Execute: npm install --force');
  console.log('3. Ou delete node_modules e execute: npm install');
}
