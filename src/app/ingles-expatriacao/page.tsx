import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import InterestForm from "@/components/sections/InterestForm";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Inglês para Expatriação e Transferência Internacional | Falandou",
  description:
    "Sua transferência está confirmada. O inglês do dia a dia no trabalho é diferente do inglês de escola. Prepare-se para o contexto real do exterior em 90 dias.",
  alternates: { canonical: "https://2026.falandou.com/ingles-expatriacao" },
  openGraph: {
    title: "Inglês para Expatriação | Falandou",
    description:
      "Transferência confirmada. Prepare seu inglês profissional para o ambiente real do exterior.",
    url: "https://2026.falandou.com/ingles-expatriacao",
  },
};

// Situações reais da expatriação
const situations = [
  {
    num: "01",
    label: "Primeiro dia no novo escritório",
    tension: "Se apresentar para colegas, entender o ritmo do time, participar das primeiras reuniões sem parecer perdido.",
    prep: "Treinamos a apresentação profissional, small talk no ambiente de trabalho e as primeiras semanas de onboarding em inglês.",
  },
  {
    num: "02",
    label: "Reuniões com times internacionais",
    tension: "Sotaques variados, ritmo acelerado, vocabulário técnico do setor — difícil acompanhar e mais difícil ainda contribuir.",
    prep: "Exposição a sotaques reais (americano, britânico, indiano), vocabulário do seu setor e técnicas para tomar a palavra sem travar.",
  },
  {
    num: "03",
    label: "E-mails e comunicação escrita",
    tension: "Tom formal vs. informal, subject lines eficazes, follow-ups, recusas educadas — cada empresa tem uma cultura de comunicação.",
    prep: "Você aprende os padrões de escrita do seu tipo de empresa — startup americana, multinacional europeia, big tech.",
  },
  {
    num: "04",
    label: "Vida fora do escritório",
    tension: "Escola dos filhos, contratos, médico, banco — inglês do cotidiano é diferente do inglês corporativo.",
    prep: "Preparamos o inglês funcional do dia a dia: negociar, perguntar, entender documentos e interagir com confiança fora do trabalho.",
  },
];

const proof = [
  { value: "90 dias", label: "para chegar capaz de liderar times e conduzir reuniões no novo país" },
  { value: "1 a 1", label: "todas as sessões individuais — o plano é montado para o seu destino e setor" },
  { value: "79%", label: "dos profissionais chegaram ao destino se comunicando com segurança no trabalho" },
];

const faqs = [
  {
    q: "Minha transferência é em 60 dias. Dá tempo de fazer diferença real?",
    a: "Sim — para isso existe o ciclo intensivo. Em 60 dias você não elimina todas as lacunas, mas chega ao destino com as situações críticas preparadas: apresentação, reuniões, comunicação escrita. A diferença entre chegar perdido e chegar funcional é enorme.",
  },
  {
    q: "Meu inglês é razoável mas não me sinto confortável em reunião com nativos.",
    a: "Esse é o gap mais comum em expatriados. Inglês passivo (entender filmes, ler) não prepara para conversação real sob pressão. Trabalhamos ativação de fala, sotaques variados e vocabulário do seu contexto específico.",
  },
  {
    q: "O plano é focado no meu setor ou é genérico?",
    a: "Específico para o seu setor e sua empresa. Engenheiro indo para uma big tech americana vai treinar vocabulário técnico, code review discussions e 1:1s com gestor americano. Gestor indo para empresa europeia vai treinar reuniões multilaterais e comunicação cross-cultural.",
  },
  {
    q: "Posso continuar as sessões depois que chegar no destino?",
    a: "Sim — todas as sessões são online. Você pode continuar o plano de qualquer país. Muitos profissionais fazem o primeiro ciclo antes da transferência e continuam o segundo ciclo já no destino.",
  },
];

export default function InglesExpatriacaoPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO: momento de vida ── */}
        <section
          className="pt-40 pb-28 md:pt-52 md:pb-36"
          style={{ backgroundColor: "#161616" }}
        >
          <div className="max-w-4xl mx-auto px-6">
            {/* Urgency badge */}
            <div
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: "rgba(255,104,32,0.15)", color: "#FF6820", border: "1px solid rgba(255,104,32,0.3)" }}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Transferência internacional confirmada
            </div>

            <h1
              className="font-display font-extrabold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              Transferência confirmada.<br />
              O inglês do trabalho lá fora{" "}
              <span style={{ color: "#FF6820" }}>é diferente do que você aprendeu.</span>
            </h1>
            <p
              className="font-body text-lg leading-relaxed mb-10 max-w-2xl"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Inglês de escola não prepara para reunião com time americano,
              e-mail para colega britânico ou onboarding em empresa global.
              A Falandou prepara você para o inglês real do seu novo ambiente —
              antes de você embarcar.
            </p>

            <p className="text-sm font-medium mb-10 -mt-6" style={{ color: "rgba(255,104,32,0.85)" }}>
              79% dos profissionais chegou ao destino se comunicando com segurança no trabalho em até 90 dias
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={getWhatsAppUrlForContext("ingles-expatriacao-urgente")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full text-base font-bold transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#FF6820", color: "white" }}
              >
                Quero me preparar para o exterior
              </a>
              <a
                href="#situacoes"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Ver o que preparamos
              </a>
            </div>
          </div>
        </section>

        {/* ── PROOF ── */}
        <section className="py-14" style={{ backgroundColor: "#FF6820" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {proof.map((p) => (
                <div key={p.value} className="text-center">
                  <p className="font-display font-extrabold text-4xl text-white mb-2">{p.value}</p>
                  <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SITUATIONS: cada desafio real da expatriação ── */}
        <section id="situacoes" className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
                O que realmente te espera
              </p>
              <h2
                className="font-display font-extrabold leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
              >
                Inglês de escola não prepara para isso.
              </h2>
              <p className="font-body text-base mt-4" style={{ color: "rgba(22,22,22,0.55)" }}>
                Cada situação abaixo é um inglês diferente. Preparamos você para cada uma delas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {situations.map((s) => (
                <div
                  key={s.num}
                  className="rounded-2xl p-8 bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="font-display font-black text-4xl flex-shrink-0"
                      style={{ color: "rgba(0,0,0,0.08)" }}
                    >
                      {s.num}
                    </span>
                    <div>
                      <h3 className="font-display font-extrabold text-lg mb-2" style={{ color: "#161616" }}>
                        {s.label}
                      </h3>
                      <p className="font-body text-sm mb-4 leading-relaxed" style={{ color: "rgba(22,22,22,0.5)" }}>
                        <span className="font-semibold" style={{ color: "#161616" }}>O desafio: </span>
                        {s.tension}
                      </p>
                      <div
                        className="rounded-xl p-4"
                        style={{ background: "rgba(255,104,32,0.07)" }}
                      >
                        <p className="font-body text-sm leading-relaxed" style={{ color: "#161616" }}>
                          <span className="font-semibold" style={{ color: "#FF6820" }}>Como preparamos: </span>
                          {s.prep}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTEREST FORM ── */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Próximo passo
            </p>
            <h2
              className="font-display font-extrabold leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#161616" }}
            >
              Quando você embarca?
            </h2>
            <p className="font-body text-base mb-10" style={{ color: "rgba(22,22,22,0.55)" }}>
              Conta pra gente. Montamos o plano no tempo que você tem — focado no seu destino e setor.
            </p>
            <InterestForm
              context="ingles-expatriacao"
              whatsappMessage="Olá! Estou sendo transferido internacionalmente e preciso de inglês profissional para o ambiente de trabalho no exterior. Quero entender como a Falandou me prepara."
              ctaLabel="Quero me preparar para o exterior"
            />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className="font-display font-extrabold text-center mb-12"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#161616" }}
            >
              Dúvidas sobre preparação para o exterior
            </h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl p-7 bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <p className="font-display font-bold text-base mb-3" style={{ color: "#161616" }}>{faq.q}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(22,22,22,0.6)" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-20 md:py-28" style={{ backgroundColor: "#161616" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2
              className="font-display font-extrabold text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
            >
              O embarque está marcado. A preparação começa agora.
            </h2>
            <p className="font-body text-base mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Consulta gratuita · Plano montado para o seu destino · Sessões 100% online
            </p>
            <a
              href={getWhatsAppUrlForContext("ingles-expatriacao-urgente")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-base font-bold transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#FF6820", color: "white" }}
            >
              Falar com a equipe agora
            </a>
            <p className="mt-6">
              <Link href="/metodo" className="font-body text-sm underline underline-offset-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                Entender o método completo →
              </Link>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
