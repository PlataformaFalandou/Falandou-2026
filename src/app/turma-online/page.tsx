import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";
import InterestForm from "@/components/sections/InterestForm";

export const metadata: Metadata = {
  title: "Turma Online de Inglês Profissional | Falandou",
  description:
    "Simulações ao vivo de reuniões, entrevistas e apresentações em inglês. Grupos reduzidos com profissionais do mesmo nível — complemento ao plano individual.",
  alternates: {
    canonical: "https://2026.falandou.com/turma-online",
  },
  openGraph: {
    title: "Turma Online de Inglês Profissional | Falandou",
    description:
      "Simulações ao vivo de reuniões e entrevistas em inglês com profissionais do mesmo nível. Registre interesse e saiba quando a próxima turma abre.",
    url: "https://2026.falandou.com/turma-online",
  },
};

const WHATSAPP_MSG =
  "Olá! Tenho interesse na turma online de inglês profissional da Falandou e gostaria de saber quando a próxima turma abre.";

const benefits = [
  {
    icon: "🎭",
    title: "Simulação de situações reais",
    desc: "Reuniões com múltiplos participantes, entrevistas com banca, apresentações com perguntas ao vivo. Situações que não dá para treinar com um professor só — precisam de outras pessoas.",
  },
  {
    icon: "🗓️",
    title: "Ao vivo, com professor mediando",
    desc: "Sem gravações. O professor conduz a simulação, corrige em tempo real e garante que a conversa seja produtiva — não só social.",
  },
  {
    icon: "💼",
    title: "Profissionais do mesmo nível",
    desc: "A turma é formada por profissionais em nível similar. Você pratica com quem enfrenta os mesmos desafios — reuniões internacionais, processos seletivos, times globais.",
  },
  {
    icon: "📊",
    title: "Grupos reduzidos por design",
    desc: "O modelo individual Falandou permite acompanhar até 25 profissionais por professor — isso é o que garante que cada profissional é conhecido de perto. Para simulações em grupo, o limite é menor ainda: cada participante precisa de tempo de fala real, não de plateia.",
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
              Treine antes de estar{" "}
              <span style={{ color: "#FF6820" }}>na reunião de verdade.</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 2.5vw, 20px)",
                lineHeight: 1.6,
                color: "#c8c8c8",
                margin: "0 0 40px",
              }}
            >
              Simulações ao vivo de reuniões, entrevistas e apresentações em
              inglês — com profissionais do mesmo nível. Complemento ao plano
              individual Falandou. Registre interesse e seja avisado quando a
              próxima turma abrir.
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
            Por que simulações em grupo funcionam
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
            Todas as sessões Falandou são individuais — um professor, um profissional,
            atenção exclusiva. Mas há situações que só existem com outras
            pessoas: uma reunião com banca, uma entrevista com múltiplos
            avaliadores, uma apresentação com perguntas imprevisíveis. A turma
            online é o espaço para treinar exatamente isso — como complemento
            ao plano individual, não como substituto.
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
              "Profissionais Falandou que querem treinar situações com múltiplos participantes — reuniões com banca, entrevistas em painel, apresentações com Q&A",
              "Profissionais que já têm o plano individual e querem um ciclo de simulação antes de uma seletiva ou promoção",
              "Quem precisa de prática com pares do mesmo nível — não só com o professor — para ganhar naturalidade sob pressão real",
              "Executivos que vão liderar times internacionais e precisam simular esse ambiente antes de estar nele",
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
              A turma ainda não tem data confirmada. O modelo individual
              Falandou permite a cada professor acompanhar até 25 profissionais com
              atenção real — e as simulações em grupo têm limite ainda menor
              para garantir tempo de fala para cada participante. Registre
              interesse e entraremos em contato assim que a próxima turma abrir.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <InterestForm
                context="turma-online-footer"
                whatsappMessage={WHATSAPP_MSG}
                ctaLabel="Quero ser avisado quando abrir"
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
                Enquanto isso, ver o plano individual →
              </Link>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
