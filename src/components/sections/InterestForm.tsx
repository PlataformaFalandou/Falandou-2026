"use client";

/**
 * InterestForm — CTA direto para o WhatsApp, com a opção de deixar o nome antes.
 *
 * Revisão técnica §3.3: pede só o necessário. O contato (telefone/e-mail) saiu: a conversa
 * já acontece no WhatsApp, que traz o número. O nome fica no estado enquanto o formulário
 * está aberto e pode ser editado depois de preparar a mensagem. Analytics registra só a
 * interação (contexto), nunca o nome.
 */
import { useId, useState } from "react";
import { MessageCircle, Pencil } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

interface InterestFormProps {
  /** Contexto usado no evento de analytics */
  context: string;
  /** Mensagem pré-preenchida no WhatsApp */
  whatsappMessage: string;
  /** Texto do botão de envio */
  ctaLabel?: string;
}

const withName = (msg: string, name: string) => (name.trim() ? `${msg} Me chamo ${name.trim()}.` : msg);

export default function InterestForm({ context, whatsappMessage, ctaLabel = "Quero começar" }: InterestFormProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"cta" | "form" | "handoffReady">("cta");
  const [url, setUrl] = useState("");

  const handleDirectClick = () => {
    trackCTAClick(context);
    window.open(getWhatsAppUrl(whatsappMessage), "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCTAClick(`${context}-form`); // só a interação; o nome não vai para a medição
    const text = withName(whatsappMessage, name);
    const link = getWhatsAppUrl(text);
    setUrl(link);
    window.open(link, "_blank", "noopener,noreferrer");
    setStep("handoffReady");
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-[420px]">
      {step !== "handoffReady" && (
        <button type="button" onClick={handleDirectClick} className="cta-primary cta-lg w-full rounded-full">
          {ctaLabel}
        </button>
      )}

      {step === "cta" && (
        <button
          type="button"
          onClick={() => setStep("form")}
          className="cta-tertiary min-h-[44px] text-sm font-semibold self-center"
          style={{ color: "var(--color-text-body)" }}
        >
          Prefere deixar seu nome antes?
        </button>
      )}

      {step === "form" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="field">
            <input
              id={`${uid}-nome`}
              type="text"
              placeholder=" "
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <label htmlFor={`${uid}-nome`}>Seu nome (opcional)</label>
          </div>
          {/* O que será enviado — antes do clique (revisão de jornada §10) */}
          <p className="text-sm leading-6 rounded-xl p-3" style={{ backgroundColor: "var(--color-interactive)", color: "var(--color-text-body)" }}>
            <strong className="text-white">Mensagem:</strong> “{withName(whatsappMessage, name)}”
          </p>
          <button type="submit" className="cta-secondary w-full rounded-full">
            Preparar mensagem com meu nome
          </button>
        </form>
      )}

      {step === "handoffReady" && (
        <div className="confirm-in flex flex-col gap-3" role="status" aria-live="polite">
          <p className="text-base text-white font-semibold">Sua mensagem está pronta para enviar no WhatsApp.</p>
          <p className="text-sm" style={{ color: "var(--color-text-body)" }}>
            Ela ainda não foi enviada: confira no WhatsApp e toque em enviar. Se a nova aba não abriu, use o botão abaixo.
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="cta-primary w-full rounded-full">
            <MessageCircle aria-hidden="true" />
            Abrir o WhatsApp
          </a>
          <button type="button" onClick={() => setStep("form")} className="cta-secondary w-full rounded-full">
            <Pencil aria-hidden="true" />
            Editar informações
          </button>
        </div>
      )}

      <p className="text-sm text-center m-0" style={{ color: "var(--color-text-muted)" }}>
        Abre o WhatsApp da equipe · resposta em até 1h
      </p>
    </div>
  );
}
