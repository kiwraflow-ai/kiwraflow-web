import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    // Create a test user if none exists
    const existingUser = await prisma.user.findFirst();
    
    if (!existingUser) {
      const testUser = await prisma.user.create({
        data: {
          name: "Usuário Teste",
          email: "teste@kiwraflow.com",
          password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
          plan: "STARTER",
        },
      });
      
      return NextResponse.json({
        success: true,
        message: "Test user created successfully",
        user: {
          id: testUser.id,
          email: testUser.email,
          name: testUser.name,
          plan: testUser.plan,
        },
      });
    }
    
    return NextResponse.json({
      success: true,
      message: "Database already has users",
      userCount: await prisma.user.count(),
    });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Migration failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}