/**
 * analytics.ts
 * Funções centralizadas para GA4 (gtag) e Meta Pixel (fbq).
 * Todas as chamadas são no-ops seguros se os scripts ainda não carregaram.
 *
 * IDs configurados via variáveis de ambiente:
 *   NEXT_PUBLIC_GA4_ID     — ex: G-XXXXXXXXXX
 *   NEXT_PUBLIC_PIXEL_ID   — ex: 1234567890123456
 */

// ─── Tipos mínimos para window.gtag e window.fbq ─────────────────────────────
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    _fbq?: unknown;
  }
}

// ─── Helpers internos ─────────────────────────────────────────────────────────
function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

// ─── Page view ────────────────────────────────────────────────────────────────
/**
 * Deve ser chamado em cada mudança de rota.
 * No SSG de página única basta chamar uma vez no mount do AnalyticsProvider.
 */
export function trackPageView(path: string) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  if (ga4Id) {
    gtag("config", ga4Id, { page_path: path });
  }
  fbq("track", "PageView");
}

// ─── Eventos de CTA ───────────────────────────────────────────────────────────
/**
 * Clique em qualquer botão "Quero começar" / "Falar com nossa equipe" / etc.
 *
 * @param context  Identificador da seção: "hero" | "forwho" | "journey" |
 *                 "results" | "teachers" | "testimonials" | "leadmagnet" |
 *                 "midcta" | "faq" | "navbar"
 */
export function trackCTAClick(context: string) {
  // GA4 — evento personalizado
  gtag("event", "cta_click", {
    event_category: "engagement",
    event_label: context,
  });

  // Meta Pixel — evento padrão Lead (qualquer contato iniciado)
  fbq("track", "Lead", { content_name: context });
}

// ─── Scroll 50% ───────────────────────────────────────────────────────────────
let scroll50Fired = false;

/** Chame uma única vez quando o visitante cruzar 50% da página. */
export function trackScroll50() {
  if (scroll50Fired) return;
  scroll50Fired = true;

  gtag("event", "scroll_depth", {
    event_category: "engagement",
    event_label: "50_percent",
    value: 50,
  });

  fbq("trackCustom", "ScrollDepth50");
}

/** Reset para SPAs que reutilizam o mesmo componente entre navegações. */
export function resetScroll50() {
  scroll50Fired = false;
}

// ─── A/B test impression ─────────────────────────────────────────────────────
/**
 * Dispara quando o visitante vê uma variante de teste.
 * Registra no GA4 para segmentação e análise de conversão por variante.
 *
 * @param testName  ex: "hero_framing"
 * @param variant   "A" | "B"
 */
export function trackABImpression(testName: string, variant: string) {
  gtag("event", "ab_impression", {
    event_category: "experiment",
    event_label: `${testName}_${variant}`,
    experiment_name: testName,
    variant,
  });
}

// ─── Chegada em /planos ───────────────────────────────────────────────────────
/**
 * Dispara quando o visitante chega à página /planos.
 * GA4 captura via page_view automático, mas o evento explícito melhora
 * a segmentação e cria um público no Meta para retargeting.
 */
export function trackPlansPageView() {
  gtag("event", "view_plans", {
    event_category: "funnel",
    event_label: "plans_page",
  });

  // Meta Pixel — ViewContent é o evento padrão para "viu página de produto/preço"
  fbq("track", "ViewContent", {
    content_name: "planos",
    content_category: "pricing",
  });
}
