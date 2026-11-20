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
import FAQ, { type FAQEntry } from "@/components/sections/FAQ";
import { PLANS, PRICE_FROM } from "@/data/plans";
import Footer from "@/components/ui/Footer";
import BlogPreview from "@/components/sections/BlogPreview";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
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

// FAQ específico da LP (Arquitetura §8). Só fatos já publicados no site.
const FAQS: FAQEntry[] = [
  {
    q: "Consigo conduzir reuniões em inglês em 90 dias?",
    a: "Depende do ponto de partida. No último ciclo, quem começou em B1 chegou a B2 em 11 semanas, em média — o nível em que se participa de reuniões e se defende um ponto de vista. O plano treina as suas reuniões reais: abrir, conduzir, pedir esclarecimentos e encerrar.",
  },
  {
    q: "As sessões usam situações do meu trabalho?",
    a: "Sim. O vocabulário é do seu setor e as simulações reproduzem as suas reuniões e apresentações. Você leva pautas e materiais reais para as sessões.",
  },
  {
    q: "Minha agenda é imprevisível. Como encaixo?",
    a: "As sessões são agendadas com o professor e podem ser reagendadas pelo WhatsApp, sem custo extra. Entre uma sessão e outra, a prática leva de 20 a 30 minutos por dia.",
  },
  {
    q: "Quanto custa?",
    a: `Os planos começam em ${PRICE_FROM}/mês. As simulações de reunião e apresentação entram a partir do plano ${PLANS[1].name} (${PLANS[1].price}/mês). A conversa inicial é gratuita.`,
  },
];

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
        <ForWhom
          persona={{
            title: (
              <>
                Para profissionais que precisam{" "}
                <em className="not-italic" style={{ color: "#FF6820" }}>liderar reuniões em inglês.</em>
              </>
            ),
            intro: "Gestores, coordenadores e especialistas que já entendem a reunião, mas ainda não tomam a palavra.",
          }}
        />
        <CompanyLogos />
        <Journey />
        <ResultsData />
        <Testimonials />
        <Teachers />
        <MidCTA />
        <FAQ title="Dúvidas de quem conduz reuniões em inglês." items={FAQS} />
        {/* Arquitetura §4/§10: âncora de autoridade + link para posts relevantes */}
        <BlogPreview slugs={["vocabulario-reunioes-negocios", "ingles-para-apresentacoes", "emails-profissionais-ingles"]} title="Para conduzir reuniões em inglês." />
        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
