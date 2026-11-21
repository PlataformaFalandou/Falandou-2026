import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { CookiePreferencesButton } from "@/components/ui/CookieBanner";
import { COMPANY } from "@/data/company";

// Social SVG icons (lucide-react doesn't include these)
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

// UX/UI §14: 4 colunas no desktop, 2 no celular — Falandou · Escola · Legal · Contato.
const footerLinks: Record<string, { label: string; href: string }[]> = {
  Escola: [
    { label: "Planos e valores", href: "/planos" },
    { label: "Professores", href: "/professores" },
    { label: "Método", href: "/metodo" },
    { label: "Resultados", href: "/resultados" },
    { label: "Depoimentos", href: "/depoimentos" },
    { label: "Perguntas frequentes", href: "/#faq" },
    { label: "Sobre a Falandou", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Vocabulário profissional", href: "/vocabulario" },
    { label: "Indique um colega", href: "/indique" },
    { label: "Para empresas", href: "/planos#empresas" },
    { label: "Plataforma do Aluno", href: COMPANY.platformUrl },
  ],
  Legal: [
    { label: "Termos de uso", href: "/termos" },
    { label: "Política de privacidade", href: "/politica-de-privacidade" },
    { label: "LGPD e seus dados", href: "/politica-de-privacidade" },
  ],
  Contato: [
    { label: "WhatsApp", href: getWhatsAppUrlForContext("cta") },
    { label: "contato@falandou.com", href: "mailto:contato@falandou.com" },
  ],
};

/**
 * `cta={false}` nas páginas que já terminam com um fechamento laranja (CTASection/MidCTA):
 * uma única conclusão por página (revisão visual §5.3).
 */
export default function Footer({ cta = true }: { cta?: boolean } = {}) {
  return (
    <footer style={{ backgroundColor: "var(--color-bg)" }} className="text-white border-t border-white/5">
      {/* Faixa de CTA acima do rodapé: última chance antes de sair (§14) */}
      {cta && (
      <div
        className="border-b border-white/5 py-12"
        style={{ background: "linear-gradient(135deg, rgba(255,104,32,0.14) 0%, transparent 55%)" }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="font-display font-extrabold text-2xl md:text-3xl text-white mb-1">
              Comece a sua jornada CEFR.
            </p>
            <p className="text-sm" style={{ color: "rgba(245,246,241,0.6)" }}>
              Em 90 dias você tem o resultado medido no exame CEFR. A equipe responde em até 1h.
            </p>
          </div>
          <a
            href={getWhatsAppUrlForContext("cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary self-start md:self-auto inline-flex items-center justify-center gap-2 min-w-[220px] px-7 py-4 rounded-full text-base font-bold flex-shrink-0"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Quero começar
          </a>
        </div>
      </div>
      )}

      {/* Colunas */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* Falandou: logo + tagline + redes */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-4">
            <span className="font-display font-extrabold text-2xl text-white tracking-tight">
              Falandou<span style={{ color: "#FF6820" }}>.</span>
            </span>
          </Link>
          <p className="text-base leading-6 max-w-xs" style={{ color: "rgba(245,246,241,0.6)" }}>
            Inglês profissional, 1 a 1, com resultado medido no exame CEFR.
          </p>
          <div className="flex gap-2 mt-6">
            {[
              { Icon: InstagramIcon, href: "https://instagram.com/falandou", label: "Instagram" },
              { Icon: YoutubeIcon, href: "https://youtube.com/@falandou", label: "YouTube" },
              { Icon: LinkedinIcon, href: "https://linkedin.com/company/falandou", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-laranja hover:border-laranja transition-colors duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <p className="font-display font-semibold text-sm text-white mb-4">{title}</p>
            <ul className="space-y-1">
              {links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="link-hover inline-flex items-center min-h-[36px] text-sm"
                      style={{ color: "rgba(245,246,241,0.65)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              {title === "Legal" && (
                <li>
                  <CookiePreferencesButton className="link-hover inline-flex items-center min-h-[36px] text-sm text-left text-[rgba(245,246,241,0.65)]" />
                </li>
              )}
            </ul>
            {title === "Contato" && (
              <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(245,246,241,0.5)" }}>
                Atendimento pelo WhatsApp e por e-mail. Resposta em até 1h.
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Rodapé */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: "rgba(245,246,241,0.45)" }}>
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {COMPANY.legalName}. Todos os direitos reservados.
          </p>
          <p>Escola de inglês online · Brasil</p>
        </div>
      </div>
    </footer>
  );
}
