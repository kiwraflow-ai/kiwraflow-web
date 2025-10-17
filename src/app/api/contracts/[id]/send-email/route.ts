import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// POST - Enviar contrato por email
export async function POST(
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
    const { clientEmail, message } = body;

    // Buscar o contrato
    const contract = await prisma.contract.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    });

    if (!contract) {
      return NextResponse.json({ error: "Contrato não encontrado" }, { status: 404 });
    }

    // Simular envio de email (em produção, usar SendGrid, Resend, etc.)
    console.log('📧 Enviando email para:', clientEmail);
    console.log('📄 Contrato:', contract.title);
    console.log('💬 Mensagem:', message);

    // Aqui você integraria com um serviço de email real
    // Exemplo com Resend:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'noreply@kiwraflow.com',
      to: clientEmail,
      subject: `Contrato: ${contract.title}`,
      html: `
        <h1>Olá!</h1>
        <p>${message}</p>
        <p>Por favor, revise e assine o contrato clicando no link abaixo:</p>
        <a href="${process.env.NEXTAUTH_URL}/contracts/${contract.id}/sign">Assinar Contrato</a>
      `
    });
    */

    // Atualizar status do contrato
    await prisma.contract.update({
      where: { id },
      data: { 
        status: 'SENT',
        sentAt: new Date()
      }
    });

    return NextResponse.json({
      message: "Email enviado com sucesso",
      contractId: id
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
