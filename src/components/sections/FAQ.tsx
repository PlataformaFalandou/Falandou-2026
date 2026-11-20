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
      className="border-b border-black/8 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className={`font-display font-semibold text-base transition-colors duration-200 ${isOpen ? "" : "text-grafite group-hover:text-laranja"}`}
          style={{ color: isOpen ? "#FF6820" : undefined }}
        >
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            backgroundColor: isOpen ? "#FF6820" : "rgba(22,22,22,0.08)",
            color: isOpen ? "white" : "#161616",
          }}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "300px" : "0", opacity: isOpen ? 1 : 0 }}
      >
        <p className="font-body text-grafite/65 text-sm leading-relaxed pb-5">
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
}: {
  items?: FAQEntry[];
  title?: string;
  /** Link "mais dúvidas" abaixo da lista (FAQ resumido da home). */
  moreLink?: { href: string; label: string };
} = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32" style={{ backgroundColor: "#F5F6F1" }}>
      <JsonLd data={faqSchema(items)} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-14 items-start">
          {/* Left: header */}
          <div className="lg:col-span-2">
            <p className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#FF6820" }}>
              Dúvidas frequentes
            </p>
            <h2
              className="reveal font-display font-extrabold leading-tight delay-100"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", color: "#161616" }}
            >
              {title}
            </h2>
            <p className="reveal font-body text-base mt-4 delay-200" style={{ color: "rgba(22,22,22,0.55)" }}>
              Não encontrou sua resposta? Fale diretamente com a gente pelo WhatsApp.
            </p>

            <a
              href={getWhatsAppUrlForContext("faq")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick("faq")}
              className="reveal inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 delay-300"
              style={{ backgroundColor: "#161616" }}
            >
              Falar com nossa equipe
            </a>
          </div>

          {/* Right: FAQ list */}
          <div className="reveal lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 shadow-sm delay-200">
            {items.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
            {moreLink && (
              <Link
                href={moreLink.href}
                className="inline-block mt-6 font-body text-sm font-semibold underline underline-offset-4"
                style={{ color: "#FF6820" }}
              >
                {moreLink.label} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
