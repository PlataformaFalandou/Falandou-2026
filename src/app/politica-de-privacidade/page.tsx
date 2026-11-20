import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/ui/LegalLayout";
import { CookiePreferencesButton } from "@/components/ui/CookieBanner";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Política de Privacidade | Falandou",
  description:
    "Política de privacidade da Falandou: quais dados o site coleta, para que servem, cookies de medição com consentimento e como exercer os seus direitos.",
  alternates: { canonical: "/politica-de-privacidade/" },
};

// Arquitetura da Informação §1 / gap 1 (LGPD). Descreve o que o site faz de fato:
// cookies só com consentimento, storage local, WhatsApp e provedores.
// Revisar sempre que o site passar a coletar algo novo (ex.: formulário, e-mail).
export default function PoliticaDePrivacidadePage() {
  return (
    <LegalLayout eyebrow="LGPD" title="Política de Privacidade">
      <p>
        Esta política explica como a {COMPANY.brand} trata dados pessoais de quem visita o site{" "}
        {COMPANY.site.replace("https://", "")}, de acordo com a Lei Geral de Proteção de Dados (Lei nº
        13.709/2018 — LGPD).
      </p>

      <h2>1. Quem é o responsável pelos dados</h2>
      <p>
        O controlador dos dados é a <strong>{COMPANY.legalName}</strong> (“{COMPANY.brand}”). Para qualquer assunto sobre dados
        pessoais, escreva para <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>.
      </p>

      <h2>2. Quais dados tratamos</h2>
      <p><strong>a) Dados de navegação — só se você aceitar os cookies.</strong> Com o seu consentimento, o site carrega o Google Analytics 4 (Google) e o Meta Pixel (Meta), que registram páginas visitadas, cliques em botões (inclusive os que levam ao WhatsApp), profundidade de rolagem, tempo de permanência na página de planos, dados técnicos do dispositivo e do navegador, endereço IP e identificadores de cookies. Se você recusar, essas ferramentas não são carregadas.</p>
      <p><strong>b) Informações guardadas no seu navegador.</strong> Para o site funcionar, guardamos no próprio navegador: a sua escolha sobre cookies; a versão do título da página inicial exibida a você (usada para comparar mensagens); e, só durante a visita, a última página temática que você abriu (por exemplo, a de entrevista em inglês), usada para incluir o seu objetivo na mensagem de WhatsApp. A página temática é apagada quando você fecha a aba.</p>
      <p><strong>c) Dados que você nos envia.</strong> Os botões do site abrem o WhatsApp com uma mensagem pronta, que você pode editar antes de enviar. O que você enviar por lá ou por e-mail — nome, telefone, mensagens e, no programa de indicação, o nome de quem indicou você — é usado pela equipe para responder e apresentar os planos. O WhatsApp é um serviço da Meta, com política de privacidade própria.</p>
      <p>O site não tem formulários que armazenem dados e a {COMPANY.brand} não vende dados pessoais.</p>

      <h2>3. Para que usamos e com qual base legal</h2>
      <ul>
        <li><strong>Responder o seu contato e apresentar os planos</strong> — procedimentos preliminares a um contrato, a seu pedido (art. 7º, V, da LGPD).</li>
        <li><strong>Medir a audiência do site e exibir anúncios</strong> (Google Analytics e Meta Pixel) — consentimento (art. 7º, I), que você pode retirar a qualquer momento.</li>
        <li><strong>Guardar a sua escolha de cookies e o contexto da visita</strong> — legítimo interesse em manter o site funcionando (art. 7º, IX).</li>
        <li><strong>Cumprir obrigações legais</strong>, quando houver (art. 7º, II).</li>
      </ul>

      <h2>4. Com quem os dados são compartilhados</h2>
      <ul>
        <li><strong>Google</strong> — Google Analytics 4 (só com consentimento).</li>
        <li><strong>Meta</strong> — Meta Pixel (só com consentimento) e WhatsApp (quando você inicia a conversa).</li>
        <li><strong>Hostinger</strong> — hospedagem do site.</li>
        <li><strong>YouTube (Google)</strong> — só quando você dá play em um vídeo da página inicial; o player é carregado no modo de privacidade aprimorada (youtube-nocookie.com). Nos artigos e depoimentos, os vídeos abrem no próprio YouTube.</li>
      </ul>
      <p>Esses provedores podem tratar dados fora do Brasil. Nesses casos, a transferência internacional segue as hipóteses do art. 33 da LGPD.</p>

      <h2>5. Por quanto tempo guardamos</h2>
      <p>Os dados de navegação ficam pelo período de retenção configurado no Google Analytics e no Meta. As conversas de atendimento ficam pelo tempo necessário para responder você e, se você se tornar aluno, durante a relação com a escola e pelos prazos exigidos por lei.</p>

      <h2>6. Seus direitos</h2>
      <p>Pela LGPD (art. 18), você pode pedir a qualquer momento:</p>
      <ul>
        <li>confirmação de que tratamos seus dados e acesso a eles;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
        <li>portabilidade, eliminação dos dados tratados com consentimento e informação sobre com quem os compartilhamos;</li>
        <li>revogação do consentimento.</li>
      </ul>
      <p>
        Para exercer esses direitos, escreva para <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>.
        Respondemos nos prazos previstos na LGPD. Você também pode apresentar reclamação à Autoridade
        Nacional de Proteção de Dados (ANPD).
      </p>

      <h2>7. Cookies</h2>
      <p>
        Você escolhe no aviso de cookies se aceita a medição e a publicidade. Para mudar a escolha, use{" "}
        <CookiePreferencesButton className="text-[#FF6820] underline underline-offset-2" />. Também é
        possível apagar ou bloquear cookies nas configurações do seu navegador.
      </p>

      <h2>8. Segurança</h2>
      <p>O site é servido por conexão segura (HTTPS) e não guarda dados pessoais em formulários próprios. O acesso às conversas de atendimento é restrito à equipe.</p>

      <h2>9. Crianças e adolescentes</h2>
      <p>O site é voltado a profissionais adultos. Não coletamos intencionalmente dados de menores de 18 anos.</p>

      <h2>10. Alterações</h2>
      <p>
        Esta política pode ser atualizada. A data da última atualização aparece no topo da página. Veja
        também os <Link href="/termos">Termos de uso</Link>.
      </p>
    </LegalLayout>
  );
}
