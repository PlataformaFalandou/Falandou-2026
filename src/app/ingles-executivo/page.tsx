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
    "Inglês executivo para conduzir reuniões, apresentações e negociações com autoridade. Plano personalizado com professores especializados em 90 dias.",
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
          eyebrow="Você entende a reunião. Mas raramente toma a palavra."
          headline={
            <>
              Conduza reuniões.{" "}
              <span style={{ color: "#FF6820" }}>Com autoridade.</span>
            </>
          }
          subheadline="Participar de reuniões internacionais sem contribuir é invisibilidade profissional. Em 90 dias você aprende a tomar a palavra, conduzir discussões e apresentar com clareza — no inglês do seu contexto executivo."
          statChip="79% dos profissionais passou a conduzir reuniões e entrevistas em inglês em até 90 dias"
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
