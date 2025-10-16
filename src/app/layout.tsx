import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KiwraFlow - Gestão fluida e inteligente para pequenas empresas",
    template: "%s | KiwraFlow"
  },
  description: "Simplifique contratos, relatórios e cobranças em um só painel. Micro-SaaS de gestão simples, fluida e inteligente para pequenas empresas.",
  keywords: [
    "gestão empresarial",
    "contratos",
    "relatórios", 
    "cobranças",
    "pequenas empresas",
    "automação",
    "SaaS",
    "gestão financeira",
    "produtividade"
  ],
  authors: [{ name: "KiwraFlow", url: "https://kiwraflow.com" }],
  creator: "KiwraFlow",
  publisher: "KiwraFlow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kiwraflow.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KiwraFlow - Gestão fluida e inteligente para pequenas empresas",
    description: "Simplifique contratos, relatórios e cobranças em um só painel.",
    url: "https://kiwraflow.com",
    siteName: "KiwraFlow",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KiwraFlow - Gestão fluida e inteligente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KiwraFlow - Gestão fluida e inteligente para pequenas empresas",
    description: "Simplifique contratos, relatórios e cobranças em um só painel.",
    images: ["/twitter-image.png"],
    creator: "@kiwraflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased font-sans bg-white text-dark">
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>
        <ThemeProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
