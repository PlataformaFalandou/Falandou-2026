"use client";

import { useState } from "react";
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

export default function InterestForm({
  context,
  whatsappMessage,
  ctaLabel = "Quero começar",
}: InterestFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleDirectClick = () => {
    trackCTAClick(context);
    window.open(getWhatsAppUrl(whatsappMessage), "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackCTAClick(`${context}-form`);

    const enriched = name.trim()
      ? `${whatsappMessage} Me chamo ${name.trim()}${contact.trim() ? ` e meu contato é ${contact.trim()}` : ""}.`
      : whatsappMessage;

    window.open(getWhatsAppUrl(enriched), "_blank", "noopener,noreferrer");
  };

  // Revisão visual §3 e §6.2: botões e campos do design system (contraste, 48px, foco).
  return (
    <div className="flex flex-col gap-3 w-full max-w-[420px]">
      {/* CTA direto — sem formulário, sem fricção */}
      <button type="button" onClick={handleDirectClick} className="cta-primary cta-lg w-full rounded-full">
        {ctaLabel}
      </button>

      {/* Enriquecimento opcional */}
      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="cta-tertiary min-h-[44px] text-sm font-semibold self-center"
          style={{ color: "var(--color-text-body)" }}
        >
          Prefere deixar seu nome antes?
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="field">
            <input id="if-name" type="text" placeholder=" " autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            <label htmlFor="if-name">Seu nome (opcional)</label>
          </div>
          <div className="field">
            <input id="if-contact" type="text" placeholder=" " value={contact} onChange={(e) => setContact(e.target.value)} />
            <label htmlFor="if-contact">WhatsApp ou e-mail (opcional)</label>
          </div>
          <button type="submit" className="cta-secondary w-full rounded-full">
            Enviar com meu nome
          </button>
        </form>
      )}

      <p className="text-sm text-center m-0" style={{ color: "var(--color-text-muted)" }}>
        Abre o WhatsApp da equipe · resposta em até 1h
      </p>
    </div>
  );
}
