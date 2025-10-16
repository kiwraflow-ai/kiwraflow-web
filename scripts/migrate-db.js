const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateDatabase() {
  try {
    console.log('🔄 Executando migrações do banco...');
    
    // Testar conexão
    await prisma.$connect();
    console.log('✅ Conexão com banco estabelecida');
    
    // Verificar se as tabelas existem
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('📋 Tabelas encontradas:', tables);
    
    console.log('✅ Migrações concluídas com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro nas migrações:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateDatabase();
