import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    console.log("🔍 Testando conexão com banco...");
    
    // Testar conexão
    await prisma.$connect();
    console.log("✅ Banco conectado");
    
    // Testar query simples
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Query testada:", result);
    
    // Verificar se as tabelas existem
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log("📋 Tabelas encontradas:", tables);
    
    return NextResponse.json({
      success: true,
      message: "Banco conectado com sucesso",
      tables: tables
    });
    
  } catch (error) {
    console.error("❌ Erro na conexão:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      details: "Erro ao conectar com o banco de dados"
    }, { status: 500 });
    
  } finally {
    await prisma.$disconnect();
  }
}
