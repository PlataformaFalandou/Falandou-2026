"use client";

/**
 * Comportamentos globais de UX:
 * - barra de atividade fina e laranja durante a troca de página (revisão técnica §1.3);
 * - revelação ao rolar (useScrollReveal);
 * - registro do service worker de fallback offline (só em produção).
 */
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Só aparece se a troca demorar mais que isto: navegações instantâneas não piscam. */
const SHOW_AFTER_MS = 150;
/** Navegação que não concluiu (cancelada, falhou, ficou presa): a barra some sozinha. */
const GIVE_UP_AFTER_MS = 8000;

type Nav = { from: string; visible: boolean };

export default function SiteChrome() {
  const pathname = usePathname();
  const [nav, setNav] = useState<Nav | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const done = nav !== null && pathname !== nav.from;
  useScrollReveal();

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Começa num clique em link interno que muda de página. Um clique novo substitui o
  // anterior (destinos diferentes em sequência não acumulam barras nem timers).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;

      clearTimers();
      const from = location.pathname;
      setNav({ from, visible: false });
      timers.current.push(
        setTimeout(() => setNav((n) => (n && n.from === from ? { ...n, visible: true } : n)), SHOW_AFTER_MS),
        setTimeout(() => setNav(null), GIVE_UP_AFTER_MS)
      );
    };
    // Voltar/avançar no navegador cancela o que estiver pendente.
    const onPop = () => {
      clearTimers();
      setNav(null);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
      clearTimers();
    };
  }, []);

  // Rota confirmada: completa a barra e some.
  useEffect(() => {
    if (!done) return;
    clearTimers();
    const id = setTimeout(() => setNav(null), 300);
    return () => clearTimeout(id);
  }, [done]);

  // Fallback offline: só em produção, para não interferir no servidor de desenvolvimento.
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  // Indicador de atividade, não porcentagem real. Nunca bloqueia a troca de página.
  if (!nav || !nav.visible) return null;
  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 h-[3px] z-[70] pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          backgroundColor: "#FF6820",
          transform: done ? "scaleX(1)" : "scaleX(0.8)",
          opacity: done ? 0 : 1,
          transition: done
            ? "transform var(--dur-fast) ease-out, opacity var(--dur-base) var(--dur-fast)"
            : "transform 4s cubic-bezier(0.1, 0.6, 0.2, 1)",
        }}
      />
    </div>
  );
}
