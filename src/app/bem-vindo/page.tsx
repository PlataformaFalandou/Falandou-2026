import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getWhatsAppUrl } from "@/lib/whatsapp";

// UX/UI §22 — página de confirmação depois da matrícula. A equipe envia este link na
// mensagem de boas-vindas (modelo em docs/onboarding-aluno.md). Fora do Google e do sitemap.
export const metadata: Metadata = {
  title: "Bem-vindo à Falandou",
  robots: { index: false, follow: false },
  alternates: { canonical: "/bem-vindo/" },
};

const PLATFORM_URL = "https://falandou-hub-learn.lovable.app";

const STEPS = [
  {
    title: "Diagnóstico CEFR",
    body: "A equipe combina com você o horário do exame diagnóstico: reading, listening, speaking e writing. É ele que define o ponto de partida.",
  },
  {
    title: "Plano individual",
    body: "Com o resultado em mãos, o seu plano de 90 dias é montado para o seu objetivo, o seu cargo e o seu setor.",
  },
  {
    title: "Primeira sessão 1 a 1",
    body: "O seu professor entra em contato pelo WhatsApp para marcar a primeira sessão. Reagendamentos são sem custo com 24h de antecedência.",
  },
];

export default function BemVindoPage() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 min-h-[80vh]" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <svg width="88" height="88" viewBox="0 0 64 64" className="mx-auto mb-8" aria-hidden="true">
              <circle cx="32" cy="32" r="30" fill="rgba(45,122,79,0.18)" stroke="#5CC28A" strokeWidth="2" />
              <path d="M20 33 l8 8 l16 -18" fill="none" stroke="#5CC28A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="check-draw" />
            </svg>
            <h1 className="font-display font-extrabold text-white leading-tight mb-5" style={{ fontSize: "var(--text-h1)" }}>
              Matrícula confirmada.{" "}
              <span style={{ color: "#FF6820" }}>Bem-vindo à Falandou.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-14" style={{ color: "var(--color-text-body)" }}>
              O seu ciclo de 90 dias começa agora. Estes são os próximos passos:
            </p>

            <ol className="grid gap-4 text-left mb-14">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="rounded-2xl p-6 flex gap-5"
                  style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <span
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-display font-extrabold text-white"
                    style={{ backgroundColor: "#FF6820" }}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-display font-bold text-lg text-white mb-1">{s.title}</span>
                    <span className="block text-base" style={{ color: "var(--color-text-body)" }}>{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex items-center justify-center min-w-[220px] px-8 py-4 rounded-full text-base font-bold"
              >
                Acessar a plataforma do aluno
              </a>
              <a
                href={getWhatsAppUrl("Olá! Acabei de me matricular na Falandou e tenho uma dúvida sobre os próximos passos.")}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary inline-flex items-center justify-center min-w-[220px] px-8 py-4 rounded-full text-base font-semibold"
              >
                Falar com a equipe
              </a>
            </div>
            <p className="mt-8 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Enquanto isso, veja{" "}
              <Link href="/vocabulario" className="cta-tertiary text-white font-semibold">
                o vocabulário profissional da sua área
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
