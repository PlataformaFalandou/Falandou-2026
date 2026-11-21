import type { Metadata, Viewport } from "next";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/site";
import "./globals.css";
import AnalyticsProvider from "@/components/ui/AnalyticsProvider";
import EntrySegment from "@/components/ui/EntrySegment";
import CookieBanner from "@/components/ui/CookieBanner";
import SiteChrome from "@/components/ui/SiteChrome";

// Arquitetura §10 — metadataBase resolve URLs relativas (canonical, og:url, og:image)
// para o domínio do site. Sem `url`/`canonical` aqui: cada página define os seus
// (antes o og:url herdado apontava para falandou.com em várias páginas).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Domínio temporário fora do Google; liga sozinho no domínio definitivo (src/lib/site.ts).
  ...(SITE_INDEXABLE ? {} : { robots: { index: false, follow: false } }),
  title: "Falandou — Inglês para Profissionais",
  description: "Aprenda inglês com foco no seu objetivo profissional. Plano individual, sessões 1 a 1 e exame CEFR no início e no fim do ciclo. Mais de 600 profissionais formados pela Falandou.",
  keywords: ["inglês profissional", "curso de inglês", "inglês para trabalho", "inglês executivo", "falandou"],
  openGraph: {
    title: "Falandou — Inglês para Profissionais",
    description: "Plano individual, sessões 1 a 1 e exame CEFR no início e no fim do ciclo.",
    type: "website",
    locale: "pt_BR",
    siteName: "Falandou",
  },
  twitter: { card: "summary_large_image" },
};

// Site escuro por padrão (UX/UI §20): barra do navegador no celular na cor do fundo.
export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Movimento: o conteúdo só começa oculto se o JavaScript estiver ativo; se o
            observador não iniciar em 3s, tudo volta a aparecer (direção de movimento). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){var d=document.documentElement;if(!d.classList.contains('reveal-ready'))d.classList.remove('js')},3000);",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400;500;600;700;800&family=Wix+Madefor+Text:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteChrome />
        <AnalyticsProvider />
        <EntrySegment />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
