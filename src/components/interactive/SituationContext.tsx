"use client";

/**
 * A situação escolhida pelo visitante acompanha a jornada (revisão de jornada §2):
 * home (abertura e microaula) → /metodo → /planos → WhatsApp, sem refazer a escolha.
 *
 * - `metodo`: mostra como uma sessão trabalha a situação escolhida (ou Reuniões, se ainda
 *   não houve escolha), com a opção de trocar ali mesmo.
 * - `planos`: só aparece se o visitante escolheu uma situação nesta visita. Explica como ela
 *   entra no plano — sem indicar plano por conta própria nem prometer resultado.
 *
 * A escolha fica só nesta aba (sessionStorage) e não vai para a medição.
 */
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getSituation } from "@/data/situations";
import { setSituation, useChosenSituation, useSituation } from "@/lib/situationStore";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";
import SituationTabs from "@/components/interactive/SituationTabs";

/** Explica o que acontece ao tocar no botão do WhatsApp (revisão de jornada §3, §10). */
export function WhatsAppNote({ message }: { message: string }) {
  return (
    <p className="text-sm mt-3 max-w-xl" style={{ color: "var(--color-text-muted)" }}>
      Abre o WhatsApp da equipe com esta mensagem pronta: <span style={{ color: "var(--color-text-body)" }}>“{message}”</span>{" "}
      Você confere, edita se quiser e decide se envia. A equipe responde em até 1h.
    </p>
  );
}

export function SituationInSession() {
  const s = getSituation(useSituation());
  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
      <p className="eyebrow text-xs font-bold uppercase tracking-widest mb-4">Na prática, com a sua situação</p>
      <div className="max-w-xl mb-5">
        <SituationTabs size="sm" />
      </div>
      <p className="font-display font-bold text-white text-lg leading-snug">{s.prompt}</p>
      <ol className="mt-4 grid gap-3 text-base leading-6" style={{ color: "var(--color-text-body)" }}>
        <li>
          <strong className="text-white">Ideia e primeira versão.</strong>{" "}
          <span lang="en" className="italic">“{s.draft}”</span>
        </li>
        <li>
          <strong className="text-white">Frase revisada com o professor.</strong>{" "}
          <span lang="en" className="text-white">“{s.revised}”</span>
        </li>
        <li>
          <strong className="text-white">Por quê.</strong> {s.note}
        </li>
        <li>
          <strong className="text-white">Fala e feedback.</strong> Você diz a frase em voz alta, o professor ajusta ritmo e
          entonação, e a mesma estrutura volta em outra situação na sessão seguinte.
        </li>
      </ol>
      <Link
        href="/planos#sua-situacao"
        onClick={() => setSituation(s.id)}
        className="cta-secondary rounded-full mt-6"
      >
        Ver como {s.label.toLowerCase()} entra no plano
        <ArrowRight aria-hidden="true" />
      </Link>
      <p className="text-xs mt-3" style={{ color: "var(--color-text-muted)" }}>
        Exemplo didático criado pela escola.
      </p>
    </div>
  );
}

export function SituationInPlan() {
  const chosen = useChosenSituation();
  if (!chosen) return null;
  const s = getSituation(chosen);
  const label = s.label.toLowerCase();
  return (
    <section
      id="sua-situacao"
      aria-labelledby="sua-situacao-titulo"
      className="mb-8 rounded-2xl p-6 md:p-8"
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid #FF6820" }}
    >
      <p className="eyebrow text-xs font-bold uppercase tracking-widest mb-3">A situação que você escolheu</p>
      <h2 id="sua-situacao-titulo" className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: "var(--text-h3)" }}>
        Como {label} entra no seu plano
      </h2>
      <ol className="grid md:grid-cols-3 gap-4 text-base leading-6" style={{ color: "var(--color-text-body)" }}>
        <li>
          <strong className="block text-white mb-1">1. Diagnóstico</strong>
          O exame CEFR mostra de onde você parte. Você conta à equipe que precisa de inglês para {label}.
        </li>
        <li>
          <strong className="block text-white mb-1">2. Plano individual</strong>
          O professor inclui {label} entre as situações das suas semanas, com o vocabulário da sua área.
        </li>
        <li>
          <strong className="block text-white mb-1">3. Sessões</strong>
          Você simula situações como esta e revisa a frase com o professor até sair natural. Exemplo: {s.prompt}
        </li>
      </ol>
      <p className="text-base mt-5 max-w-2xl" style={{ color: "var(--color-text-body)" }}>
        Todos os planos trabalham a situação que você escolher. O que muda entre eles é o ritmo: quantas sessões por mês e
        de quanto tempo.
        {s.id === "entrevistas" && " Se a entrevista já tem data marcada, o plano Urgente concentra mais sessões no mesmo período."}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-6">
        <a
          href={getWhatsAppUrl(s.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTAClick(`planos-situacao-${s.id}`)}
          className="cta-primary rounded-full"
        >
          <MessageCircle aria-hidden="true" />
          Falar sobre {label}
        </a>
        <a href="#comparar-planos" className="cta-secondary rounded-full">
          Comparar os planos
        </a>
      </div>
      <WhatsAppNote message={s.whatsapp} />
      <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--color-border)" }}>
        <p className="text-sm mb-3" style={{ color: "var(--color-text-muted)" }}>
          Quer ver outra situação?
        </p>
        <div className="max-w-xl">
          <SituationTabs size="sm" />
        </div>
      </div>
    </section>
  );
}
