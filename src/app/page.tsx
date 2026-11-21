import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import HeroAB from "@/components/sections/HeroAB";
import StatsBar from "@/components/sections/StatsBar";
import ForWhom from "@/components/sections/ForWhom";
import Journey from "@/components/sections/Journey";
import MetodoTeaser from "@/components/sections/MetodoTeaser";
import Benefits from "@/components/sections/Benefits";
import ProofStats from "@/components/sections/ProofStats";
import Testimonials from "@/components/sections/Testimonials";
import SessionFlow from "@/components/sections/SessionFlow";
import YouTubeVideos from "@/components/sections/YouTubeVideos";
import MidCTA from "@/components/sections/MidCTA";
import FAQ from "@/components/sections/FAQ";
import { DEFAULT_FAQS } from "@/data/faq";
import LeadMagnet from "@/components/sections/LeadMagnet";
import BlogPreview from "@/components/sections/BlogPreview";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import ScrollTracker from "@/components/ui/ScrollTracker";

import JsonLd from "@/components/ui/JsonLd";
import { organizationSchema } from "@/lib/schema";
export const metadata: Metadata = {
  title: "Inglês para Profissionais com Sessões 1 a 1 | Falandou",
  description:
    "Inglês para profissionais com sessões 1 a 1, plano individual e exame CEFR no início e no fim do ciclo de 90 dias. Mais de 600 profissionais formados.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Inglês para Profissionais com Sessões 1 a 1 | Falandou",
    description:
    "Inglês para profissionais com sessões 1 a 1, plano individual e exame CEFR no início e no fim do ciclo de 90 dias. Mais de 600 profissionais formados.",
    type: "website",
    locale: "pt_BR",
    siteName: "Falandou",
    url: "/",
  },
};

// Estrutura da home — Arquitetura da Informação §5, versão híbrida com a planilha:
// cada seção resolve a dúvida que a anterior gerou. A home "fecha curiosidade, não
// detalhe": preço detalhado, comparação e currículo de professor ficam em
// /planos e /professores.
export default function HomePage() {
  return (
    <>
      <ScrollRevealInit />
      <ScrollTracker />
      <Navbar />
      <main id="conteudo">
        {/* Dados estruturados — Arquitetura §10 */}
        <JsonLd data={organizationSchema()} />
        {/* 1. Promessa + prova (600+, logos) + ação */}
        <HeroAB />
        {/* 2. Faixa de números do último ciclo, logo abaixo da Hero (UX/UI §7) */}
        <StatsBar />
        {/* 3. Identificação (planilha, ponto 38) */}
        <ForWhom />
        {/* 4. Como funciona — 5 etapas + link para o método completo */}
        <Journey />
        {/* 4b. Benefícios consolidados: carreira · dia a dia · bolso (Copywriting §5) */}
        <Benefits />
        {/* 5. Por que o inglês não avançou — gancho da comparação (atos 1+2; o 3 fica em /metodo) */}
        <MetodoTeaser />
        {/* 6. Prova quantitativa antes dos depoimentos */}
        <ProofStats />
        {/* 6b. Como funciona uma sessão — concretiza a experiência antes dos depoimentos (revisão editorial §27) */}
        <SessionFlow />
        {/* 7. Depoimentos — 3 cartões + "ver todos" */}
        <Testimonials />
        {/* 8. Como a escola ensina, em vídeo */}
        <YouTubeVideos />
        {/* 9. Autoridade + links internos */}
        <BlogPreview />
        {/* 10. FAQ: as 6 objeções na ordem da jornada (Copywriting §8); /metodo complementa */}
        <FAQ items={DEFAULT_FAQS} moreLink={{ href: "/metodo", label: "Como o ciclo funciona no dia a dia" }} />
        {/* 11. Alternativa para quem ainda não está pronto — antes do fechamento comercial,
            para não haver duas conclusões concorrentes (revisão visual §5.3) */}
        <LeadMagnet />
        {/* 12. Fechamento: uma ação principal */}
        <MidCTA />
      </main>
      <Footer cta={false} />
    </>
  );
}
