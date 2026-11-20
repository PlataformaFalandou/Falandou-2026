import type { Metadata } from "next";
import { Badge, Button, Card, Input, Section } from "@/components/ui/ds";
import CEFRScale from "@/components/ui/CEFRScale";
import StatsBar from "@/components/sections/StatsBar";

// UX/UI §27 — página de referência interna: tokens e componentes renderizados.
// Fora do Google e do sitemap. Facilita revisões e a entrada de novos devs.
export const metadata: Metadata = {
  title: "Design system | Falandou",
  robots: { index: false, follow: false },
};

const COLORS = [
  ["--color-brand", "#FF6820", "CTAs, destaques, links ativos"],
  ["--color-brand-dark", "#E05010", "Hover de botões primários"],
  ["--color-bg", "#0F0F0F", "Fundo de página"],
  ["--color-bg-alt", "#141414", "Seções alternadas"],
  ["--color-surface", "#1A1A1A", "Cards, modais, inputs"],
  ["--color-text", "#F5F6F1", "Headlines, texto principal"],
  ["--color-text-body", "#C9CAC4", "Texto corrido"],
  ["--color-text-muted", "#9A9B96", "Legendas, texto de apoio"],
  ["--color-border", "#2A2A2A", "Divisores, bordas de card"],
  ["--color-success", "#2D7A4F", "Confirmação"],
  ["--color-warning", "#B45309", "Alertas"],
  ["--color-gold", "#D9A944", "CEFR C1–C2"],
];

const TYPE = [
  ["H1", "var(--text-h1)", 800, "Hero headline · 40→72px"],
  ["H2", "var(--text-h2)", 700, "Seção principal · 32→44px"],
  ["H3", "var(--text-h3)", 600, "Subseção / card · 22→26px"],
  ["Body", "1rem", 400, "Texto corrido · 16px / 1,6"],
  ["Caption", "var(--text-caption)", 400, "Notas, rodapés · 13px"],
] as const;

const SPACE = [8, 16, 24, 32, 48, 64, 96, 128];

export default function DesignSystemPage() {
  return (
    <main id="conteudo" className="pt-10">
      <Section>
        <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>Interno · não indexado</p>
        <h1 className="font-display font-extrabold text-white mb-4" style={{ fontSize: "var(--text-h1)" }}>Design system</h1>
        <p style={{ color: "var(--color-text-body)" }}>
          Tokens em <code>src/app/globals.css</code> (@theme) · componentes em <code>src/components/ui/ds.tsx</code>.
        </p>
      </Section>

      <Section tone="alt">
        <h2 className="font-display font-extrabold text-white mb-8" style={{ fontSize: "var(--text-h2)" }}>Cores</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COLORS.map(([token, hex, use]) => (
            <div key={token} className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--color-border)" }}>
              <div className="h-16" style={{ backgroundColor: hex }} />
              <div className="p-3 text-xs">
                <p className="font-bold text-white">{token}</p>
                <p className="tnum" style={{ color: "var(--color-text-muted)" }}>{hex} · {use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display font-extrabold text-white mb-8" style={{ fontSize: "var(--text-h2)" }}>Tipografia (escala 1,25)</h2>
        <div className="grid gap-6">
          {TYPE.map(([name, size, weight, note]) => (
            <div key={name} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b pb-4" style={{ borderColor: "var(--color-border)" }}>
              <span className="w-56 text-xs flex-shrink-0" style={{ color: "var(--color-text-muted)" }}>{name} · {note}</span>
              <span className={name.startsWith("H") ? "font-display text-white" : "text-white"} style={{ fontSize: size, fontWeight: weight, lineHeight: 1.15 }}>
                Inglês com resultado medido
              </span>
            </div>
          ))}
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Números tabulados (classe <code>tnum</code>): <span className="tnum text-white text-2xl font-bold">79% · R$ 742,90 · 11 sem</span>
          </p>
        </div>
      </Section>

      <Section tone="alt">
        <h2 className="font-display font-extrabold text-white mb-8" style={{ fontSize: "var(--text-h2)" }}>Espaçamento (8px) e raios</h2>
        <div className="flex flex-wrap items-end gap-4 mb-8">
          {SPACE.map((s) => (
            <div key={s} className="text-center">
              <div style={{ width: s, height: s, backgroundColor: "#FF6820", opacity: 0.8 }} />
              <p className="text-xs mt-1 tnum" style={{ color: "var(--color-text-muted)" }}>{s}px</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {[4, 8, 16, 9999].map((r) => (
            <div key={r} className="w-24 h-16 flex items-center justify-center text-xs text-white" style={{ borderRadius: r, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
              {r === 9999 ? "full" : `${r}px`}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display font-extrabold text-white mb-8" style={{ fontSize: "var(--text-h2)" }}>Botões e selos</h2>
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <Button href="/design-system" size="lg">Primário</Button>
          <Button href="/design-system" variant="secondary" size="lg">Secundário</Button>
          <Button href="/design-system" variant="ghost">Terciário</Button>
          <Button href="/design-system" size="sm">Pequeno</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Badge>✓ Exame CEFR incluso</Badge>
          <Badge tone="brand">B1 → B2</Badge>
          <Badge tone="success">Confirmado</Badge>
          <Badge tone="warning">Atenção</Badge>
        </div>
      </Section>

      <Section tone="alt">
        <h2 className="font-display font-extrabold text-white mb-8" style={{ fontSize: "var(--text-h2)" }}>Cartões e campos</h2>
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <Card><p className="text-white font-bold">Default</p><p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>Borda laranja no hover.</p></Card>
          <Card variant="highlight"><p className="text-white font-bold">Highlight</p><p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>Plano em destaque.</p></Card>
          <Card variant="testimonial"><p className="text-white font-bold">Testimonial</p><p className="text-sm mt-2 italic" style={{ color: "var(--color-text-muted)" }}>“Texto do depoimento.”</p></Card>
        </div>
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl">
          <Input id="ds-a" label="Normal" />
          <Input id="ds-b" label="Válido" state="valid" defaultValue="Ana" />
          <Input id="ds-c" label="Com erro" state="error" error="Escreva o seu nome." />
        </div>
      </Section>

      <Section>
        <h2 className="font-display font-extrabold text-white mb-8" style={{ fontSize: "var(--text-h2)" }}>Escala CEFR</h2>
        <CEFRScale from="B1" to="B2" />
        <div className="mt-10">
          <CEFRScale interactive />
        </div>
      </Section>

      <StatsBar />
    </main>
  );
}
