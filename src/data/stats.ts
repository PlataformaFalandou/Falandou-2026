// Números institucionais e de resultado — fonte única (Arquitetura §4: evitar
// valores "hardcoded em vários lugares"). Ao fechar um novo ciclo, atualize aqui.
// Componentes que leem daqui: StatsBar, números da Hero, ProofStats, ResultsData, /sobre.
// Textos corridos que citam números (ex.: FAQs, subtítulos) devem ser revisados junto.

export const STATS = {
  /** Profissionais formados. */
  formed: "600+",
  /** Anos de operação da escola. */
  yearsOperating: 7,
  /** Avaliação média dos profissionais. */
  rating: "4.9★",
  /** Dias de cada ciclo. */
  cycleDays: 90,

  // ── Último ciclo fechado ────────────────────────────────────────────────
  cycleLabel: "Jan–Set 2024",
  evaluated: 87,
  /** % que subiu pelo menos 1 nível CEFR. */
  cefrUpPct: "79%",
  /** Semanas médias de B1 para B2. */
  b1b2Weeks: 11,
  /** % aprovado em seletivas com etapa em inglês (até 14 meses). */
  selectivePct: "70%",
  /** % que concluiu o ciclo sem abandonar. */
  completionPct: "92%",
} as const;
