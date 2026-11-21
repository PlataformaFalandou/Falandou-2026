"use client";

/**
 * Situação escolhida pelo visitante (Reuniões / Entrevistas / Apresentações), compartilhada
 * entre a abertura e a microaula. Guardada só durante a visita (sessionStorage) — nada é
 * inferido sobre profissão ou nível, e nada vai para analytics.
 */
import { useSyncExternalStore } from "react";
import type { SituationId } from "@/data/situations";

const KEY = "falandou:situacao";
const EVENT = "falandou:situacao";
const DEFAULT: SituationId = "reunioes";

function read(): SituationId {
  try {
    const v = sessionStorage.getItem(KEY);
    if (v === "reunioes" || v === "entrevistas" || v === "apresentacoes") return v;
  } catch {
    /* armazenamento indisponível: segue com o padrão */
  }
  return DEFAULT;
}

export function setSituation(id: SituationId) {
  try {
    sessionStorage.setItem(KEY, id);
  } catch {
    /* ignora */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useSituation(): SituationId {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(EVENT, cb);
      return () => window.removeEventListener(EVENT, cb);
    },
    read,
    () => DEFAULT
  );
}
