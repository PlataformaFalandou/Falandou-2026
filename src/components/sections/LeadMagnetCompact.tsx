"use client";

/**
 * LeadMagnetCompact — ponto 47: alternativa para quem ainda não está pronto.
 * Versão curta do LeadMagnet da home, para o fim das páginas internas
 * (depois do CTA final). Entrega pelo WhatsApp, sem cadastro.
 */

import Link from "next/link";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

export default function LeadMagnetCompact() {
  return (
    <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div
          className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex-1">
            <p className="eyebrow font-body text-xs font-bold uppercase tracking-widest mb-3">
              Ainda não é a hora? Comece por aqui
            </p>
            <h2
              className="font-display font-extrabold text-white leading-tight mb-2"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Roteiro de 30 dias para destravar o inglês no trabalho — grátis.
            </h2>
            <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Quatro semanas com atividades concretas, em PDF.{" "}
              <Link href="/#roteiro-30-dias" className="underline underline-offset-4 hover:text-white transition-colors">
                Ver o roteiro
              </Link>
            </p>
          </div>
          <div className="flex flex-col items-start md:items-center gap-2 flex-shrink-0">
            <a
              href={getWhatsAppUrlForContext("leadmagnet")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick("leadmagnet-compact")}
              className="inline-flex items-center gap-2 font-body font-bold text-base px-7 py-4 rounded-full text-white cta-primary">
              Receber o roteiro gratuito
            </a>
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Sem cadastro. Enviamos pelo WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
