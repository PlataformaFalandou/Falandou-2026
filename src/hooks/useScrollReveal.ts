"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-fade";

/**
 * Revelação ao rolar (direção de movimento §2.1) — observador único do site.
 * - Inicia quando o bloco entra ~80px na área visível (sem esperar uma porcentagem
 *   grande da seção, para conteúdo longo não ficar oculto).
 * - Uma vez por visita: depois de visível, o elemento deixa de ser observado.
 * - Elementos acima da tela (ex.: ao voltar pelo navegador) aparecem direto.
 * - Novos elementos (troca de página, conteúdo que hidrata depois) entram sozinhos.
 * - Marca <html class="reveal-ready">; sem isso, o script do <head> desfaz o estado
 *   oculto em 3s, então o conteúdo nunca fica escondido se algo falhar.
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    // Registro local de cada execução: se o efeito for montado de novo (React em modo
    // estrito, troca de layout), os elementos voltam a ser observados.
    const tracked = new WeakSet<Element>();
    const track = (el: Element) => {
      if (el.classList.contains("visible") || tracked.has(el)) return;
      tracked.add(el);
      if (reduced || el.getBoundingClientRect().bottom < 0) {
        el.classList.add("visible");
        return;
      }
      io.observe(el);
    };

    const scan = (node: ParentNode) => node.querySelectorAll(SELECTOR).forEach(track);
    scan(document);

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
    root.classList.add("reveal-ready");

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
