import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import ForWhom from "@/components/sections/ForWhom";
import Journey from "@/components/sections/Journey";
import Testimonials from "@/components/sections/Testimonials";
import MidCTA from "@/components/sections/MidCTA";
import FAQ from "@/components/sections/FAQ";
import type { FAQEntry } from "@/data/faq";
import { PRICE_FROM, getPlan } from "@/data/plans";

const PRO = getPlan("professional");
import Footer from "@/components/ui/Footer";
import BlogPreview from "@/components/sections/BlogPreview";
import LeadMagnetCompact from "@/components/sections/LeadMagnetCompact";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";

import JsonLd from "@/components/ui/JsonLd";
import { courseSchema } from "@/lib/schema";
export const metadata: Metadata = {
  title: "Inglês Executivo para Profissionais | Falandou",
  description:
    "Inglês executivo para conduzir reuniões, apresentações e negociações com autoridade. Plano personalizado com professores especializados em 90 dias.",
  alternates: {
    canonical: "/ingles-executivo/",
  },
  openGraph: {
    title: "Inglês Executivo para Profissionais | Falandou",
    description:
      "Conduza reuniões e apresentações com autoridade. Plano individual de 90 dias focado no seu contexto profissional.",
    url: "/ingles-executivo/",
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
    a: `Os planos começam em ${PRICE_FROM}/mês. Para treinar reuniões e apresentações com frequência, o ${PRO.name} tem ${PRO.sessionsPerMonth} sessões por mês (${PRO.prices[50]} com sessões de 50 minutos). A equipe indica o plano a partir da sua agenda de reuniões.`,
  },
];

export default function InglesExecutivoPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        {/* Dados estruturados — Arquitetura §10 */}
        <JsonLd data={courseSchema({ name: "Inglês executivo para reuniões e apresentações", description: "Ciclo de 90 dias para conduzir reuniões, apresentações e negociações em inglês.", path: "/ingles-executivo/" })} />
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
          ctaLabel="Falar com a equipe agora"
        />
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
        <Testimonials persona="Reuniões e apresentações" />
        <Journey />
        <MidCTA />
        <FAQ title="Dúvidas de quem conduz reuniões em inglês." items={FAQS} moreLink={{ href: "/planos", label: "Ver planos e valores" }} />
        {/* Arquitetura §4/§10: âncora de autoridade + link para posts relevantes */}
        <BlogPreview slugs={["vocabulario-reunioes-negocios", "ingles-para-apresentacoes", "emails-profissionais-ingles"]} title="Para conduzir reuniões em inglês." />
        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
