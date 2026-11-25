/**
 * Assinatura de conclusão (direção §4.3): três pontos convergem para o ponto da marca e
 * aparece "Situação concluída". 500ms, uma única vez, sem bloquear o próximo botão.
 * Com movimento reduzido: ícone e texto estáticos (mesmo resultado).
 * Uso exclusivo para conclusão de atividade — nunca como confirmação de envio.
 */
export default function CompletionMark({ label = "Situação concluída" }: { label?: string }) {
  return (
    <p className="completion-mark inline-flex items-center gap-3 font-display font-bold text-white" role="status">
      <span className="relative inline-block w-6 h-6" aria-hidden="true">
        <span className="completion-dot completion-dot-1" />
        <span className="completion-dot completion-dot-2" />
        <span className="completion-dot completion-dot-3" />
        <span className="completion-dot completion-dot-main" />
      </span>
      <span className="completion-text">{label}</span>
    </p>
  );
}
