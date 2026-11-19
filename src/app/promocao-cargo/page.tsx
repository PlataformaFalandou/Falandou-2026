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
  title: "Inglês para Promoção de Cargo | Falandou",
  description:
    "O inglês é o critério que define quem avança para cargos sênior e de liderança. Plano individualizado de 90 dias para profissionais que buscam crescimento na carreira.",
  alternates: {
    canonical: "https://2026.falandou.com/promocao-cargo",
  },
  openGraph: {
    title: "Inglês para Promoção de Cargo | Falandou",
    description:
      "Desbloqueie o próximo nível da sua carreira com inglês profissional. Plano de 90 dias e exame CEFR.",
    url: "https://2026.falandou.com/promocao-cargo",
  },
};

export default function PromocaoCargoPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        <Hero
          eyebrow="Inglês para crescimento e promoção na carreira"
          headline={
            <>
              O inglês que faltava{" "}
              <span style={{ color: "#FF6820" }}>para o próximo nível.</span>
            </>
          }
          subheadline="Cargos sênior e de liderança em empresas globais exigem inglês fluente — não suficiente, fluente. Em 90 dias você desenvolve o nível que a sua empresa exige para promover."
          whatsappContext="promocao"
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
