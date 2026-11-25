"use client";

/**
 * Índice curto para páginas longas (revisão de jornada §9).
 * - Computador: lista visível no início da página, com âncoras.
 * - Celular: lista recolhida ("Nesta página"), para economizar espaço; fecha ao escolher.
 * - A seção em leitura recebe aria-current="location" e um traço lateral (não só cor, §7).
 * As seções de destino precisam de `id`; o deslocamento do cabeçalho fixo vem de
 * `scroll-padding-top` (globals.css).
 */
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export type IndexItem = { id: string; label: string };

export default function PageIndex({ items }: { items: IndexItem[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const update = () => {
      const line = window.innerHeight * 0.35;
      let found: string | null = null;
      for (const el of els) if (el.getBoundingClientRect().top <= line) found = el.id;
      setCurrent(found);
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  const link = (i: IndexItem, closeList = false) => (
    <a href={`#${i.id}`} className="toc-link text-base" aria-current={current === i.id ? "location" : undefined} onClick={closeList ? (e) => e.currentTarget.closest("details")?.removeAttribute("open") : undefined}>
      {i.label}
    </a>
  );

  return (
    <nav aria-label="Nesta página" className="max-w-5xl mx-auto px-5 md:px-8">
      {/* Celular: lista recolhida */}
      <details

        className="toc-details md:hidden rounded-2xl border"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
      >
        <summary className="flex items-center justify-between min-h-[52px] px-4 font-semibold text-white">
          Nesta página
          <ChevronDown size={18} aria-hidden="true" className="toc-chevron" style={{ transition: "transform var(--dur-base) ease-out" }} />
        </summary>
        <ul className="px-4 pb-4 grid gap-1">
          {items.map((i) => (
            <li key={i.id}>{link(i, true)}</li>
          ))}
        </ul>
      </details>

      {/* Computador: lista visível */}
      <div className="hidden md:flex items-center gap-6 flex-wrap">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
          Nesta página
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {items.map((i) => (
            <li key={i.id}>{link(i)}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
