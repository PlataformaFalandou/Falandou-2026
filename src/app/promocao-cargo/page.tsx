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

// FAQ específico da LP (Arquitetura §8). Só fatos já publicados no site.
const FAQS: FAQEntry[] = [
  {
    q: "O inglês está segurando a minha promoção. Por onde começo?",
    a: "Pelo diagnóstico. O exame CEFR mostra onde você está nas quatro habilidades, e o plano é montado em torno do que o próximo cargo exige: conduzir reuniões, apresentar resultados, negociar.",
  },
  {
    q: "Em quanto tempo eu vejo evolução?",
    a: "O ciclo tem 90 dias e termina com um novo exame no mesmo formato do inicial, para você ver a evolução em número. No último ciclo, 79% dos profissionais subiram pelo menos 1 nível CEFR.",
  },
  {
    q: "Vocês treinam situações de liderança?",
    a: "Sim. As sessões simulam o que um cargo de liderança pede em inglês: conduzir reuniões, apresentar para a diretoria, dar feedback e alinhar times globais — com o vocabulário do seu setor.",
  },
  {
    q: "Quanto custa?",
    a: `Os planos começam em ${PRICE_FROM}/mês. Para quem tem uma data definida (avaliação, entrevista interna), o plano ${PLANS[2].name} tem 5 sessões por semana. A conversa inicial é gratuita.`,
  },
];

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
        <ForWhom
          persona={{
            title: (
              <>
                Para quem precisa{" "}
                <em className="not-italic" style={{ color: "#FF6820" }}>demonstrar liderança em inglês</em>{" "}
                para ser promovido.
              </>
            ),
            intro: "Profissionais com experiência e entrega comprovadas, para quem o inglês virou o critério visível do próximo nível.",
          }}
        />
        <CompanyLogos />
        <Journey />
        <ResultsData />
        <Testimonials />
        <Teachers />
        <MidCTA />
        <FAQ title="Dúvidas de quem quer ser promovido." items={FAQS} />
        {/* Arquitetura §4/§10: âncora de autoridade + link para posts relevantes */}
        <BlogPreview slugs={["vocabulario-reunioes-negocios", "ingles-para-apresentacoes", "como-aprender-ingles-profissional"]} title="Para quem quer o próximo cargo." />
        <LeadMagnetCompact />
      </main>
      <Footer />
    </>
  );
}
