import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Iniciando cadastro...");
    
    // Verificar se o banco está conectado
    await prisma.$connect();
    console.log("✅ Banco conectado");
    
    const body = await request.json();
    console.log("📝 Dados recebidos:", body);
    
    const { name, email, password } = body;

    // Validações básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    console.log("📧 Verificando email:", email);

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("⚠️ Usuário já existe");
      return NextResponse.json(
        { error: "Usuário já existe com este email" },
        { status: 400 }
      );
    }

    console.log("🔐 Fazendo hash da senha...");
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("👤 Criando usuário...");
    // Criar novo usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        plan: "STARTER",
      },
    });

    console.log("✅ Usuário criado com sucesso:", user.id);

    // Remover a senha da resposta
    const { password: _password, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "Usuário criado com sucesso", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Erro ao criar usuário:", error);
    
    // Log detalhado do erro
    if (error instanceof Error) {
      console.error("❌ Error message:", error.message);
      console.error("❌ Error stack:", error.stack);
    }
    
    return NextResponse.json(
      { 
        error: "Erro interno do servidor",
        details: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  } finally {
    // Desconectar do banco
    await prisma.$disconnect();
  }
}
