import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET - Listar contratos do usuário
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const contracts = await prisma.contract.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ contracts });
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar novo contrato
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { title, clientName, clientEmail, clientPhone, value, dueDate, content } = body;

    // Validações básicas
    if (!title || !clientName || !clientEmail || !value || !content) {
      return NextResponse.json(
        { error: "Campos obrigatórios: título, nome do cliente, email, valor e conteúdo" },
        { status: 400 }
      );
    }

    const contract = await prisma.contract.create({
      data: {
        title,
        clientName,
        clientEmail,
        clientPhone: clientPhone || null,
        value: parseFloat(value),
        dueDate: dueDate ? new Date(dueDate) : null,
        content,
        userId: session.user.id,
        status: "DRAFT"
      }
    });

    return NextResponse.json(
      { message: "Contrato criado com sucesso", contract },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar contrato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
