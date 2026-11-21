"use client";

/**
 * Sons da experiência (direção "o inglês ganhando forma" §5.3).
 * - Desligados por padrão; o visitante liga em "Sons da experiência" (guardado neste navegador).
 * - Dois sinais curtos gerados na hora (Web Audio, sem arquivos): encaixe (~100ms) e conclusão (~320ms).
 * - Nenhum som em hover, rolagem ou abertura da página; silêncio durante a fala em inglês.
 */
import { useSyncExternalStore } from "react";
import { isSpeaking } from "@/lib/speech";

const KEY = "falandou:sons";
const EVENT = "falandou:sons";

function readPref(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function setSoundsEnabled(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "1" : "0");
  } catch {
    /* ignora */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useSoundsEnabled(): boolean {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(EVENT, cb);
      return () => window.removeEventListener(EVENT, cb);
    },
    readPref,
    () => false
  );
}

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  if (typeof window === "undefined" || !("AudioContext" in window)) return null;
  ctx ??= new AudioContext();
  return ctx;
}

function tone(freq: number, start: number, dur: number, gain = 0.06) {
  const a = audio();
  if (!a) return;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = "sine";
  o.frequency.value = freq;
  const t0 = a.currentTime + start;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(a.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.02);
}

/** Encaixe de bloco: um toque curto (~100ms). */
export function playSnap() {
  if (!readPref() || isSpeaking()) return;
  tone(660, 0, 0.1);
}

/** Conclusão: duas notas ascendentes (~320ms). */
export function playDone() {
  if (!readPref() || isSpeaking()) return;
  tone(523, 0, 0.16);
  tone(784, 0.14, 0.18);
}
