import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Falandou — Inglês para Profissionais",
  description: "Aprenda inglês com foco no seu objetivo profissional. Plano personalizado, professores especializados e acompanhamento ativo. Junte-se a mais de 600 profissionais que já evoluíram com a Falandou.",
  keywords: ["inglês profissional", "curso de inglês", "inglês para trabalho", "inglês executivo", "falandou"],
  openGraph: {
    title: "Falandou — Inglês para Profissionais",
    description: "Plano personalizado, professores especializados e acompanhamento ativo.",
    type: "website",
    locale: "pt_BR",
    url: "https://falandou.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400;500;600;700;800&family=Wix+Madefor+Text:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
