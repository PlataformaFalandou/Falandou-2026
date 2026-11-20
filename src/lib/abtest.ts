/**
 * abtest.ts
 * Split-test simples, client-side, persistido em localStorage.
 *
 * Uso no servidor (SSR/SSG): sempre retorna a variante A — sem hydration mismatch.
 * No cliente, após mount, o componente lê o bucket real e atualiza se necessário.
 *
 * v2 (Copywriting §1): entrou a variante C (PVU na headline). A chave mudou para
 * que todos os visitantes sejam sorteados de novo entre as três variantes —
 * sem isso, quem já tinha A ou B nunca veria a C e o teste ficaria enviesado.
 */

export type ABVariant = "A" | "B" | "C";

const VARIANTS: ABVariant[] = ["A", "B", "C"];
const STORAGE_KEY = "falandou_ab_hero_v2";

function isVariant(v: string | null): v is ABVariant {
  return v === "A" || v === "B" || v === "C";
}

/**
 * Retorna a variante atribuída ao visitante.
 * - Servidor / sem localStorage: sempre "A" (evita mismatch)
 * - Primeira visita: sorteia 1/3 para cada e persiste
 * - Visitas seguintes: lê o bucket salvo
 */
export function getHeroVariant(): ABVariant {
  if (typeof window === "undefined") return "A";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isVariant(stored)) return stored;
    const assigned = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    localStorage.setItem(STORAGE_KEY, assigned);
    return assigned;
  } catch {
    return "A";
  }
}

/**
 * Força uma variante específica — útil para preview/QA.
 * Chamar na URL com ?ab=C força a variante.
 */
export function forceVariantFromURL(): void {
  if (typeof window === "undefined") return;
  const param = new URLSearchParams(window.location.search).get("ab");
  if (isVariant(param)) {
    try {
      localStorage.setItem(STORAGE_KEY, param);
    } catch {
      /* storage indisponível: segue com o sorteio */
    }
  }
}
