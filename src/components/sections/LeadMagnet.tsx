"use client";

import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

// ─── Conteúdo editável ────────────────────────────────────────────────────────
// Cada semana tem: título, foco (subtítulo curto) e 2–3 atividades visíveis.
// A promessa de "roteiro completo em PDF" inclui todas as atividades detalhadas.
const WEEKS = [
  {
    num: "Semana 1",
    title: "Diagnóstico honesto",
    focus: "Entenda onde você está de verdade",
    tasks: [
      "Faça o teste de nível gratuito do British Council (learnenglish.britishcouncil.org/level) e anote seu nível CEFR atual",
      "Liste as 3 situações em inglês que mais travam você no trabalho hoje",
      "Grave 2 minutos falando sobre seu cargo — sem roteiro. Ouça e anote o que incomodou",
    ],
  },
  {
    num: "Semana 2",
    title: "Vocabulário do seu setor",
    focus: "As 50 palavras que realmente importam na sua área",
    tasks: [
      "Abra 3 emails ou documentos em inglês do seu trabalho e destaque os termos que você não usaria naturalmente",
      "Crie um glossário pessoal com 10 termos técnicos da sua área — com exemplo de frase real",
      "Pratique os 10 termos em voz alta 3x ao dia por 5 dias seguidos",
    ],
  },
  {
    num: "Semana 3",
    title: "Comunicação escrita",
    focus: "Emails que não precisam de revisão",
    tasks: [
      "Reescreva em inglês o último email profissional que você mandou em português",
      "Aprenda os 5 padrões de abertura e fechamento de email mais usados no seu setor",
      "Responda uma thread de email em inglês sem usar tradutor — depois compare com o original",
    ],
  },
  {
    num: "Semana 4",
    title: "Comunicação verbal",
    focus: "Falar sem travar na hora H",
    tasks: [
      "Prepare e grave uma apresentação de 3 minutos sobre o seu trabalho para um colega estrangeiro",
      'Treine 10 frases de ganhar tempo: "Let me think about that…", "Could you clarify what you mean by…"',
      "Participe de pelo menos uma call, reunião ou conversa em inglês — sem fugir para o português",
    ],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function LeadMagnet() {
  const whatsappUrl = getWhatsAppUrlForContext("leadmagnet");

  return (
    <section
      id="roteiro-30-dias"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#161616" }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="font-body text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: "#FF6820" }}
          >
            Conteúdo gratuito
          </p>
          <h2
            className="font-display font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)" }}
          >
            Roteiro de 30 dias para quem quer começar{" "}
            <span style={{ color: "#FF6820" }}>do jeito certo.</span>
          </h2>
          <p className="font-body text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Sem matrícula e sem cadastro. Quatro semanas com atividades concretas
            para sair do &ldquo;quero aprender&rdquo; e entrar em modo profissional.
          </p>
        </div>

        {/* Semanas */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {WEEKS.map((week, i) => (
            <div
              key={week.num}
              className="rounded-2xl p-7 flex flex-col gap-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Semana badge + título */}
              <div>
                <span
                  className="inline-block font-body text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                  style={{
                    backgroundColor: i === 0 ? "rgba(255,104,32,0.15)" : "rgba(255,255,255,0.07)",
                    color: i === 0 ? "#FF6820" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {week.num}
                </span>
                <h3
                  className="font-display font-extrabold text-white leading-tight"
                  style={{ fontSize: "1.2rem" }}
                >
                  {week.title}
                </h3>
                <p
                  className="font-body text-sm mt-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {week.focus}
                </p>
              </div>

              {/* Tarefas */}
              <ul className="space-y-3">
                {week.tasks.map((task, j) => (
                  <li key={j} className="flex gap-3 items-start">
                    <span
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: "rgba(255,104,32,0.2)", color: "#FF6820" }}
                    >
                      {j + 1}
                    </span>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {task}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 md:p-10 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,104,32,0.12) 0%, rgba(255,104,32,0.04) 100%)",
            border: "1px solid rgba(255,104,32,0.25)",
          }}
        >
          <p
            className="font-body text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#FF6820" }}
          >
            PDF gratuito
          </p>
          <h3
            className="font-display font-extrabold text-white mb-3"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)" }}
          >
            Receba o roteiro completo com todas as atividades detalhadas.
          </h3>
          <p
            className="font-body text-sm mb-8 max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Versão em PDF com espaço para anotações, links úteis e recursos extras.
            Envio pelo WhatsApp — sem cadastro, sem lista de emails.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("leadmagnet")}
            className="inline-flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-full text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#FF6820" }}
          >
            {/* WhatsApp icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ width: "20px", height: "20px", flexShrink: 0 }}
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Receber o roteiro gratuito
          </a>
          <p
            className="font-body text-xs mt-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Nenhum cadastro. Enviamos direto pelo WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
