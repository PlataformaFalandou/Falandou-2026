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
    <section className="on-brand py-12 md:py-20" style={{ backgroundColor: "#FF6820" }}>
      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
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
            className="cta-dark"
          >
            Quero começar
          </a>
          {secondary && (
            <Link
              href={secondary.href}
              className="cta-outline-dark"
            >
              {secondary.label}
            </Link>
          )}
        </div>
        {/* Revisão editorial §28: o que acontece ao clicar */}
        <p className="mt-5 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
          Abre o WhatsApp da equipe com uma mensagem pronta · você decide se envia · resposta em até 1h
        </p>
      </div>
    </section>
  );
}
