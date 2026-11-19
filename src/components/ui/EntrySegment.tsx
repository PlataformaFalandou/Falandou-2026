"use client";

/**
 * EntrySegment — ponto 45: mensagem de WhatsApp por segmento de entrada.
 *
 * Cada página já tem sua própria mensagem (lib/whatsapp.ts). O que se perdia
 * era o segmento: quem entra por /ingles-entrevista e depois clica num plano
 * em /planos mandava uma mensagem sem falar da entrevista.
 *
 * Aqui guardamos (só nesta visita, em sessionStorage) a última landing page
 * de segmento visitada e, no clique de qualquer link wa.me fora dela,
 * acrescentamos uma frase com o objetivo do visitante. A mensagem continua
 * editável pelo visitante no WhatsApp antes de enviar.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "falandou_entry_segment";

// Página de segmento → objetivo, em linguagem do próprio visitante.
// `keywords`: se a mensagem do botão já fala disso, não repetimos.
const SEGMENTS: Record<string, { pages: string[]; goal: string; keywords: string[] }> = {
  entrevista: {
    pages: ["/ingles-entrevista"],
    goal: "me preparar para uma entrevista em inglês",
    keywords: ["entrevista"],
  },
  executivo: {
    pages: ["/ingles-executivo"],
    goal: "conduzir reuniões e apresentações em inglês",
    keywords: ["executivo", "reuniões e apresentações"],
  },
  expatriacao: {
    pages: ["/ingles-expatriacao"],
    goal: "trabalhar no exterior",
    keywords: ["transfer", "exterior"],
  },
  promocao: {
    pages: ["/promocao-cargo"],
    goal: "conseguir uma promoção em que o inglês é requisito",
    keywords: ["promoção"],
  },
};

function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function segmentForPath(path: string): string | null {
  const p = normalize(path);
  for (const [key, seg] of Object.entries(SEGMENTS)) {
    if (seg.pages.includes(p)) return key;
  }
  return null;
}

function readSegment(): string | null {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeSegment(key: string) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, key);
  } catch {
    /* storage indisponível — segue sem segmento */
  }
}

export default function EntrySegment() {
  const pathname = usePathname();

  // Registra o segmento ao visitar uma landing page de segmento.
  useEffect(() => {
    const key = segmentForPath(pathname);
    if (key) writeSegment(key);
  }, [pathname]);

  // No clique em qualquer link do WhatsApp, acrescenta o objetivo do segmento.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // [data-share]: link de compartilhamento para terceiros, não contato com a escola.
      const link = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]:not([data-share])') as HTMLAnchorElement | null;
      if (!link) return;

      const key = readSegment();
      const seg = key ? SEGMENTS[key] : undefined;
      if (!seg) return;

      try {
        const [base, query = ""] = link.href.split("?");
        const params = new URLSearchParams(query);
        const text = params.get("text") ?? "";
        const lower = text.toLowerCase();

        // A mensagem do botão já fala do segmento (ex.: CTAs da própria landing page).
        if (seg.keywords.some((k) => lower.includes(k))) return;

        const sentence = `Meu objetivo principal: ${seg.goal}.`;
        // encodeURIComponent (e não URLSearchParams) para os espaços virarem %20, não "+".
        link.href = `${base}?text=${encodeURIComponent(`${text} ${sentence}`.trim())}`;
      } catch {
        /* href inválido — mantém o link original */
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
