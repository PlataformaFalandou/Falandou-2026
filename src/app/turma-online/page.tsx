import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import InterestForm from "@/components/sections/InterestForm";

export const metadata: Metadata = {
  title: "Turma Online de Inglês Profissional | Falandou",
  description:
    "Participe de uma turma online ao vivo com profissionais do mesmo nível. Aulas em grupo focadas em inglês executivo, reuniões e comunicação profissional.",
  alternates: {
    canonical: "https://2026.falandou.com/turma-online",
  },
  openGraph: {
    title: "Turma Online de Inglês Profissional | Falandou",
    description:
      "Aulas ao vivo em grupo com foco em inglês executivo. Registre interesse e saiba quando a próxima turma abre.",
    url: "https://2026.falandou.com/turma-online",
  },
};

const WHATSAPP_MSG =
  "Olá! Tenho interesse na turma online de inglês profissional da Falandou e gostaria de saber quando a próxima turma abre.";

const benefits = [
  {
    icon: "👥",
    title: "Aprendizado em grupo",
    desc: "Pratique com profissionais do mesmo nível. A pressão positiva de grupo aumenta a frequência de uso — e uso frequente produz progresso mensurável.",
  },
  {
    icon: "🗓️",
    title: "Aulas ao vivo, com professor",
    desc: "Sem gravações. Cada aula é conduzida por um professor Falandou em tempo real.",
  },
  {
    icon: "💼",
    title: "Foco em contexto profissional",
    desc: "Reuniões, apresentações, negociações e e-mails — inglês para usar no trabalho, não em viagem.",
  },
  {
    icon: "📊",
    title: "Máximo 8 alunos por turma",
    desc: "O limite existe por uma razão pedagógica: acima de 8, o professor perde a capacidade de corrigir pronúncia e fluência em tempo real para cada participante. Com 8, todo aluno fala pelo menos duas vezes por aula — abaixo disso, o grupo vira plateia.",
  },
];

export default function TurmaOnlinePage() {
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
              Turma online de{" "}
              <span style={{ color: "#FF6820" }}>inglês profissional</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 2.5vw, 20px)",
                lineHeight: 1.6,
                color: "#c8c8c8",
                margin: "0 0 40px",
              }}
            >
              Aprenda em grupo com profissionais do mesmo nível. Aulas ao vivo,
              professor especializado, foco total em inglês executivo.
              Registre interesse agora e seja avisado quando a turma abrir.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <InterestForm
                context="turma-online"
                whatsappMessage={WHATSAPP_MSG}
                ctaLabel="Quero ser avisado quando abrir"
              />
            </div>
          </div>
        </section>

        {/* ── O que é a turma online ───────────────────────────────────── */}
        <section style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#161616",
              marginBottom: "16px",
            }}
          >
            Por que aprender em grupo funciona
          </h2>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#444",
              maxWidth: "620px",
              marginBottom: "48px",
            }}
          >
            O modelo individual é mais personalizado — mas o grupo cria algo
            diferente: você pratica com pares reais, ouve outros profissionais
            cometendo os mesmos erros, e desenvolve a naturalidade que só o
            uso contínuo com outras pessoas proporciona.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {benefits.map((b) => (
              <div
                key={b.title}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "28px 24px",
                  border: "1px solid #e8e8e8",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{b.icon}</div>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#161616",
                    margin: "0 0 8px",
                  }}
                >
                  {b.title}
                </h3>
                <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#555", margin: 0 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quem é para você ────────────────────────────────────────── */}
        <section
          style={{
            background: "#fff",
            padding: "72px 24px",
            borderTop: "1px solid #e8e8e8",
            borderBottom: "1px solid #e8e8e8",
          }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#161616",
                marginBottom: "32px",
              }}
            >
              Para quem é essa turma
            </h2>
            {[
              "Profissionais com inglês intermediário que precisam de mais prática oral",
              "Quem trabalha ou vai trabalhar com equipes internacionais",
              "Pessoas que precisam de disciplina de grupo para manter o ritmo",
              "Quem quer melhorar sem abrir mão de aprender com outras perspectivas profissionais",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <span style={{ color: "#FF6820", fontWeight: 700, fontSize: "18px", lineHeight: 1.5 }}>
                  ✓
                </span>
                <p style={{ fontSize: "16px", lineHeight: 1.6, color: "#333", margin: 0 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA final ───────────────────────────────────────────────── */}
        <section
          style={{
            padding: "72px 24px",
            textAlign: "center",
            background: "#F5F6F1",
          }}
        >
          <div style={{ maxWidth: "520px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#161616",
                marginBottom: "16px",
              }}
            >
              Registre interesse agora
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#555",
                marginBottom: "36px",
              }}
            >
              A turma ainda não tem data confirmada. Com no máximo 8 alunos
              por turma — limite pedagógico, não comercial — cada abertura
              preenche rápido. Quanto mais interesse registrarmos, mais rápido
              ela abre. Deixe seu nome e entraremos em contato assim que as
              vagas estiverem disponíveis.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <InterestForm
                context="turma-online-footer"
                whatsappMessage={WHATSAPP_MSG}
                ctaLabel="Quero ser avisado quando abrir"
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
