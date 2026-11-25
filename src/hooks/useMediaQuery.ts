"use client";

import { useSyncExternalStore } from "react";

/**
 * Media query reativa (revisão técnica §5.3): acompanha mudanças durante a visita
 * (girar o celular, redimensionar, ligar "reduzir movimento"). No servidor, `false`.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
