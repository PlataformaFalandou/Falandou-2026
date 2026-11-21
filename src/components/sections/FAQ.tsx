"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";
import { DEFAULT_FAQS, type FAQEntry } from "@/data/faq";

import JsonLd from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/schema";
export type { FAQEntry };

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQEntry; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="border-b border-white/10 last:border-0"
    >
      {/* Revisão visual §6.2: linha clicável de no mínimo 56px, ícone de 20px, estado aberto anunciado */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full min-h-[56px] flex items-center justify-between gap-4 py-4 text-left group"
      >
        <span className={`font-display font-semibold text-base transition-colors duration-200 ${isOpen ? "" : "text-ink group-hover:text-laranja"}`}
          style={{ color: isOpen ? "#FF6820" : undefined }}
        >
          {faq.q}
        </span>
        <span
          aria-hidden="true"
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            backgroundColor: isOpen ? "#FF6820" : "var(--color-interactive)",
            color: isOpen ? "var(--color-on-brand)" : "var(--color-text)",
          }}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "300px" : "0", opacity: isOpen ? 1 : 0 }}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <p className="font-body text-ink/65 text-base leading-6 pb-5">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ({
  items = DEFAULT_FAQS,
  title = "Tudo que você precisa saber antes de começar.",
  moreLink,
  ctaLabel = "Montar o meu plano com a equipe",
}: {
  items?: FAQEntry[];
  title?: string;
  /** Botão depois da última pergunta (estágio: última objeção removida). */
  ctaLabel?: string;
  /** Link "mais dúvidas" abaixo da lista (FAQ resumido da home). */
  moreLink?: { href: string; label: string };
} = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
      <JsonLd data={faqSchema(items)} />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-5 gap-14 items-start">
          {/* Left: header */}
          <div className="lg:col-span-2">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
              Dúvidas frequentes
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight delay-100"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}
            >
              {title}
            </h2>
            <p className="reveal font-body text-base mt-4 delay-200" style={{ color: "rgba(245,246,241,0.65)" }}>
              Não encontrou sua resposta? Fale diretamente com a gente pelo WhatsApp.
            </p>

            <a
              href={getWhatsAppUrlForContext("faq")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick("faq")}
              className="reveal inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 delay-300"
              style={{ backgroundColor: "var(--color-bg)" }}
            >
              Falar com a equipe
            </a>
          </div>

          {/* Right: FAQ list */}
          <div className="reveal lg:col-span-3 bg-surface rounded-2xl p-8 md:p-10 shadow-sm delay-200">
            {items.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
            {/* Copywriting §7 — CTA depois da última objeção: o visitante já decidiu.
                (O documento sugeria "consulta gratuita", que a escola não oferece.) */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {moreLink ? (
                <Link
                  href={moreLink.href}
                  className="font-body text-sm font-semibold underline underline-offset-4"
                  style={{ color: "#FF6820" }}
                >
                  {moreLink.label} →
                </Link>
              ) : (
                <span />
              )}
              <a
                href={getWhatsAppUrlForContext("faq")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("faq_after")}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-bold text-white cta-primary">
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
