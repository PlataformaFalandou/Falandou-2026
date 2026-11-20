// Escala CEFR — fonte única para os componentes visuais (UX/UI §25).
// Descrições em situações de trabalho, alinhadas a /resultados.
import { STATS } from "@/data/stats";

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CEFRLevel = (typeof CEFR_LEVELS)[number];

export const CEFR_INFO: Record<CEFRLevel, { name: string; work: string }> = {
  A1: { name: "Iniciante", work: "Entende e usa expressões do dia a dia e frases muito simples." },
  A2: { name: "Básico", work: "Lê e-mails curtos com apoio e troca informações simples e rotineiras." },
  B1: { name: "Intermediário", work: "Se vira em situações conhecidas, mas trava em reuniões rápidas ou temas novos." },
  B2: { name: "Intermediário superior", work: "Participa de reuniões, defende um ponto de vista e conversa com nativos sem grande esforço." },
  C1: { name: "Avançado", work: "Usa o inglês com flexibilidade em apresentações, negociações e textos complexos." },
  C2: { name: "Proficiente", work: "Compreende praticamente tudo e se expressa com precisão e nuance." },
};

/** Cor por nível: cinza nos iniciais, laranja na zona de transformação (B1–B2), dourado em C1–C2. */
export function cefrColor(level: CEFRLevel): string {
  if (level === "B1" || level === "B2") return "#FF6820";
  if (level === "C1" || level === "C2") return "#D9A944";
  return "#6B6B6B";
}

/**
 * O que dizer sobre o próximo nível. Só usa dado medido: o tempo médio existe apenas
 * para B1 → B2 (último ciclo). Nos outros casos, o prazo vem do diagnóstico.
 */
export function nextLevelNote(level: CEFRLevel): string {
  if (level === "C2") return "C2 é o topo da escala. O ciclo foca em precisão, nuance e no vocabulário do seu setor.";
  if (level === "B1")
    return `No último ciclo, quem começou em B1 chegou a B2 em ${STATS.b1b2Weeks} semanas, em média.`;
  return `No último ciclo, ${STATS.cefrUpPct} dos profissionais subiram pelo menos 1 nível em ${STATS.cycleDays} dias. O seu prazo sai do diagnóstico.`;
}
