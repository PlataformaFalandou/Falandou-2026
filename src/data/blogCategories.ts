// Cor de cada categoria do blog (Arquitetura §6). Fora de lib/blog.ts porque
// aquele arquivo usa `fs` e não pode ser importado por componentes de cliente.
// Tons escuros o bastante para texto legível sobre fundo claro.
export const CATEGORY_COLORS: Record<string, string> = {
  "Vocabulário Profissional": "#1E6FD9",
  "Gramática Funcional": "#5B8C1A",
  "Carreira Internacional": "#E85A12",
  "Método": "#7B3FBF",
  CEFR: "#00806E",
};

export function categoryColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? "#FF6820";
}
