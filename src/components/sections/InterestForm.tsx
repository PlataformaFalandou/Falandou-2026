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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        maxWidth: "420px",
      }}
    >
      {/* CTA direto — sem formulário, sem fricção */}
      <button
        type="button"
        onClick={handleDirectClick}
        style={{
          padding: "16px 24px",
          background: "#FF6820",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          letterSpacing: "-0.01em",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {ctaLabel}
      </button>

      {/* Enriquecimento opcional */}
      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          style={{
            background: "none",
            border: "none",
            padding: "4px 0",
            fontSize: "13px",
            color: "#888",
            cursor: "pointer",
            fontFamily: "inherit",
            textDecoration: "underline",
            textDecorationStyle: "dotted",
            textAlign: "center",
          }}
        >
          Prefere deixar seu nome antes?
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Seu nome (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1.5px solid #e0e0e0",
              fontSize: "15px",
              fontFamily: "inherit",
              outline: "none",
              background: "#fff",
              color: "#161616",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6820")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
          />
          <input
            type="text"
            placeholder="WhatsApp ou e-mail (opcional)"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1.5px solid #e0e0e0",
              fontSize: "15px",
              fontFamily: "inherit",
              outline: "none",
              background: "#fff",
              color: "#161616",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6820")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
          />
          <button
            type="submit"
            style={{
              padding: "14px 24px",
              background: "#161616",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "-0.01em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Enviar com meu nome →
          </button>
        </form>
      )}

      <p
        style={{
          fontSize: "12px",
          color: "#aaa",
          textAlign: "center",
          margin: 0,
        }}
      >
        Você será redirecionado para o WhatsApp da equipe Falandou.
      </p>
    </div>
  );
}
