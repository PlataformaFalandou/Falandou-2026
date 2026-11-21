"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

// Ponto 38 — além da profissão, o visitante se reconhece pelo momento que está vivendo.
// Cada momento leva à landing page que fala exatamente com ele.
const moments = [
  { label: "Tenho uma entrevista em inglês", href: "/ingles-entrevista" },
  { label: "Quero ser promovido", href: "/promocao-cargo" },
  { label: "Vou trabalhar no exterior", href: "/ingles-expatriacao" },
  { label: "Conduzo reuniões e apresentações", href: "/ingles-executivo" },
];

// Copywriting §10 — dor e ganho como situação concreta, não sintoma abstrato.
// `href` leva à página do perfil (/para/...) quando ela existe.
const profiles: { img: string; role: string; pain: string; gain: string; href?: string }[] = [
  {
    img: "/images/prof-arquiteta.webp",
    role: "Arquitetos e Engenheiros",
    pain: "Trava na call com o cliente de fora quando precisa defender o projeto",
    gain: "Conduz a apresentação do projeto, responde objeções e fecha a reunião",
    href: "/para/engenheiros",
  },
  {
    img: "/images/medico-solucao.webp",
    role: "Profissionais de Saúde",
    pain: "Lê o artigo em inglês, mas fica em silêncio na discussão de caso com a equipe de fora",
    gain: "Apresenta o caso no congresso e responde às perguntas da plateia",
  },
  {
    img: "/images/logistica-briefing.webp",
    role: "Gestores e Líderes",
    pain: "Faz o discurso em português enquanto o time de fora espera — e percebe",
    gain: "Entra na reunião com o time global e conduz, não só participa",
    href: "/para/gestores",
  },
  {
    img: "/images/email-profissional.webp",
    role: "Analistas e Especialistas",
    pain: "Gasta uma hora num e-mail de cinco linhas e ainda pede para alguém revisar",
    gain: "Responde o e-mail do gestor de fora na hora, sem rascunho no tradutor",
  },
];
/**
 * Arquitetura §4/§8 — `persona` troca o cabeçalho por um texto específico da
 * landing page; nas LPs o bloco "Ou comece pelo seu momento" fica oculto para
 * uma LP não levar o visitante às outras.
 */
export type ForWhomPersona = {
  title: React.ReactNode;
  intro: string;
};

export default function ForWhom({ persona }: { persona?: ForWhomPersona } = {}) {
  return (
    <section id="para-quem" className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow reveal font-body text-sm font-bold uppercase tracking-widest mb-3">
              Para quem é
            </p>
            <h2 className="reveal font-display font-extrabold leading-tight delay-100" style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
              {persona ? (
                persona.title
              ) : (
                <>
                  Feito para profissionais que usam inglês no trabalho{" "}
                  <em className="not-italic" style={{ color: "#FF6820" }}>— ou precisarão usar.</em>
                </>
              )}
            </h2>
          </div>
          <p className="reveal font-body text-base leading-relaxed md:max-w-xs delay-200" style={{ color: "rgba(245,246,241,0.65)" }}>
            {persona?.intro ?? "Não ensinamos inglês genérico. Cada plano é montado em torno do seu contexto profissional."}
          </p>
        </div>

        {/* Profile cards — large format like reference */}
        {/* Revisão visual §6.1: foto em cima, texto embaixo (sem texto longo sobre a foto).
            4 → 2 → 1 colunas conforme a largura, para o texto continuar legível (§4.2). */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {profiles.map((p, i) => (
            <div
              key={p.role}
              className="reveal rounded-2xl overflow-hidden flex flex-col"
              style={{ transitionDelay: `${i * 80}ms`, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <div className="relative aspect-[16/9] img-skeleton">
                <Image src={p.img} alt={p.role} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#FF8A4C" }}>
                  {p.role}
                </p>
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-sm mt-1 flex-shrink-0" aria-hidden="true"><X size={16} strokeWidth={2.5} aria-hidden="true" /></span>
                  <p className="text-base leading-6" style={{ color: "var(--color-text-body)" }}>{p.pain}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm mt-1 flex-shrink-0" aria-hidden="true"><Check size={16} strokeWidth={2.5} aria-hidden="true" /></span>
                  <p className="text-base leading-6 font-semibold text-white">{p.gain}</p>
                </div>
                {p.href && !persona && (
                  <Link
                    href={p.href}
                    className="cta-tertiary mt-auto pt-6 inline-flex items-center gap-1 text-base font-semibold text-white"
                  >
                    Ver situações deste perfil <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Momentos — identificação por situação, não só por profissão (só fora das LPs) */}
        {!persona && (
        <div className="mt-14">
          <p className="font-body text-sm font-bold uppercase tracking-widest mb-5 text-center" style={{ color: "rgba(245,246,241,0.55)" }}>
            Ou comece pelo seu momento
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {moments.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-surface border border-border hover:border-[rgba(255,104,32,0.4)] hover:shadow-md transition-all duration-300"
              >
                <span className="font-body text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  {m.label}
                </span>
                <ArrowRight size={16} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: "#FF6820" }} />
              </Link>
            ))}
          </div>
        </div>

        )}

        {/* CTA — visitante acabou de se reconhecer em um dos perfis */}
        <div className="mt-16 text-center">
          <p className="font-body text-base mb-6" style={{ color: "rgba(245,246,241,0.65)" }}>
            Se você se identificou com algum desses perfis, o próximo passo é simples.
          </p>
          <a
            href={getWhatsAppUrlForContext("cta")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("forwho")}
            className="inline-flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-full text-white cta-primary">
            Esse sou eu — quero saber mais
          </a>
        </div>
      </div>
    </section>
  );
}
