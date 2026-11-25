"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-fade";

/**
 * Revelação ao rolar — observador único do site (revisão técnica §5.1).
 *
 * Conteúdo VISÍVEL POR PADRÃO: o estado oculto só existe com <html class="reveal-on">, que
 * este hook põe depois de iniciar com sucesso. Antes disso (sem JavaScript, erro de
 * carregamento, hidratação lenta), tudo aparece normalmente.
 *
 * - Ao iniciar, o que já está na tela (ou acima dela) é marcado como visível na hora —
 *   nada some e reaparece.
 * - O resto revela quando entra ~80px na área visível; uma vez por visita (unobserve).
 * - Novos elementos (troca de página, conteúdo que hidrata depois) entram sozinhos.
 * - "Reduzir movimento" ligado (ou ligado durante a visita): nada fica oculto.
 * - Ao desmontar, observadores são desconectados e a classe é removida.
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const revealAll = () => document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("visible"));
    if (reducedMq.matches) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0 }
    );

    const tracked = new WeakSet<Element>();
    const track = (el: Element) => {
      if (el.classList.contains("visible") || tracked.has(el)) return;
      tracked.add(el);
      const r = el.getBoundingClientRect();
      // Já na tela ou acima dela: visível sem animação (não "pisca").
      if (r.top < window.innerHeight - 80 || r.bottom < 0) {
        el.classList.add("visible");
        return;
      }
      io.observe(el);
    };
    const scan = (node: ParentNode) => node.querySelectorAll(SELECTOR).forEach(track);

    scan(document);
    root.classList.add("reveal-on");

    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as Element;
          if (el.matches(SELECTOR)) track(el);
          scan(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const onReducedChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return;
      revealAll();
      root.classList.remove("reveal-on");
    };
    reducedMq.addEventListener("change", onReducedChange);

    return () => {
      io.disconnect();
      mo.disconnect();
      reducedMq.removeEventListener("change", onReducedChange);
      root.classList.remove("reveal-on");
    };
  }, []);
}
