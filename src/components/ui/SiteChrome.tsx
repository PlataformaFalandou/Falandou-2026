"use client";

/**
 * Comportamentos globais de UX (UX/UI §19 e §21):
 * - barra de progresso fina e laranja no topo durante a troca de página;
 * - registro do service worker de fallback offline (só em produção).
 */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteChrome() {
  const pathname = usePathname();
  // Caminho de onde a navegação saiu; null = sem navegação em andamento.
  const [from, setFrom] = useState<string | null>(null);
  const done = from !== null && pathname !== from;

  // Começa ao clicar num link interno que muda de página.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // mesma página (âncora ou recarga)
      setFrom(location.pathname);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Termina quando a rota muda: completa a barra e some.
  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => setFrom(null), 400);
    return () => clearTimeout(id);
  }, [done]);

  // Fallback offline: só em produção, para não interferir no servidor de desenvolvimento.
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  if (from === null) return null;
  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 h-[3px] z-[70] pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          backgroundColor: "#FF6820",
          boxShadow: "0 0 8px rgba(255,104,32,0.6)",
          transform: done ? "scaleX(1)" : "scaleX(0.8)",
          opacity: done ? 0 : 1,
          transition: done ? "transform 150ms ease-out, opacity 250ms 150ms" : "transform 4s cubic-bezier(0.1, 0.6, 0.2, 1)",
        }}
      />
    </div>
  );
}
