"use client";

/**
 * "Ouvir frase em inglês" (direção §5.1, §5.2): estados visíveis — carregar, reproduzir,
 * pausar, repetir, tentar de novo. A frase tocada recebe um fundo discreto (sem mover o texto).
 * A transcrição está sempre na tela.
 */
import { useEffect } from "react";
import { Loader2, Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { useSpeech } from "@/lib/speech";

export default function ListenButton({
  text,
  audioSrc,
  onStateChange,
}: {
  text: string;
  audioSrc?: string;
  onStateChange?: (playing: boolean) => void;
}) {
  const { state, play, pause, resume } = useSpeech(text, audioSrc);
  const playing = state === "playing";
  // Avisa o pai para destacar a frase tocada (fundo discreto, texto parado).
  useEffect(() => {
    onStateChange?.(playing);
  }, [playing, onStateChange]);

  const label =
    state === "loading"
      ? "Carregando…"
      : state === "playing"
        ? "Pausar"
        : state === "paused"
          ? "Continuar"
          : state === "error"
            ? "Tentar de novo"
            : "Ouvir frase em inglês";
  const Icon =
    state === "loading" ? Loader2 : state === "playing" ? Pause : state === "paused" ? Play : state === "error" ? RotateCcw : Volume2;

  return (
    <span className="inline-flex flex-col gap-1">
      <button
        type="button"
        onClick={() => (state === "playing" ? pause() : state === "paused" ? resume() : play())}
        aria-live="polite"
        className="cta-secondary cta-sm rounded-full self-start"
        style={{ minHeight: 44 }}
      >
        <Icon className={state === "loading" ? "animate-spin" : ""} aria-hidden="true" />
        {label}
      </button>
      {state === "error" && (
        <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          O áudio não está disponível neste navegador. A frase está escrita acima.
        </span>
      )}
    </span>
  );
}
