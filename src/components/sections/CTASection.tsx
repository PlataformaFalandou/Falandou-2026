import Link from "next/link";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

/**
 * CTASection — bloco laranja de fechamento das páginas internas
 * (Arquitetura §4: CTA componentizado para manter o texto do botão consistente).
 * Botão primário sempre "Quero começar" (WhatsApp); link secundário opcional,
 * permitido porque o primário é WhatsApp (§3).
 */
export default function CTASection({
  heading,
  text,
  whatsappContext,
  secondary,
}: {
  heading: string;
  text: string;
  whatsappContext: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#FF6820" }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: "var(--text-h2)" }}>
          {heading}
        </h2>
        <p className="font-body text-lg mb-10" style={{ color: "rgba(255,255,255,0.8)" }}>
          {text}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={getWhatsAppUrlForContext(whatsappContext)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: "var(--color-bg)", color: "white" }}
          >
            Quero começar
          </a>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center px-8 py-5 rounded-full text-base font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.4)" }}
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
