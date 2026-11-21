"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";
import { DEFAULT_FAQS, type FAQEntry } from "@/data/faq";

import JsonLd from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/schema";
export type { FAQEntry };

/**
 * Item do FAQ (direção de movimento §4.1): abre em 220ms e fecha em 180ms, na altura real
 * da resposta (grid 0fr → 1fr, sem altura máxima arbitrária). A seta gira 180° em 180ms.
 * O foco continua no botão da pergunta.
 */
function FAQItem({ faq, isOpen, onToggle, id }: { faq: FAQEntry; isOpen: boolean; onToggle: () => void; id: string }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-resposta`}
          id={`${id}-pergunta`}
          className="w-full min-h-[56px] flex items-center justify-between gap-4 py-4 text-left group"
        >
          <span
            className={`font-display font-semibold text-base ${isOpen ? "" : "text-ink group-hover:text-laranja"}`}
            style={{ color: isOpen ? "#FF6820" : undefined, transition: "color 160ms ease-out" }}
          >
            {faq.q}
          </span>
          <span
            aria-hidden="true"
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: isOpen ? "#FF6820" : "var(--color-interactive)",
              color: isOpen ? "var(--color-on-brand)" : "var(--color-text)",
              transition: "background-color 180ms ease-out, color 180ms ease-out",
            }}
          >
            <ChevronDown
              size={20}
              style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 180ms ease-out" }}
            />
          </span>
        </button>
      </h3>

      <div
        id={`${id}-resposta`}
        role="region"
        aria-labelledby={`${id}-pergunta`}
        className="grid"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
          transition: isOpen
            ? "grid-template-rows 220ms var(--ease-enter), opacity 220ms ease-out"
            : "grid-template-rows 180ms ease-in, opacity 180ms ease-in",
        }}
        inert={!isOpen}
      >
        <div className="overflow-hidden">
          <p className="font-body text-ink/65 text-base leading-6 pb-5">{faq.a}</p>
        </div>
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
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

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
              className="reveal inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-200 delay-300"
              style={{ backgroundColor: "var(--color-bg)" }}
            >
              Falar com a equipe
            </a>
          </div>

          {/* Right: FAQ list */}
          <div className="reveal lg:col-span-3 bg-surface rounded-2xl p-6 md:p-8 border border-border delay-200">
            {items.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                id={`${uid}faq${i}`}
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
