"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Contador animado (UX/UI §15): conta de 0 até o valor real ao entrar na tela,
 * com ease-out. O HTML estático já sai com o valor final (sem "0%" para quem não
 * roda JavaScript), e quem pediu menos movimento no sistema vê o número direto (§18).
 */
export function useCounter(end: number, duration: number = 1200) {
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        observer.disconnect();
        let startTime: number | null = null;
        const step = (ts: number) => {
          if (startTime === null) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          setCount(Math.round(eased * end));
          if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return { count, ref };
}
