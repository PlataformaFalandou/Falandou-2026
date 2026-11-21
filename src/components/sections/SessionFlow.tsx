/**
 * SessionFlow — "Como funciona uma sessão" (revisão editorial §27).
 * Concretiza a experiência antes dos depoimentos. Só fatos já publicados em /metodo:
 * prática guiada entre sessões, sessão 1 a 1 de 25 ou 50 min com professor fixo,
 * correção na hora e dúvidas no WhatsApp no mesmo dia.
 */
import Link from "next/link";
import { ArrowRight, BookOpenCheck, MessageCircle, MessagesSquare, PenLine } from "lucide-react";
import { RESCHEDULE_RULE } from "@/data/plans";

const STEPS = [
  {
    Icon: BookOpenCheck,
    when: "Antes da sessão",
    title: "Prática guiada da semana",
    body: "Atividades de 20 a 30 minutos por dia, direcionadas ao seu plano e às situações do seu trabalho.",
  },
  {
    Icon: MessagesSquare,
    when: "Na sessão",
    title: "Você e o professor, ao vivo",
    body: "25 ou 50 minutos com o seu professor fixo, sobre a reunião, o e-mail ou a entrevista que você tem pela frente.",
  },
  {
    Icon: PenLine,
    when: "Durante a sessão",
    title: "Correção na hora",
    body: "O professor ouve você falar, corrige no momento e faz você repetir até sair certo.",
  },
  {
    Icon: MessageCircle,
    when: "Entre as sessões",
    title: "Dúvidas no mesmo dia",
    body: "Dúvidas respondidas pelo professor no WhatsApp no mesmo dia. Precisa reagendar? Avise com 24h de antecedência.",
  },
];

export default function SessionFlow() {
  return (
    <section className="py-12 md:py-20" style={{ backgroundColor: "var(--color-bg-alt)" }} aria-labelledby="como-e-uma-sessao">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <p className="reveal text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#FF6820" }}>
          Na prática
        </p>
        <h2
          id="como-e-uma-sessao"
          className="reveal font-display font-extrabold text-white leading-tight mb-12 delay-100 max-w-3xl"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Como funciona uma sessão.
        </h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map(({ Icon, when, title, body }, i) => (
            <li
              key={title}
              className="reveal rounded-2xl p-6 md:p-8 flex flex-col"
              style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", transitionDelay: `${i * 100}ms` }}
            >
              <span className="flex items-center gap-3 mb-4">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,104,32,0.15)", color: "#FF6820" }}
                >
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  {i + 1} · {when}
                </span>
              </span>
              <h3 className="font-display font-bold text-lg text-white mb-2">{title}</h3>
              <p className="text-base leading-6" style={{ color: "var(--color-text-body)" }}>
                {body}
              </p>
            </li>
          ))}
        </ol>
        <p className="reveal mt-8 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {RESCHEDULE_RULE}{" "}
          <Link href="/metodo" className="cta-tertiary text-white font-semibold inline-flex items-center gap-1">
            Ver o ciclo completo <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
