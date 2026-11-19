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
  title: "Inglês para Entrevista de Emprego | Falandou",
  description:
    "Prepare-se para entrevistas de emprego em inglês com plano personalizado, professores especializados e resultado em 90 dias. Já ajudamos mais de 600 profissionais.",
  alternates: {
    canonical: "https://2026.falandou.com/entrevista-emprego",
  },
  openGraph: {
    title: "Inglês para Entrevista de Emprego | Falandou",
    description:
      "Prepare sua entrevista em inglês com um plano individual de 90 dias. Fale com nossa equipe.",
    url: "https://2026.falandou.com/entrevista-emprego",
  },
};

export default function EntrevistaEmpregoPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        <Hero
          eyebrow="Inglês para entrevista de emprego"
          headline={
            <>
              Passe na entrevista.{" "}
              <span style={{ color: "#FF6820" }}>Em inglês.</span>
            </>
          }
          subheadline="Recrutadores de multinacionais avaliam fluência, pronúncia e segurança — não só vocabulário. Em 90 dias você desenvolve a confiança que faz diferença na hora certa."
          whatsappContext="entrevista"
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
