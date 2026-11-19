// Fonte única dos professores — usada na seção Teachers da home e em /professores.
export type Teacher = {
  name: string;
  title: string;
  photo: string;
  credentials: string[];
  focus: string;
  specialty: string;
  bio: string;
};

export const teachers: Teacher[] = [
  {
    name: "Adriel Pelegrino",
    title: "Fundador & Professor",
    photo: "/images/prof-adriel.png",
    credentials: ["Cambridge C2", "Filólogo e Linguista"],
    focus: "B2 – C2",
    specialty: "Entrevistas internacionais",
    bio: "7 anos treinando profissionais brasileiros para o mercado global. Especialista em comunicação de alto nível: negociações, entrevistas executivas e apresentações para clientes internacionais.",
  },
  {
    name: "Sara El Hamdaoui",
    title: "Professora",
    photo: "/images/prof-sara.jpg",
    credentials: ["CELTA", "DELTA"],
    focus: "A1 – B1",
    specialty: "Inglês cotidiano",
    bio: "Pedagoga com formação europeia e certificações CELTA e DELTA — as mais exigentes para professores de inglês. Especializada em construir a base sólida que todo profissional precisa para crescer com confiança.",
  },
  {
    name: "Amanda Bennett",
    title: "Professora",
    photo: "/images/prof-amanda.png",
    credentials: ["Cambridge", "IELTS", "TOEFL"],
    focus: "A1 – C2",
    specialty: "Literatura e escrita profissional",
    bio: "Pedagoga norte-americana com formação e prática em Cambridge, IELTS e TOEFL. Atende do nível A1 ao C2 com planos individualizados — do diagnóstico inicial até a preparação para certificação.",
  },
];
