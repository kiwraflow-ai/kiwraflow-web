import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET - Buscar contrato específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const contract = await prisma.contract.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    });

    if (!contract) {
      return NextResponse.json({ error: "Contrato não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ contract });
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar contrato
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, clientName, clientEmail, clientPhone, value, dueDate, content, status } = body;

    // Verificar se o contrato existe e pertence ao usuário
    const existingContract = await prisma.contract.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    });

    if (!existingContract) {
      return NextResponse.json({ error: "Contrato não encontrado" }, { status: 404 });
    }

    const contract = await prisma.contract.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(clientName && { clientName }),
        ...(clientEmail && { clientEmail }),
        ...(clientPhone !== undefined && { clientPhone }),
        ...(value && { value: parseFloat(value) }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(content && { content }),
        ...(status && { status })
      }
    });

    return NextResponse.json(
      { message: "Contrato atualizado com sucesso", contract }
    );
  } catch (error) {
    console.error("Erro ao atualizar contrato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar contrato
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    // Verificar se o contrato existe e pertence ao usuário
    const existingContract = await prisma.contract.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    });

    if (!existingContract) {
      return NextResponse.json({ error: "Contrato não encontrado" }, { status: 404 });
    }

    await prisma.contract.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Contrato deletado com sucesso" }
    );
  } catch (error) {
    console.error("Erro ao deletar contrato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
