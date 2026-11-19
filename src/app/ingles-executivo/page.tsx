import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ForWhom from "@/components/sections/ForWhom";
import CompanyLogos from "@/components/sections/CompanyLogos";
import Journey from "@/components/sections/Journey";
import ResultsData from "@/components/sections/ResultsData";
import Testimonials from "@/components/sections/Testimonials";
import Teachers from "@/components/sections/Teachers";
import MidCTA from "@/components/sections/MidCTA";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";

export const metadata: Metadata = {
  title: "Inglês Executivo para Profissionais | Falandou",
  description:
    "Inglês executivo para reuniões, apresentações e negociações. Plano personalizado com professores especializados. Resultado medido por exame CEFR em 90 dias.",
  alternates: {
    canonical: "https://2026.falandou.com/ingles-executivo",
  },
  openGraph: {
    title: "Inglês Executivo para Profissionais | Falandou",
    description:
      "Conduza reuniões e apresentações com autoridade. Plano individual de 90 dias focado no seu contexto profissional.",
    url: "https://2026.falandou.com/ingles-executivo",
  },
};

export default function InglesExecutivoPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        <Hero
          eyebrow="Inglês executivo para reuniões e apresentações"
          headline={
            <>
              Conduza reuniões.{" "}
              <span style={{ color: "#FF6820" }}>Com autoridade.</span>
            </>
          }
          subheadline="Reuniões internacionais, apresentações para a diretoria, negociações com parceiros — cada contexto exige vocabulário, ritmo e postura diferentes. Desenvolvemos isso no seu plano de 90 dias."
          whatsappContext="executivo"
        />
        <StatsBar />
        <ForWhom />
        <CompanyLogos />
        <Journey />
        <ResultsData />
        <Testimonials />
        <Teachers />
        <MidCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
