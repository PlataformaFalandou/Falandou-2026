"use client";

/**
 * Reprodução de frases em inglês (direção "o inglês ganhando forma" §5.1, §5.2, §6.3).
 *
 * - Estados explícitos: idle → loading → playing ⇄ paused → idle | error.
 * - Fonte: gravação da escola (`audioSrc`, recomendada) ou, sem ela, a voz em inglês do
 *   navegador (Web Speech API). Só a frase em inglês é enviada à voz — nada de texto misto.
 * - Só começa após uma ação do visitante; iniciar outra frase interrompe a anterior.
 * - `stopAllSpeech()` encerra tudo (troca de página, seção fora da tela, aba oculta).
 */
import { useCallback, useEffect, useRef, useState } from "react";

export type PlayState = "idle" | "loading" | "playing" | "paused" | "error";

type Controller = { stop: () => void };
let current: Controller | null = null;
let speaking = false;

/** Há fala em andamento? (os efeitos sonoros ficam em silêncio durante a fala) */
export function isSpeaking() {
  return speaking;
}

export function stopAllSpeech() {
  current?.stop();
  current = null;
  speaking = false;
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

function pickVoice(): Promise<SpeechSynthesisVoice | null> {
  return new Promise((resolve) => {
    const choose = () => {
      const voices = window.speechSynthesis.getVoices();
      resolve(voices.find((v) => v.lang === "en-US") ?? voices.find((v) => v.lang.startsWith("en")) ?? null);
    };
    if (window.speechSynthesis.getVoices().length) return choose();
    const t = setTimeout(choose, 1500);
    window.speechSynthesis.addEventListener(
      "voiceschanged",
      () => {
        clearTimeout(t);
        choose();
      },
      { once: true }
    );
  });
}

export function useSpeech(text: string, audioSrc?: string) {
  const [state, setState] = useState<PlayState>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mine = useRef<Controller | null>(null);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (!audioSrc && "speechSynthesis" in window) window.speechSynthesis.cancel();
    speaking = false;
    setState("idle");
  }, [audioSrc]);

  const play = useCallback(async () => {
    stopAllSpeech();
    const ctrl: Controller = { stop };
    current = ctrl;
    mine.current = ctrl;
    setState("loading");

    if (audioSrc) {
      audioRef.current?.pause();
      const a = new Audio(audioSrc);
      audioRef.current = a;
      a.addEventListener("playing", () => {
        speaking = true;
        setState("playing");
      });
      a.addEventListener("ended", () => {
        speaking = false;
        setState("idle");
      });
      a.addEventListener("error", () => {
        speaking = false;
        setState("error");
      });
      a.play().catch(() => setState("error"));
      return;
    }

    if (!("speechSynthesis" in window)) {
      setState("error");
      return;
    }
    const voice = await pickVoice();
    if (current !== ctrl) return; // outra frase começou enquanto a voz carregava
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    if (voice) u.voice = voice;
    u.rate = 0.95;
    u.onstart = () => {
      speaking = true;
      setState("playing");
    };
    u.onend = () => {
      speaking = false;
      setState("idle");
    };
    u.onerror = (e) => {
      speaking = false;
      setState(e.error === "interrupted" || e.error === "canceled" ? "idle" : "error");
    };
    window.speechSynthesis.speak(u);
  }, [audioSrc, text, stop]);

  const pause = useCallback(() => {
    if (audioSrc) audioRef.current?.pause();
    else window.speechSynthesis.pause();
    setState("paused");
  }, [audioSrc]);

  const resume = useCallback(() => {
    if (audioSrc) audioRef.current?.play().catch(() => setState("error"));
    else window.speechSynthesis.resume();
    setState("playing");
  }, [audioSrc]);

  // Texto mudou (outra situação) ou o componente saiu: encerra a fala dele.
  useEffect(() => {
    return () => {
      if (current && current === mine.current) stopAllSpeech();
    };
  }, [text]);

  // Aba oculta: pausa.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && current === mine.current) stopAllSpeech();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return { state, play, pause, resume, stop };
}
