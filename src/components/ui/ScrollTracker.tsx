"use client";

/**
 * ScrollTracker
 * Componente invisível que dispara trackScroll50() uma única vez
 * quando o visitante rola 50% da altura da página.
 *
 * Use IntersectionObserver em vez de scroll listener para performance:
 * observa um sentinel posicionado a 50% do documento.
 */

import { useEffect, useRef } from "react";
import { trackScroll50 } from "@/lib/analytics";

export default function ScrollTracker() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackScroll50();
          observer.disconnect(); // dispara uma só vez
        }
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Sentinel posicionado a ~50% da viewport via CSS.
  // top: 50vh posiciona o elemento no meio da janela visível;
  // quando o usuário rola até lá, o IntersectionObserver dispara.
  return (
    <div
      ref={sentinelRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "50vh",
        left: 0,
        width: "1px",
        height: "1px",
        pointerEvents: "none",
        opacity: 0,
      }}
    />
  );
}
