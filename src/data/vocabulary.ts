// Glossário profissional (/vocabulario) — UX/UI §17.
// Formato de cada entrada: termo em inglês · pronúncia (IPA, inglês americano) ·
// definição em português · exemplo no contexto profissional · nível CEFR sugerido.
// Para crescer: adicione termos nas áreas existentes ou crie uma área nova.
import type { CEFRLevel } from "@/data/cefr";

export type VocabEntry = {
  term: string;
  ipa: string;
  definition: string;
  example: string;
  level: CEFRLevel;
};

/** guide: artigo do blog que aprofunda a área (topic cluster, SEO §9). */
export type VocabArea = { slug: string; name: string; intro: string; guide?: { href: string; label: string }; entries: VocabEntry[] };

export const VOCABULARY: VocabArea[] = [
  {
    slug: "negocios",
    name: "Negócios e reuniões",
    intro: "Termos que aparecem toda semana em reuniões, e-mails e alinhamentos de projeto.",
    guide: { href: "/blog/vocabulario-reunioes-negocios/", label: "Veja as 50 expressões de inglês para reuniões" },
    entries: [
      { term: "stakeholder", ipa: "/ˈsteɪkˌhoʊldər/", definition: "Parte interessada: pessoa ou grupo afetado por um projeto ou decisão.", example: "We need to align with all stakeholders before the launch.", level: "B1" },
      { term: "to follow up", ipa: "/ˌfɑːloʊ ˈʌp/", definition: "Dar retorno ou retomar um assunto depois de um primeiro contato.", example: "I'll follow up with the client by Friday.", level: "B1" },
      { term: "deliverable", ipa: "/dɪˈlɪvərəbəl/", definition: "Entregável: resultado concreto que um projeto precisa entregar.", example: "The main deliverable for Q3 is the new dashboard.", level: "B2" },
      { term: "bottleneck", ipa: "/ˈbɑːtəlˌnɛk/", definition: "Gargalo: a etapa que atrasa todo o resto do processo.", example: "Approval from legal is our main bottleneck.", level: "B2" },
      { term: "to circle back", ipa: "/ˈsɜːrkəl bæk/", definition: "Voltar a um assunto mais tarde, em vez de decidir agora.", example: "Let's circle back to the budget after lunch.", level: "B2" },
      { term: "headcount", ipa: "/ˈhɛdˌkaʊnt/", definition: "Número de pessoas no quadro de uma equipe ou empresa.", example: "We can't increase headcount this year.", level: "B2" },
    ],
  },
  {
    slug: "engenharia",
    name: "Engenharia e tecnologia",
    intro: "Vocabulário de projeto, operação e software para falar com times e clientes globais.",
    entries: [
      { term: "requirement", ipa: "/rɪˈkwaɪərmənt/", definition: "Requisito: o que o produto ou sistema precisa cumprir.", example: "The client added a new security requirement.", level: "B1" },
      { term: "deployment", ipa: "/dɪˈplɔɪmənt/", definition: "Implantação: colocar uma versão do sistema em produção.", example: "The deployment is scheduled for Monday night.", level: "B2" },
      { term: "root cause", ipa: "/ˈruːt ˌkɔːz/", definition: "Causa raiz: a origem real de uma falha, não o sintoma.", example: "We're still investigating the root cause of the outage.", level: "B2" },
      { term: "trade-off", ipa: "/ˈtreɪd ˌɔːf/", definition: "Escolha que equilibra uma vantagem contra uma desvantagem.", example: "There's a trade-off between cost and performance.", level: "B2" },
      { term: "tolerance", ipa: "/ˈtɑːlərəns/", definition: "Tolerância: a variação aceitável em uma medida ou especificação.", example: "All parts are within tolerance.", level: "B2" },
      { term: "to scale", ipa: "/skeɪl/", definition: "Escalar: crescer em volume mantendo o desempenho.", example: "The platform needs to scale to ten thousand users.", level: "B2" },
    ],
  },
  {
    slug: "direito",
    name: "Direito e contratos",
    intro: "Termos de contratos internacionais, compliance e negociações com escritórios estrangeiros.",
    guide: { href: "/blog/ingles-juridico-advogados/", label: "Leia o guia de inglês jurídico para advogados" },
    entries: [
      { term: "clause", ipa: "/klɔːz/", definition: "Cláusula: cada item de um contrato.", example: "Clause 7 covers termination.", level: "B1" },
      { term: "to comply with", ipa: "/kəmˈplaɪ wɪð/", definition: "Cumprir uma regra ou lei; estar em conformidade.", example: "All vendors must comply with data protection laws.", level: "B2" },
      { term: "liability", ipa: "/ˌlaɪəˈbɪləti/", definition: "Responsabilidade legal por um dano ou obrigação.", example: "The supplier limits its liability to the contract value.", level: "C1" },
      { term: "breach of contract", ipa: "/ˌbriːtʃ əv ˈkɑːntrækt/", definition: "Quebra de contrato: descumprimento de uma obrigação contratual.", example: "Late delivery could be a breach of contract.", level: "C1" },
      { term: "due diligence", ipa: "/ˌduː ˈdɪlɪdʒəns/", definition: "Diligência prévia: análise detalhada antes de fechar um negócio.", example: "The due diligence took three months.", level: "C1" },
      { term: "governing law", ipa: "/ˈɡʌvərnɪŋ ˌlɔː/", definition: "Lei aplicável: a legislação que rege o contrato.", example: "The governing law is the law of England and Wales.", level: "C1" },
    ],
  },
  {
    slug: "saude",
    name: "Saúde",
    intro: "Termos de rotina clínica e hospitalar para congressos, pesquisa e atendimento internacional.",
    entries: [
      { term: "side effect", ipa: "/ˈsaɪd ɪˌfɛkt/", definition: "Efeito colateral de um medicamento ou tratamento.", example: "Nausea is a common side effect.", level: "B1" },
      { term: "follow-up appointment", ipa: "/ˈfɑːloʊ ʌp əˌpɔɪntmənt/", definition: "Consulta de retorno.", example: "Please book a follow-up appointment in two weeks.", level: "B1" },
      { term: "outpatient", ipa: "/ˈaʊtˌpeɪʃənt/", definition: "Paciente ambulatorial: atendido sem internação.", example: "She was treated as an outpatient.", level: "B2" },
      { term: "to discharge", ipa: "/dɪsˈtʃɑːrdʒ/", definition: "Dar alta a um paciente.", example: "He was discharged after two days.", level: "B2" },
      { term: "informed consent", ipa: "/ɪnˌfɔːrmd kənˈsɛnt/", definition: "Consentimento informado do paciente antes de um procedimento.", example: "We need the patient's informed consent first.", level: "B2" },
      { term: "shift handover", ipa: "/ʃɪft ˈhændˌoʊvər/", definition: "Passagem de plantão entre equipes.", example: "The shift handover takes fifteen minutes.", level: "B2" },
    ],
  },
];
