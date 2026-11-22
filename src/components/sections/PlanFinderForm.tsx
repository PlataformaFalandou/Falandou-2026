"use client";

/**
 * PlanFinderForm — formulário curto que prepara uma mensagem para o WhatsApp da equipe.
 * A escola NÃO oferece consulta gratuita: o formulário só adianta o que a equipe precisa
 * para indicar o plano. Nada é gravado no site — o texto vai direto para o WhatsApp.
 *
 * Revisão técnica §3:
 * - cada erro tem id próprio (useId), é associado ao campo (aria-describedby) e o foco vai
 *   para o primeiro campo inválido ao enviar;
 * - o site só sabe que PREPAROU a mensagem e tentou abrir o WhatsApp — nunca que a escola
 *   recebeu. Por isso o estado é `handoffReady`, com link visível e "Editar informações";
 * - os dados ficam no estado enquanto o formulário está aberto (editar não apaga nada);
 * - analytics registra só a interação (contexto do formulário), nunca nome, área ou objetivo.
 *
 * Revisão de jornada §10, §12:
 * - antes do envio, a pessoa vê exatamente a mensagem que vai para o WhatsApp;
 * - o que ela preencheu fica só neste navegador (sessionStorage) até fechar a aba — recarregar
 *   ou voltar à página não apaga as respostas; nada é enviado ao site;
 * - se o WhatsApp não abrir, há o link de novo e a opção de copiar a mensagem.
 */

import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy, MessageCircle, Pencil } from "lucide-react";
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
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
const ORDER: Field[] = ["name", "area", "level"];

type Values = { name: string; area: string; level: string; goal: string };
const DRAFT_KEY = "falandou:plano-form";

function buildMessage(v: Values, preview = false): string {
  const name = v.name.trim() || (preview ? "[seu nome]" : "");
  const area = v.area ? v.area.toLowerCase() : preview ? "[sua área]" : "";
  const level = v.level || (preview ? "[seu nível]" : "");
  return (
    `Olá! Quero ajuda para escolher o meu plano na Falandou. ` +
    `Meu nome é ${name}, trabalho com ${area} ` +
    `e o meu nível hoje: ${level}.` +
    (v.goal.trim() ? ` O que eu quero conquistar com o inglês: ${v.goal.trim()}` : "")
  );
}

function validate(v: { name: string; area: string; level: string }): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Escreva o seu nome.";
  if (!v.area) e.area = "Escolha a sua área.";
  if (!v.level) e.level = "Escolha o seu nível (ou “Não sei”).";
  return e;
}

export default function PlanFinderForm({ context = "plan-finder" }: { context?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ids = {
    name: `${uid}-nome`,
    area: `${uid}-area`,
    level: `${uid}-nivel`,
    goal: `${uid}-objetivo`,
  };
  const nameRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLSelectElement>(null);
  const levelRef = useRef<HTMLSelectElement>(null);

  const [values, setValues] = useState<Values>({ name: "", area: "", level: "", goal: "" });
  const [copied, setCopied] = useState(false);

  // Recupera o rascunho desta aba (depois da hidratação, para não divergir do HTML estático).
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        const saved = sessionStorage.getItem(DRAFT_KEY);
        if (saved) setValues((v) => ({ ...v, ...(JSON.parse(saved) as Partial<Values>) }));
      } catch {
        /* armazenamento indisponível: segue com o formulário vazio */
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [step, setStep] = useState<"editing" | "handoffReady">("editing");
  const [url, setUrl] = useState("");
  const headingRef = useRef<HTMLParagraphElement>(null);

  const errors = validate(values);
  const state = (f: Field) => (!touched[f] ? undefined : errors[f] ? "error" : "valid");
  const errId = (f: Field) => `${ids[f]}-erro`;
  const describedBy = (f: Field) => (state(f) === "error" ? errId(f) : undefined);
  const set = (f: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => {
      const next = { ...v, [f]: e.target.value };
      try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      } catch {
        /* ignora */
      }
      return next;
    });
  const touch = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, area: true, level: true });
    const firstInvalid = ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      ({ name: nameRef, area: areaRef, level: levelRef })[firstInvalid].current?.focus();
      return;
    }
    const link = getWhatsAppUrl(buildMessage(values));
    setCopied(false);
    setUrl(link);
    trackCTAClick(`${context}-form`); // só a interação; nenhum dado digitado
    // Abre no mesmo gesto do clique (navegadores bloqueiam pop-up aberto depois).
    window.open(link, "_blank", "noopener,noreferrer");
    setStep("handoffReady");
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  if (step === "handoffReady") {
    return (
      <div className="confirm-in py-2" role="status" aria-live="polite">
        <p ref={headingRef} tabIndex={-1} className="font-display text-white mb-2 outline-none" style={{ fontSize: "var(--text-h3)" }}>
          Sua mensagem está pronta para enviar.
        </p>
        <p className="text-base mb-4 max-w-md" style={{ color: "var(--color-text-body)" }}>
          Abrimos o WhatsApp com o texto preenchido. <strong className="text-white">A mensagem ainda não foi enviada:</strong>{" "}
          confira e toque em enviar por lá. A equipe responde em até 1h com o plano indicado para o seu caso.
        </p>
        <p className="text-sm mb-6 max-w-md" style={{ color: "var(--color-text-muted)" }}>
          O WhatsApp não abriu? Use o botão abaixo ou copie a mensagem e envie para {WHATSAPP_DISPLAY}. Suas respostas
          continuam aqui.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={url} target="_blank" rel="noopener noreferrer" className="cta-primary rounded-full">
            <MessageCircle aria-hidden="true" />
            Abrir o WhatsApp
          </a>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(buildMessage(values));
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
            className="cta-secondary rounded-full"
          >
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? "Mensagem copiada" : "Copiar mensagem"}
          </button>
          <button type="button" onClick={() => setStep("editing")} className="cta-tertiary min-h-[44px] font-semibold text-white">
            <Pencil size={16} aria-hidden="true" className="inline mr-1" />
            Editar informações
          </button>
        </div>
        <p className="sr-only" aria-live="polite">{copied ? "Mensagem copiada." : ""}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 text-left">
      <div className="field" data-state={state("name")}>
        <input
          ref={nameRef}
          id={ids.name}
          type="text"
          autoComplete="given-name"
          placeholder=" "
          value={values.name}
          onChange={set("name")}
          onBlur={touch("name")}
          aria-invalid={state("name") === "error"}
          aria-describedby={describedBy("name")}
          required
        />
        <label htmlFor={ids.name}>Seu nome</label>
        {state("name") === "error" && (
          <p id={errId("name")} className="field-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="field" data-state={state("area")}>
          <select
            ref={areaRef}
            id={ids.area}
            value={values.area}
            onChange={set("area")}
            onBlur={touch("area")}
            aria-invalid={state("area") === "error"}
            aria-describedby={describedBy("area")}
            required
          >
            <option value="" disabled>
              Escolha
            </option>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          <label htmlFor={ids.area}>Sua área de atuação</label>
          {state("area") === "error" && (
            <p id={errId("area")} className="field-error">
              {errors.area}
            </p>
          )}
        </div>
        <div className="field" data-state={state("level")}>
          <select
            ref={levelRef}
            id={ids.level}
            value={values.level}
            onChange={set("level")}
            onBlur={touch("level")}
            aria-invalid={state("level") === "error"}
            aria-describedby={describedBy("level")}
            required
          >
            <option value="" disabled>
              Escolha
            </option>
            {LEVELS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <label htmlFor={ids.level}>Seu nível de inglês hoje</label>
          {state("level") === "error" && (
            <p id={errId("level")} className="field-error">
              {errors.level}
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <textarea id={ids.goal} placeholder=" " rows={3} value={values.goal} onChange={set("goal")} maxLength={300} />
        <label htmlFor={ids.goal}>O que você quer conquistar com o inglês? (opcional)</label>
      </div>

      {/* O que será enviado — antes do clique (§10) */}
      <div className="rounded-xl p-4 text-sm leading-6" style={{ backgroundColor: "var(--color-interactive)" }}>
        <p className="font-semibold text-white mb-1">Mensagem que vai para o WhatsApp</p>
        <p style={{ color: "var(--color-text-body)" }}>“{buildMessage(values, true)}”</p>
        <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
          Inclui só o que você escreveu acima. Você confere no WhatsApp e decide se envia.
        </p>
      </div>

      <button type="submit" className="cta-primary w-full sm:w-auto sm:justify-self-start sm:min-w-[260px] rounded-full">
        <MessageCircle aria-hidden="true" />
        Preparar mensagem no WhatsApp
      </button>
      <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        Abre o WhatsApp com o texto preenchido · a equipe responde em até 1h. Nada é enviado ao site: as respostas
        ficam só neste navegador até você fechar a aba.
      </p>
    </form>
  );
}
