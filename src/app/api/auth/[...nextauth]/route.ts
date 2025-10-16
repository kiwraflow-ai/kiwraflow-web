// Temporarily disabled for deployment
// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// Temporary placeholder
export async function GET() {
  return new Response("Auth temporarily disabled", { status: 503 });
}

export async function POST() {
  return new Response("Auth temporarily disabled", { status: 503 });
}