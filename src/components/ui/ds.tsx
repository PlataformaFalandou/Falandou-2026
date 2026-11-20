/**
 * Componentes base do design system (UX/UI §27). Tokens em src/app/globals.css (@theme).
 * Referência visual: /design-system (fora do Google).
 * Novos blocos devem usar estes componentes; os antigos migram aos poucos.
 */
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const SIZE: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "min-w-[220px] px-8 py-4 text-base",
};
const VARIANT: Record<Variant, string> = {
  primary: "cta-primary font-bold",
  secondary: "cta-secondary font-semibold",
  ghost: "cta-tertiary font-semibold text-white px-0 py-0",
};

/** Botão/link: primary (laranja), secondary (borda laranja), ghost (sublinhado laranja). */
export function Button({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  children,
  onClick,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full ${variant === "ghost" ? "" : SIZE[size]} ${VARIANT[variant]} ${className}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}

/** Pill: nível CEFR, selo de confiança, aviso. */
export function Badge({ tone = "neutral", children }: { tone?: "neutral" | "brand" | "success" | "warning"; children: ReactNode }) {
  const style = {
    neutral: { border: "1px solid var(--color-border)", color: "rgba(245,246,241,0.85)" },
    brand: { background: "rgba(255,104,32,0.15)", border: "1px solid rgba(255,104,32,0.4)", color: "#FF8A4C" },
    success: { background: "rgba(45,122,79,0.2)", border: "1px solid #2D7A4F", color: "#5CC28A" },
    warning: { background: "rgba(180,83,9,0.2)", border: "1px solid #B45309", color: "#F59E0B" },
  }[tone];
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={style}>
      {children}
    </span>
  );
}

/** Cartão: default, highlight (plano em destaque) e testimonial. */
export function Card({ variant = "default", className = "", children }: { variant?: "default" | "highlight" | "testimonial"; className?: string; children: ReactNode }) {
  const style =
    variant === "highlight"
      ? { backgroundColor: "#1A1A1A", border: "2px solid #FF6820" }
      : { backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" };
  return (
    <div className={`card-hover rounded-2xl p-6 md:p-8 ${className}`} style={style}>
      {children}
    </div>
  );
}

/** Seção com fundo: bg (padrão), alt (alternado), surface, brand (faixa laranja). */
export function Section({ tone = "bg", id, className = "", children }: { tone?: "bg" | "alt" | "surface" | "brand"; id?: string; className?: string; children: ReactNode }) {
  const bg = { bg: "var(--color-bg)", alt: "var(--color-bg-alt)", surface: "var(--color-surface)", brand: "#FF6820" }[tone];
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`} style={{ backgroundColor: bg }}>
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}

/** Campo com rótulo flutuante; estados normal / focus / error / success via `state`. */
export function Input({
  id,
  label,
  type = "text",
  state,
  error,
  ...rest
}: {
  id: string;
  label: string;
  type?: "text" | "email" | "tel";
  state?: "valid" | "error";
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "type">) {
  return (
    <div className="field" data-state={state}>
      <input id={id} type={type} placeholder=" " inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined} {...rest} />
      <label htmlFor={id}>{label}</label>
      {state === "error" && error && <p className="field-error">{error}</p>}
    </div>
  );
}
