const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash('123456', 12);
    
    // Criar usuário de teste
    const user = await prisma.user.create({
      data: {
        name: 'Usuário Teste',
        email: 'teste@kiwraflow.com',
        password: hashedPassword,
        plan: 'STARTER',
      },
    });
    
    console.log('✅ Usuário de teste criado com sucesso!');
    console.log('📧 Email: teste@kiwraflow.com');
    console.log('🔑 Senha: 123456');
    console.log('👤 Nome:', user.name);
    console.log('📋 Plano:', user.plan);
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  Usuário de teste já existe!');
      console.log('📧 Email: teste@kiwraflow.com');
      console.log('🔑 Senha: 123456');
    } else {
      console.error('❌ Erro ao criar usuário:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
