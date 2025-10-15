import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "KiwraFlow - Gestão fluida e inteligente para pequenas empresas",
  description: "Simplifique contratos, relatórios e cobranças em um só painel. Micro-SaaS de gestão simples, fluida e inteligente para pequenas empresas.",
  keywords: "gestão empresarial, contratos, relatórios, cobranças, pequenas empresas, automação",
  authors: [{ name: "KiwraFlow" }],
  openGraph: {
    title: "KiwraFlow - Gestão fluida e inteligente para pequenas empresas",
    description: "Simplifique contratos, relatórios e cobranças em um só painel.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
