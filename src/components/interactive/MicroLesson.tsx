"use client";

/**
 * Microaula interativa (direção "o inglês ganhando forma diante de você" §2.1, §2.3, §6.3).
 * 30–45 segundos, sem cadastro:
 *   1. escolher a melhor resposta para a situação (3 opções) → explicação de clareza,
 *      intenção e formalidade → ouvir a frase em inglês;
 *   2. montar a frase com blocos;
 *   3. conclusão: "Você explorou esta situação" (nunca um nível CEFR).
 * Estados: escolha → explicação → montagem → concluído. Trocar de situação recomeça.
 * Áudio e animações param ao sair da seção (fora da tela) e ao trocar de página.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Volume2, VolumeX } from "lucide-react";
import { getSituation, type Choice } from "@/data/situations";
import { useSituation } from "@/lib/situationStore";
import { stopAllSpeech } from "@/lib/speech";
import { playDone, setSoundsEnabled, useSoundsEnabled } from "@/lib/sfx";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";
import SituationTabs from "@/components/interactive/SituationTabs";
import ListenButton from "@/components/interactive/ListenButton";
import SentenceBuilder from "@/components/interactive/SentenceBuilder";
import CompletionMark from "@/components/interactive/CompletionMark";

type Step = "choose" | "build" | "done";

export default function MicroLesson() {
  const s = getSituation(useSituation());
  const sounds = useSoundsEnabled();
  // Estado da atividade por situação: trocar de situação recomeça do zero.
  const [progress, setProgress] = useState<{ id: string; step: Step; picked: number | null }>({ id: s.id, step: "choose", picked: null });
  const cur = progress.id === s.id ? progress : { id: s.id, step: "choose" as Step, picked: null };
  const [speaking, setSpeaking] = useState(false);
  const onSpeak = useCallback((p: boolean) => setSpeaking(p), []);
  const sectionRef = useRef<HTMLElement>(null);

  // Saiu da tela: encerra o áudio (a página nunca fica tocando em segundo plano).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && stopAllSpeech(), { threshold: 0 });
    io.observe(el);
    return () => {
      io.disconnect();
      stopAllSpeech();
    };
  }, []);

  const pick = (i: number) => setProgress({ id: s.id, step: "choose", picked: i });
  const best = s.choices.find((c) => c.best) as Choice;
  const picked = cur.picked !== null ? s.choices[cur.picked] : null;

  return (
    <section ref={sectionRef} className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg)" }} aria-labelledby="microaula">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <p className="eyebrow reveal text-sm font-bold uppercase tracking-widest mb-3">Experimente</p>
        <h2 id="microaula" className="reveal font-display text-white mb-3 max-w-3xl" style={{ fontSize: "var(--text-h2)" }}>
          O inglês ganhando forma <span style={{ color: "#FF6820" }}>diante de você.</span>
        </h2>
        <p className="reveal text-lg max-w-2xl mb-8" style={{ color: "var(--color-text-body)" }}>
          Escolha uma situação e passe 30 segundos dentro de uma sessão: escolha a resposta, entenda o porquê e monte a frase.
        </p>

        <div className="reveal max-w-xl mb-8">
          <SituationTabs depth />
        </div>

        <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
            <p className="font-display font-bold text-white text-xl md:text-2xl leading-snug max-w-2xl">{s.prompt}</p>
            <button
              type="button"
              onClick={() => setSoundsEnabled(!sounds)}
              aria-pressed={sounds}
              className="inline-flex items-center gap-2 min-h-[44px] px-3 rounded-full text-sm border"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-body)" }}
            >
              {sounds ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
              Sons da experiência: {sounds ? "ligados" : "desligados"}
            </button>
          </div>

          {/* 1 — escolher a resposta */}
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-text-muted)" }}>
              1 · Qual resposta você usaria?
            </legend>
            <div className="grid gap-3">
              {s.choices.map((c, i) => {
                const chosen = cur.picked === i;
                const reveal = cur.picked !== null;
                const tone = reveal && c.best ? "#5CC28A" : chosen ? "#FF8A4C" : "var(--color-border)";
                return (
                  <button
                    key={c.text}
                    type="button"
                    onClick={() => pick(i)}
                    aria-pressed={chosen}
                    lang="en"
                    className="text-left rounded-xl border p-4 min-h-[56px] text-base leading-6"
                    style={{
                      borderColor: tone,
                      backgroundColor: chosen ? "var(--color-interactive)" : "transparent",
                      color: "#F5F6F1",
                      transition: "border-color var(--dur-base) ease-out, background-color var(--dur-base) ease-out",
                    }}
                  >
                    “{c.text}”
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Explicação + ouvir */}
          {picked && (
            <div className="confirm-in mt-5 rounded-xl p-5" style={{ backgroundColor: "var(--color-interactive)" }} aria-live="polite">
              <p className="flex items-start gap-2 text-base leading-6" style={{ color: "var(--color-text-body)" }}>
                <span className="dot mt-2" aria-hidden="true" />
                <span>
                  <strong className="text-white">{picked.best ? "Boa escolha. " : "Vale comparar. "}</strong>
                  {picked.why}
                  {!picked.best && (
                    <>
                      {" "}
                      <strong className="text-white">A mais eficaz aqui:</strong> {best.why}
                    </>
                  )}
                </span>
              </p>
              <p lang="en" className={`mt-4 text-lg text-white font-medium ${speaking ? "speaking-hl" : ""}`}>
                “{best.text}”
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <ListenButton text={best.text} audioSrc={s.audio} onStateChange={onSpeak} />
                {cur.step === "choose" && (
                  <button type="button" onClick={() => setProgress({ ...cur, step: "build" })} className="cta-primary cta-sm rounded-full" style={{ minHeight: 44 }}>
                    Próximo: montar uma frase
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 2 — montar a frase */}
          {cur.step !== "choose" && (
            <div className="confirm-in mt-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-text-muted)" }}>
                2 · Monte a frase
              </p>
              <SentenceBuilder
                key={s.id}
                blocks={s.blocks}
                accepted={s.accepted}
                end={s.end}
                onSolved={() => {
                  setProgress({ ...cur, step: "done" });
                  playDone();
                }}
              />
            </div>
          )}

          {/* 3 — conclusão */}
          {cur.step === "done" && (
            <div className="mt-6 rounded-xl p-5 border" style={{ borderColor: "rgba(92,194,138,0.5)" }}>
              <CompletionMark />
              <p className="text-base leading-6 mt-3" style={{ color: "var(--color-text-body)" }}>
                Você explorou esta situação. {s.builderNote}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <a
                  href={getWhatsAppUrl(s.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick(`microaula-${s.id}`)}
                  className="cta-primary rounded-full"
                >
                  <MessageCircle aria-hidden="true" />
                  Treinar {s.label.toLowerCase()} nas sessões
                </a>
                <a href="#microaula" className="cta-secondary rounded-full">
                  Trocar situação
                </a>
              </div>
            </div>
          )}
        </div>
        <p className="text-xs mt-3" style={{ color: "var(--color-text-muted)" }}>
          Exemplo didático criado pela escola. A atividade não mede o seu nível — o nível vem do exame CEFR do início do ciclo.
        </p>
      </div>
    </section>
  );
}
