"use client";

/**
 * AnalyticsProvider
 * Injeta os scripts GA4 e Meta Pixel após a hidratação (useEffect),
 * garantindo compatibilidade com SSG (output: "export").
 *
 * Adicione <AnalyticsProvider /> como primeiro filho de <body> em layout.tsx.
 * Os scripts só carregam se os IDs estiverem configurados — não há erro em dev.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, resetScroll50, trackPlansEngaged, trackPlansPageView, trackWhatsAppClick } from "@/lib/analytics";
import { getConsent, CONSENT_EVENT } from "@/lib/consent";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID;

function injectGA4() {
  if (!GA4_ID || document.getElementById("ga4-script")) return;

  // Script de carregamento do gtag.js
  const s1 = document.createElement("script");
  s1.id = "ga4-script";
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s1);

  // Inicialização inline
  const s2 = document.createElement("script");
  s2.id = "ga4-init";
  s2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_ID}', { send_page_view: false });
  `;
  document.head.appendChild(s2);
}

function injectPixel() {
  if (!PIXEL_ID || document.getElementById("pixel-script")) return;

  const s = document.createElement("script");
  s.id = "pixel-script";
  s.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${PIXEL_ID}');
  `;
  document.head.appendChild(s);
}

function trackRoute(pathname: string) {
  trackPageView(pathname);
  // Ponto 46 — público de remarketing "viu /planos" (ViewContent no Pixel).
  // pathname pode vir com barra final (trailingSlash no export estático).
  if (pathname.replace(/\/+$/, "") === "/planos") {
    trackPlansPageView();
  }
}

export default function AnalyticsProvider() {
  const pathname = usePathname();
  // LGPD — GA4 e Pixel só carregam depois do "Aceitar" no aviso de cookies.
  // O componente não renderiza nada, então ler o storage no 1º render não causa hydration mismatch.
  const [consented, setConsented] = useState(
    () => typeof window !== "undefined" && getConsent() === "granted"
  );

  useEffect(() => {
    function onConsent(e: Event) {
      setConsented((e as CustomEvent<string>).detail === "granted");
    }
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  // Injeta os scripts uma única vez, quando houver consentimento
  useEffect(() => {
    if (!consented) return;
    injectGA4();
    injectPixel();
  }, [consented]);

  // Dispara page_view a cada mudança de rota (incluindo a inicial e o momento do aceite)
  useEffect(() => {
    resetScroll50(); // reset do scroll tracker a cada rota nova
    if (!consented) return;
    // Aguarda um tick para os scripts estarem disponíveis no window
    const timer = setTimeout(() => trackRoute(pathname), 100);
    return () => clearTimeout(timer);
  }, [pathname, consented]);

  // Tempo em /planos (30 s e 90 s) — só com consentimento e enquanto a rota não mudar
  useEffect(() => {
    if (!consented || pathname.replace(/\/+$/, "") !== "/planos") return;
    const timers = [30, 90].map((s) => setTimeout(() => trackPlansEngaged(s), s * 1000));
    return () => timers.forEach(clearTimeout);
  }, [pathname, consented]);

  // Ponto 46 — todo clique em link do WhatsApp vira sinal de "já iniciou contato",
  // usado para excluir essa pessoa do remarketing. Sem consentimento, fbq/gtag não
  // existem e as chamadas são no-ops (lib/analytics).
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // [data-share]: compartilhamento com terceiros (ex.: /indique), não contato com a escola.
      const link = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]:not([data-share])');
      if (link) trackWhatsAppClick(window.location.pathname);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null; // componente invisível
}