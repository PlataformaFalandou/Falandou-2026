/**
 * consent.ts — consentimento de cookies não essenciais (LGPD).
 *
 * GA4 e Meta Pixel só carregam com consentimento "granted".
 * A escolha fica no localStorage deste navegador; o evento CONSENT_EVENT avisa
 * o AnalyticsProvider e o aviso de cookies quando ela muda.
 */

export type ConsentValue = "granted" | "denied";

const STORAGE_KEY = "falandou_cookie_consent";
export const CONSENT_EVENT = "falandou:consent";
export const OPEN_PREFERENCES_EVENT = "falandou:cookie-preferences";

export function getConsent(): ConsentValue | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage indisponível — vale só para esta visita */
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

/** Reabre o aviso para a pessoa mudar a escolha (link no rodapé). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
