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
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
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
      "Desbloqueie o próximo nível da sua carreira com inglês profissional. Plano de 90 dias para liderar times, conduzir reuniões e passar em seletivas internacionais.",
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
          eyebrow="O inglês está te impedindo de crescer — e você sabe disso."
          headline={
            <>
              Conduza reuniões em inglês.{" "}
              <span style={{ color: "#FF6820" }}>Consiga a promoção.</span>
            </>
          }
          subheadline="Você tem a experiência e a entrega — mas o inglês continua como critério visível para o próximo nível. Em um ciclo de 90 dias, 79% dos nossos profissionais passou a conduzir reuniões e entrevistas em inglês. Para muitos, isso é exatamente a diferença entre candidato e aprovado."
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
        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
