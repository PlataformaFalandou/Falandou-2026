"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";
import { STATS } from "@/data/stats";
import { MIN_REPORTED_RAISE, PRICE_FROM, PRICE_TO_VALUE } from "@/data/plans";

export default function MidCTA() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden" style={{ backgroundColor: "#FF6820" }}>
      {/* Background image with strong overlay */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/images/conexao-internacional.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-6 text-white/70">
          Ciclo {STATS.cycleLabel} · {STATS.evaluated} profissionais avaliados
        </p>
        {/* Copywriting §2: o H2 carrega o dado mais forte do site, não uma promessa vaga. */}
        <h2
          className="reveal font-display font-extrabold text-white leading-tight mb-6 delay-100"
          style={{ fontSize: "var(--text-h2)" }}
        >
          {STATS.cefrUpPct} sobe 1 nível CEFR em {STATS.cycleDays} dias. O próximo pode ser você.
        </h2>
        {/* Seção de ação: convite concreto e o botão. Prova detalhada fica em ProofStats e /resultados. */}
        <p className="reveal font-body text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto delay-200">
          Conte o seu objetivo e o seu prazo. A equipe explica como o ciclo fica no seu caso e indica o plano — você decide depois de entender o que está contratando.
        </p>

        <div className="reveal flex flex-col sm:flex-row gap-4 justify-center items-center delay-300">
          <a
            href={getWhatsAppUrlForContext("cta")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("midcta")}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
            style={{ backgroundColor: "var(--color-bg)", color: "white", boxShadow: "0 8px 32px rgba(22,22,22,0.4)" }}
          >
            <MessageCircle size={20} />
            Falar com a equipe agora
          </a>
        </div>

        {/* Arquitetura §5: CTA final com o número de profissionais formados */}
        <p className="reveal font-body text-sm mt-6 delay-300" style={{ color: "rgba(255,255,255,0.75)" }}>
          {STATS.formed} profissionais formados em {STATS.yearsOperating} anos
        </p>
        {/* Posicionamento e Oferta §3: preço só depois de problema, solução, prova e retorno */}
        <p className="reveal font-body text-sm mt-2 delay-300" style={{ color: "rgba(255,255,255,0.75)" }}>
          Planos a partir de {PRICE_FROM}/mês.{MIN_REPORTED_RAISE > PRICE_TO_VALUE && " O menor aumento relatado pelos alunos (R$ 1.500/mês) já é maior que a mensalidade de qualquer plano."}
        </p>

        {/* Trust chips — só fatos verificáveis (a escola não oferece consulta gratuita) */}
        <div className="reveal flex flex-wrap gap-4 justify-center mt-10 delay-400">
          {["Resposta em até 1h", "Cancele quando quiser", "Exame CEFR no início e no fim"].map((item) => (
            <div
              key={item}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white border border-white/30 backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
