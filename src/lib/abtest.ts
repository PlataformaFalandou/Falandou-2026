/**
 * abtest.ts
 * Split-test simples, client-side, persistido em localStorage.
 *
 * Uso no servidor (SSR/SSG): sempre retorna a variante A — sem hydration mismatch.
 * No cliente, após mount, o componente lê o bucket real e atualiza se necessário.
 */

export type ABVariant = "A" | "B";

const STORAGE_KEY = "falandou_ab_hero_framing";

/**
 * Retorna a variante atribuída ao visitante.
 * - Servidor / sem localStorage: sempre "A" (evita mismatch)
 * - Primeira visita: sorteia 50/50 e persiste
 * - Visitas seguintes: lê o bucket salvo
 */
export function getHeroVariant(): ABVariant {
  if (typeof window === "undefined") return "A";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "A" || stored === "B") return stored;

  const assigned: ABVariant = Math.random() < 0.5 ? "A" : "B";
  localStorage.setItem(STORAGE_KEY, assigned);
  return assigned;
}

/**
 * Força uma variante específica — útil para preview/QA.
 * Chamar na URL com ?ab=B force-seta a variante.
 */
export function forceVariantFromURL(): void {
  if (typeof window === "undefined") return;
  const param = new URLSearchParams(window.location.search).get("ab");
  if (param === "A" || param === "B") {
    localStorage.setItem(STORAGE_KEY, param);
  }
}
