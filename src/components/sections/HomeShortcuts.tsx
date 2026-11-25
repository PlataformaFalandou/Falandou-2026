import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Atalhos logo abaixo da abertura (revisão de jornada §1): quem já sabe o que procura
 * vai direto, sem percorrer todas as seções da home.
 */
const SHORTCUTS = [
  { label: "Entender o método", desc: "O ciclo de 90 dias, etapa por etapa", href: "/metodo" },
  { label: "Ver planos", desc: "Preços, ritmo e o que cada um inclui", href: "/planos" },
  { label: "Conhecer professores", desc: "Quem conduz as sessões", href: "/professores" },
];

export default function HomeShortcuts() {
  return (
    <nav aria-label="Atalhos da página inicial" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-6 md:py-8">
        <p className="text-sm mb-3" style={{ color: "var(--color-text-muted)" }}>
          Já sabe o que procura?
        </p>
        <ul className="grid sm:grid-cols-3 gap-3">
          {SHORTCUTS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="card-hover flex items-center justify-between gap-3 h-full min-h-[64px] rounded-xl border px-4 py-3"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
              >
                <span>
                  <span className="block font-semibold text-white">{s.label}</span>
                  <span className="block text-sm" style={{ color: "var(--color-text-muted)" }}>
                    {s.desc}
                  </span>
                </span>
                <ArrowRight size={18} aria-hidden="true" className="flex-shrink-0" style={{ color: "#FF6820" }} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
