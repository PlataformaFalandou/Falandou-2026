"use client";

/**
 * ReferralActions — ponto 48 (programa de indicação).
 * - Para o aluno: copiar o link de /indique ou enviar pelo WhatsApp a um colega.
 * - Para o indicado: informar quem indicou; o nome vai na mensagem para a equipe
 *   saber a quem liberar as sessões bônus.
 */

import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { absoluteUrl } from "@/lib/site";
import { trackCTAClick, trackReferralShare } from "@/lib/analytics";

const PAGE_URL = absoluteUrl("/indique/");

const SHARE_TEXT =
  `Estou fazendo inglês profissional na Falandou: plano individual, sessões 1 a 1 e exame CEFR antes e depois. ` +
  `Se você fechar um plano dizendo que foi indicado por mim, nós dois ganhamos 4 sessões bônus. ${PAGE_URL}`;

export function ShareReferral() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copie a mensagem:", SHARE_TEXT);
    }
    trackReferralShare("copiar");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        // wa.me sem número: o próprio aluno escolhe o contato do colega.
        // data-share: não é contato com a escola — EntrySegment e WhatsAppClick ignoram.
        data-share=""
        href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackReferralShare("whatsapp")}
        className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-body font-bold text-base text-white cta-primary">
        Enviar para um colega no WhatsApp
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-body font-semibold text-base transition-all duration-[var(--dur-base)]"
        style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
      >
        {copied ? "Mensagem copiada ✓" : "Copiar mensagem com o link"}
      </button>
    </div>
  );
}

export function ReferredForm() {
  const [referrer, setReferrer] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const who = referrer.trim();
    const msg = who
      ? `Olá! Fui indicado(a) por ${who}, que é aluno(a) da Falandou, e quero conhecer os planos de inglês profissional.`
      : "Olá! Fui indicado(a) por um aluno(a) da Falandou e quero conhecer os planos de inglês profissional.";
    trackCTAClick("indique-indicado");
    window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
      <label className="sr-only" htmlFor="referrer">Nome de quem indicou você</label>
      <input
        id="referrer"
        type="text"
        value={referrer}
        onChange={(e) => setReferrer(e.target.value)}
        placeholder="Nome de quem indicou você"
        className="flex-1 px-5 py-4 rounded-full font-body text-base bg-surface border border-white/15 outline-none focus:border-[#FF6820]"
        style={{ color: "var(--color-text)" }}
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center px-7 py-4 rounded-full font-body font-bold text-base text-white cta-primary">
        Quero começar
      </button>
    </form>
  );
}
