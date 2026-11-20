import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import InterestForm from "@/components/sections/InterestForm";

export const metadata: Metadata = {
  title: "Inglês Intensivo para Profissionais | Falandou",
  description:
    "Programa intensivo de inglês para profissionais com prazo definido: entrevista, transferência internacional ou promoção em 60 dias.",
  // "Em breve": fora do Google até o lançamento (Arquitetura §12, princípio 6).
  // No lançamento: remover esta linha e voltar a página para src/app/sitemap.ts.
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://2026.falandou.com/intensivo",
  },
  openGraph: {
    title: "Inglês Intensivo para Profissionais | Falandou",
    description:
      "60 dias de imersão focada. Para quem tem prazo e não pode esperar. Registre interesse agora.",
    url: "https://2026.falandou.com/intensivo",
  },
};

const WHATSAPP_MSG =
  "Olá! Tenho interesse no programa intensivo da Falandou e gostaria de entender como funciona e quando começa a próxima turma.";

const timeline = [
  {
    week: "Semanas 1–2",
    focus: "Diagnóstico e base",
    desc: "Avaliação de nível, identificação das lacunas críticas e construção do vocabulário do seu setor.",
  },
  {
    week: "Semanas 3–5",
    focus: "Comunicação essencial",
    desc: "Reuniões, e-mails e apresentações. Os contextos mais frequentes no ambiente de trabalho.",
  },
  {
    week: "Semanas 6–8",
    focus: "Fluência sob pressão",
    desc: "Negociação, tomada de decisão e improviso. Inglês que funciona quando o stress é alto.",
  },
];

export default function IntensivoPage() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main style={{ background: "#F5F6F1", minHeight: "100vh" }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          style={{
            background: "#161616",
            color: "#F5F6F1",
            padding: "80px 24px 72px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <span
              style={{
                display: "inline-block",
                background: "#FF6820",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 12px",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            >
              Em breve
            </span>
            <h1
              style={{
                fontSize: "clamp(32px, 6vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                margin: "0 0 20px",
              }}
            >
              De travar a falar com segurança.{" "}
              <span style={{ color: "#FF6820" }}>Em 60 dias.</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 2.5vw, 20px)",
                lineHeight: 1.6,
                color: "#c8c8c8",
                margin: "0 0 40px",
              }}
            >
              Para quem tem um prazo concreto — uma entrevista, uma promoção,
              uma transferência internacional — e não pode esperar meses para
              ver progresso. Registre interesse e saiba quando o próximo
              intensivo começa.
            </p>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "rgba(255,104,32,0.85)",
                margin: "-24px 0 32px",
              }}
            >
              79% dos profissionais passou a conduzir reuniões e entrevistas em inglês em até 90 dias
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <InterestForm
                context="intensivo"
                whatsappMessage={WHATSAPP_MSG}
                ctaLabel="Quero saber quando começa"
              />
            </div>
          </div>
        </section>

        {/* ── Para quem é ─────────────────────────────────────────────── */}
        <section style={{ padding: "72px 24px", maxWidth: "760px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#161616",
              marginBottom: "32px",
            }}
          >
            Para quem é o intensivo
          </h2>
          {[
            {
              title: "Você tem uma entrevista em até 2 meses",
              desc: "Recrutadores eliminam candidatos por clareza e ritmo — não só por gramática. Um ciclo focado de 60 dias aumenta a probabilidade de passar para a próxima fase.",
            },
            {
              title: "Você foi promovido e o inglês é requisito agora",
              desc: "A promoção chegou antes do idioma. Precisa se comunicar com confiança desde o primeiro dia no novo cargo.",
            },
            {
              title: "Você vai para o exterior em um projeto",
              desc: "Transferência, intercâmbio corporativo ou projeto internacional. Precisa estar funcionando bem, rápido.",
            },
            {
              title: "Você tem inglês intermediário e quer dar o salto final",
              desc: "Lê bem, escreve razoavelmente, mas trava na hora de falar. O intensivo quebra esse padrão.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e8e8e8",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#161616", margin: "0 0 8px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#555", margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* ── Como funciona (timeline) ─────────────────────────────────── */}
        <section
          style={{
            background: "#fff",
            padding: "72px 24px",
            borderTop: "1px solid #e8e8e8",
            borderBottom: "1px solid #e8e8e8",
          }}
        >
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#161616",
                marginBottom: "40px",
              }}
            >
              Como são as 8 semanas
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {timeline.map((step, i) => (
                <div
                  key={step.week}
                  style={{
                    display: "flex",
                    gap: "24px",
                    alignItems: "flex-start",
                    paddingBottom: i < timeline.length - 1 ? "32px" : "0",
                    borderLeft: i < timeline.length - 1 ? "2px solid #FF6820" : "2px solid transparent",
                    marginLeft: "16px",
                    paddingLeft: "24px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-9px",
                      top: "4px",
                      width: "16px",
                      height: "16px",
                      background: "#FF6820",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#FF6820",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {step.week}
                    </span>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#161616", margin: "0 0 6px" }}>
                      {step.focus}
                    </h3>
                    <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#555", margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Diferencial ─────────────────────────────────────────────── */}
        <section style={{ padding: "72px 24px", maxWidth: "760px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#161616",
              marginBottom: "16px",
            }}
          >
            O que é diferente em um intensivo
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#444", marginBottom: "24px" }}>
            No plano padrão, o ritmo é o do profissional. No intensivo, o ritmo é o
            do prazo. Mais horas semanais, exercícios diários entre as sessões,
            simulações de situações reais e feedback contínuo do professor.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#444" }}>
            Não é para todo mundo. É para quem tem um objetivo concreto com
            data definida e está disposto a investir energia para chegar lá.
          </p>
        </section>

        {/* ── CTA final ───────────────────────────────────────────────── */}
        <section
          style={{
            padding: "72px 24px",
            textAlign: "center",
            background: "#161616",
          }}
        >
          <div style={{ maxWidth: "520px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#F5F6F1",
                marginBottom: "16px",
              }}
            >
              Qual é o seu prazo?
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#c8c8c8",
                marginBottom: "36px",
              }}
            >
              Se você tem uma data concreta, deixe seu nome. Quando o
              próximo intensivo abrir, você será o primeiro a saber —
              e podemos verificar se o formato é adequado para o seu objetivo.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <InterestForm
                context="intensivo-footer"
                whatsappMessage={WHATSAPP_MSG}
                ctaLabel="Quero saber quando começa"
              />
            </div>
            <p style={{ marginTop: "24px" }}>
              <Link
                href="/planos"
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Enquanto isso, ver o plano padrão →
              </Link>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
