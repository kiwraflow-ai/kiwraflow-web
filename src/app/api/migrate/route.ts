import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    console.log("🔄 Iniciando migração do banco...");
    
    // Conectar ao banco
    await prisma.$connect();
    console.log("✅ Banco conectado");
    
    // Executar migração manual (criar tabelas)
    console.log("📋 Criando tabelas...");
    
    // Criar tabela User
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT,
        "email" TEXT NOT NULL UNIQUE,
        "emailVerified" TIMESTAMP(3),
        "image" TEXT,
        "password" TEXT,
        "plan" "Plan" NOT NULL DEFAULT 'STARTER',
        "stripeCustomerId" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      )
    `;
    
    // Criar tabela Account
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Account" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "provider" TEXT NOT NULL,
        "providerAccountId" TEXT NOT NULL,
        "refresh_token" TEXT,
        "access_token" TEXT,
        "expires_at" INTEGER,
        "token_type" TEXT,
        "scope" TEXT,
        "id_token" TEXT,
        "session_state" TEXT,
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
      )
    `;
    
    // Criar tabela Session
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Session" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "sessionToken" TEXT NOT NULL UNIQUE,
        "userId" TEXT NOT NULL,
        "expires" TIMESTAMP(3) NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
      )
    `;
    
    // Criar tabela VerificationToken
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "VerificationToken" (
        "identifier" TEXT NOT NULL,
        "token" TEXT NOT NULL UNIQUE,
        "expires" TIMESTAMP(3) NOT NULL,
        PRIMARY KEY ("identifier", "token")
      )
    `;
    
    // Criar tabela Contract
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Contract" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "status" "ContractStatus" NOT NULL DEFAULT 'DRAFT',
        "clientName" TEXT NOT NULL,
        "clientEmail" TEXT NOT NULL,
        "clientPhone" TEXT,
        "value" REAL,
        "dueDate" TIMESTAMP(3),
        "signedAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "userId" TEXT NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
      )
    `;
    
    // Criar tabela Invoice
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Invoice" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "contractId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "amount" REAL NOT NULL,
        "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING',
        "dueDate" TIMESTAMP(3) NOT NULL,
        "paidAt" TIMESTAMP(3),
        "stripePaymentIntentId" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE,
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
      )
    `;
    
    // Criar tipos ENUM
    await prisma.$executeRaw`CREATE TYPE "Plan" AS ENUM ('STARTER', 'PRO', 'BUSINESS')`;
    await prisma.$executeRaw`CREATE TYPE "ContractStatus" AS ENUM ('DRAFT', 'SENT', 'SIGNED', 'EXPIRED', 'CANCELLED')`;
    await prisma.$executeRaw`CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED')`;
    
    console.log("✅ Migração concluída com sucesso!");
    
    // Verificar tabelas criadas
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    return NextResponse.json({
      success: true,
      message: "Migração executada com sucesso",
      tables: tables
    });
    
  } catch (error) {
    console.error("❌ Erro na migração:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
    
  } finally {
    await prisma.$disconnect();
  }
}
