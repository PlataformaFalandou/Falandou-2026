import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

const scenarios = [
  {
    icon: "📈",
    trigger: "Promoção ou aumento",
    result: "+R$ 2.000–4.000/mês",
    detail:
      "Profissionais bilíngues recebem em média 61% a mais do que colegas com o mesmo cargo e experiência sem inglês fluente. Uma promoção típica cobre o investimento no curso em menos de 45 dias.",
    cta: "Quero essa promoção",
  },
  {
    icon: "✈️",
    trigger: "Aprovação em processo seletivo",
    result: "Vaga que antes era impossível",
    detail:
      "70% dos nossos alunos passaram em processos seletivos com etapa em inglês dentro de 14 meses. A maioria relatou que o inglês era o único fator eliminatório — não a experiência ou o currículo.",
    cta: "Quero passar na seletiva",
  },
  {
    icon: "🌍",
    trigger: "Transferência internacional",
    result: "Pacote 2–4× o salário local",
    detail:
      "Expatriados recebem pacotes com auxílio de moradia, escola internacional, ajuda de custo e salary uplift. Alunos que conquistaram transferências internacionais recuperaram o investimento no primeiro mês.",
    cta: "Quero a transferência",
  },
];

export default function ROIFrame() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#161616" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="reveal font-body text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: "#FF6820" }}
          >
            Retorno sobre o investimento
          </p>
          <h2
            className="reveal font-display font-extrabold text-white leading-tight delay-100"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}
          >
            O inglês certo no momento certo<br className="hidden md:block" /> muda o tamanho do seu salário.
          </h2>
          <p
            className="reveal font-body text-base mt-4 max-w-2xl mx-auto delay-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Não comparamos preço com outros cursos. Comparamos o investimento com o retorno financeiro que ele gera.
          </p>
        </div>

        {/* Scenario cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {scenarios.map((s, i) => (
            <div
              key={i}
              className="reveal rounded-2xl p-8 flex flex-col gap-4"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                animationDelay: `${i * 100}ms`,
              }}
            >
              <span className="text-3xl">{s.icon}</span>

              <div>
                <p
                  className="font-body text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {s.trigger}
                </p>
                <p
                  className="font-display font-extrabold text-xl"
                  style={{ color: "#FF6820" }}
                >
                  {s.result}
                </p>
              </div>

              <p
                className="font-body text-sm leading-relaxed flex-1"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {s.detail}
              </p>

              <a
                href={getWhatsAppUrlForContext("roi")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#FF6820", color: "white" }}
              >
                {s.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom math */}
        <div
          className="reveal rounded-2xl p-8 md:p-10 text-center"
          style={{ background: "rgba(255,104,32,0.12)", border: "1px solid rgba(255,104,32,0.3)" }}
        >
          <p
            className="font-display font-extrabold text-2xl md:text-3xl text-white mb-3"
          >
            Conta simples: o plano custa ~R$ 185/mês.<br className="hidden md:block" />
            Uma promoção traz R$ 2.000+/mês a mais.
          </p>
          <p
            className="font-body text-base max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            O retorno não é "aprender inglês". É o que o inglês desbloqueado permite que você faça — e ganhe.
          </p>
        </div>

      </div>
    </section>
  );
}
