"use client";

/**
 * PlanFinderForm — formulário curto que abre o WhatsApp com a mensagem preenchida
 * (UX/UI §11, versão "WhatsApp-first"; §21 estados de envio, erro e sucesso).
 * A escola NÃO oferece consulta gratuita: o formulário só adianta à equipe o que ela
 * precisa para indicar o plano. Nada é gravado no site — o texto vai direto para o WhatsApp.
 */

import { useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

const AREAS = ["Engenharia e tecnologia", "Gestão e negócios", "Saúde", "Direito", "Educação e pesquisa", "Outra área"];
const LEVELS = [
  "Não sei o meu nível",
  "A1–A2 · básico",
  "B1 · intermediário",
  "B2 · intermediário superior",
  "C1 ou acima · avançado",
];

type Field = "name" | "area" | "level";
type Errors = Partial<Record<Field, string>>;

function validate(v: { name: string; area: string; level: string }): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Escreva o seu nome.";
  if (!v.area) e.area = "Escolha a sua área.";
  if (!v.level) e.level = "Escolha o seu nível (ou “Não sei”).";
  return e;
}

export default function PlanFinderForm({ context = "plan-finder" }: { context?: string }) {
  const [values, setValues] = useState({ name: "", area: "", level: "", goal: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [url, setUrl] = useState("");

  const errors = validate(values);
  const state = (f: Field) => (!touched[f] ? undefined : errors[f] ? "error" : "valid");
  const set = (f: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [f]: e.target.value }));
  const touch = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, area: true, level: true });
    if (Object.keys(errors).length) return;
    const msg =
      `Olá! Quero ajuda para escolher o meu plano na Falandou. ` +
      `Meu nome é ${values.name.trim()}, trabalho com ${values.area.toLowerCase()} ` +
      `e o meu nível hoje: ${values.level}.` +
      (values.goal.trim() ? ` O que eu quero conquistar com o inglês: ${values.goal.trim()}` : "");
    const link = getWhatsAppUrl(msg);
    setUrl(link);
    setStatus("sending");
    trackCTAClick(`${context}-form`);
    // Abre no mesmo gesto do clique (navegadores bloqueiam pop-up aberto depois).
    window.open(link, "_blank", "noopener,noreferrer");
    setTimeout(() => setStatus("sent"), 500);
  }

  if (status === "sent") {
    return (
      <div className="text-center py-6" role="status" aria-live="polite">
        <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-5" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="rgba(45,122,79,0.18)" stroke="#5CC28A" strokeWidth="2" />
          <path d="M20 33 l8 8 l16 -18" fill="none" stroke="#5CC28A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="check-draw" />
        </svg>
        <p className="font-display font-extrabold text-white mb-2" style={{ fontSize: "var(--text-h3)" }}>
          Pronto, {values.name.trim().split(" ")[0]}!
        </p>
        <p className="text-base mb-6 max-w-md mx-auto" style={{ color: "var(--color-text-body)" }}>
          Abrimos o WhatsApp com a sua mensagem. É só enviar: a equipe responde em até 1h com o plano indicado
          para o seu caso.
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="cta-tertiary text-sm font-semibold text-white">
          O WhatsApp não abriu? Toque aqui
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 text-left">
      <div className="field" data-state={state("name")}>
        <input
          id="pf-name"
          type="text"
          autoComplete="given-name"
          placeholder=" "
          value={values.name}
          onChange={set("name")}
          onBlur={touch("name")}
          aria-invalid={state("name") === "error"}
          aria-describedby={state("name") === "error" ? "pf-name-err" : undefined}
          required
        />
        <label htmlFor="pf-name">Seu nome</label>
        {state("name") === "error" && <p id="pf-name-err" className="field-error">{errors.name}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="field" data-state={state("area")}>
          <select id="pf-area" value={values.area} onChange={set("area")} onBlur={touch("area")} aria-invalid={state("area") === "error"} required>
            <option value="" disabled>
              Escolha
            </option>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          <label htmlFor="pf-area">Sua área de atuação</label>
          {state("area") === "error" && <p className="field-error">{errors.area}</p>}
        </div>
        <div className="field" data-state={state("level")}>
          <select id="pf-level" value={values.level} onChange={set("level")} onBlur={touch("level")} aria-invalid={state("level") === "error"} required>
            <option value="" disabled>
              Escolha
            </option>
            {LEVELS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <label htmlFor="pf-level">Seu nível de inglês hoje</label>
          {state("level") === "error" && <p className="field-error">{errors.level}</p>}
        </div>
      </div>

      <div className="field">
        <textarea id="pf-goal" placeholder=" " rows={3} value={values.goal} onChange={set("goal")} maxLength={300} />
        <label htmlFor="pf-goal">O que você quer conquistar com o inglês? (opcional)</label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="cta-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:justify-self-start min-w-[220px] px-8 py-4 rounded-full text-base font-bold disabled:opacity-70 disabled:cursor-wait"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Abrindo o WhatsApp…
          </>
        ) : (
          <>
            <MessageCircle size={18} aria-hidden="true" />
            Quero a indicação do meu plano
          </>
        )}
      </button>
      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
        Pelo WhatsApp · resposta em até 1h · sem compromisso. Nada fica gravado no site.
      </p>
    </form>
  );
}
