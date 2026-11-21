"use client";

/**
 * CookieBanner — aviso de cookies (LGPD).
 * Aparece enquanto não houver escolha. "Aceitar" libera GA4 e Meta Pixel;
 * "Recusar" mantém o site funcionando sem eles. Reabre pelo link
 * "Preferências de cookies" no rodapé.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, openCookiePreferences, OPEN_PREFERENCES_EVENT } from "@/lib/consent";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Lido após a montagem: o HTML estático é igual para todos os visitantes.
    const t = setTimeout(() => setOpen(getConsent() === null), 0);
    function reopen() {
      setOpen(true);
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => {
      clearTimeout(t);
      window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
    };
  }, []);

  if (!open) return null;

  function choose(value: "granted" | "denied") {
    setConsent(value);
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-[calc(76px+env(safe-area-inset-bottom))] left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[60] rounded-2xl p-5 shadow-2xl"
      style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
    >
      <p className="font-body text-base leading-6 mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
        Usamos cookies de medição e publicidade (Google Analytics e Meta) para entender como o site é
        usado e mostrar anúncios relevantes. Você pode aceitar ou recusar — o site funciona igual.{" "}
        <Link href="/politica-de-privacidade" className="underline underline-offset-2 text-white">
          Política de privacidade
        </Link>
        .
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="flex-1 px-4 py-2.5 rounded-full font-body font-bold text-sm text-white transition-opacity cta-primary">
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="flex-1 px-4 py-2.5 rounded-full font-body font-semibold text-sm text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          Recusar
        </button>
      </div>
    </div>
  );
}

/** Link do rodapé para reabrir o aviso. */
export function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={className}
    >
      Preferências de cookies
    </button>
  );
}
