import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Iniciando cadastro...");
    const { name, email, password } = await request.json();
    console.log("📧 Email:", email);

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Usuário já existe com este email" },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar novo usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        plan: "STARTER",
      },
    });

    // Remover a senha da resposta
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "Usuário criado com sucesso", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { 
        error: "Erro interno do servidor",
        details: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}
