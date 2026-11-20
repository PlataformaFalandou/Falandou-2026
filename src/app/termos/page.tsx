import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/ui/LegalLayout";
import { COMPANY } from "@/data/company";
import { PAUSE_RULE, PLAN_TERMS, RESCHEDULE_RULE } from "@/data/plans";

export const metadata: Metadata = {
  title: "Termos de Uso | Falandou",
  description: "Condições de uso do site da Falandou.",
  alternates: { canonical: "https://2026.falandou.com/termos" },
};

// Arquitetura da Informação §1 / gap 1. Escopo decidido: só o uso do site —
// regras comerciais (pagamento, cancelamento, reembolso) ficam no contrato do aluno.
export default function TermosPage() {
  return (
    <LegalLayout eyebrow="Termos" title="Termos de Uso do Site">
      <p>
        Estes termos regem o uso do site {COMPANY.site.replace("https://", "")}, mantido pela{" "}
        <strong>{COMPANY.legalName}</strong> (“{COMPANY.brand}”).
        Ao navegar pelo site, você concorda com eles.
      </p>

      <h2>1. Sobre o site</h2>
      <p>O site apresenta a escola, o método e os planos da {COMPANY.brand}. A contratação de um plano não acontece pelo site: ela é feita com a equipe, por meio de contrato próprio, que traz as condições de pagamento, cancelamento, reagendamento e demais regras comerciais.</p>

      <h2>2. Preços, planos e resultados</h2>
      <p>Valores, planos e condições exibidos no site podem mudar sem aviso prévio. Em caso de diferença, valem as condições informadas pela equipe e registradas no contrato.</p>
      <p><strong>Resumo das regras dos planos</strong> (o contrato traz a versão completa): {PLAN_TERMS} {RESCHEDULE_RULE} {PAUSE_RULE}</p>
      <p>Os números de resultado publicados (por exemplo, a porcentagem de profissionais que subiram de nível CEFR) referem-se a ciclos já concluídos e à metodologia descrita em <Link href="/resultados">Resultados</Link>. Eles não são garantia de resultado individual, que depende do ponto de partida, da frequência e da dedicação de cada pessoa.</p>

      <h2>3. Programa de indicação</h2>
      <p>No <Link href="/indique">programa de indicação</Link>, quando um profissional indicado fecha um plano, quem indicou e quem foi indicado recebem 4 sessões individuais bônus cada. As sessões são liberadas depois que o plano do indicado é fechado. A confirmação da indicação e a liberação das sessões são feitas pela equipe.</p>

      <h2>4. Conteúdo e propriedade intelectual</h2>
      <p>Textos, imagens, vídeos, a marca {COMPANY.brand} e os materiais gratuitos (como o Roteiro de 30 dias) pertencem à {COMPANY.brand} ou são usados com autorização. Você pode usá-los para estudo pessoal. Não é permitido copiar, revender ou redistribuir esse conteúdo com fins comerciais sem autorização por escrito.</p>
      <p>Os logotipos de empresas exibidos no site identificam onde trabalham profissionais que estudaram na escola. Eles não indicam parceria, patrocínio ou endosso dessas empresas.</p>

      <h2>5. Links e serviços de terceiros</h2>
      <p>O site tem links para serviços de terceiros, como WhatsApp, YouTube e testes de nível de outras instituições. Esses serviços têm termos e políticas próprios, e a {COMPANY.brand} não responde pelo conteúdo ou pela disponibilidade deles.</p>

      <h2>6. Uso adequado</h2>
      <p>Você se compromete a não usar o site para fins ilícitos, não tentar acessar áreas restritas, não interferir no seu funcionamento e não enviar conteúdo ofensivo ou enganoso pelos canais de contato.</p>

      <h2>7. Disponibilidade</h2>
      <p>Buscamos manter o site disponível e com informações corretas, mas ele pode passar por interrupções, atualizações ou conter imprecisões, que serão corrigidas assim que identificadas.</p>

      <h2>8. Privacidade</h2>
      <p>O tratamento de dados pessoais está descrito na <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</p>

      <h2>9. Alterações e legislação</h2>
      <p>Estes termos podem ser atualizados, e a data da última atualização aparece no topo da página. Eles são regidos pelas leis brasileiras. Fica eleito o foro do domicílio do usuário, conforme o Código de Defesa do Consumidor.</p>

      <h2>10. Contato</h2>
      <p>Dúvidas sobre estes termos: <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>.</p>
    </LegalLayout>
  );
}
