import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

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

const footerLinks = {
  Escola: [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Para quem é", href: "#para-quem" },
    { label: "Depoimentos", href: "#depoimentos" },
  ],
  Recursos: [
    { label: "Blog", href: "/blog" },
    { label: "Exame CEFR", href: "/blog/diferenca-cefr-niveis-ingles" },
    { label: "Plataforma do aluno", href: "https://falandou-hub-learn.lovable.app" },
  ],
  Contato: [
    { label: "WhatsApp", href: getWhatsAppUrlForContext("cta") },
    { label: "contato@falandou.com", href: "mailto:contato@falandou.com" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#161616" }} className="text-white">
      {/* Final CTA strip */}
      <div
        className="border-b border-white/5 py-12"
        style={{ background: "linear-gradient(135deg, rgba(255,104,32,0.12) 0%, transparent 50%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-1">
              Pronto para evoluir seu inglês?
            </h3>
            <p className="font-body text-white/50 text-sm">
              Fale com a gente — sem compromisso, sem taxa de consulta.
            </p>
          </div>
          <a
            href={getWhatsAppUrlForContext("cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
            style={{ backgroundColor: "#FF6820" }}
          >
            <MessageCircle size={18} />
            Quero começar
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="col-span-2">
          <Link href="/" className="inline-block mb-4">
            <span className="font-display font-extrabold text-2xl text-white tracking-tight">
              Falandou<span style={{ color: "#FF6820" }}>.</span>
            </span>
          </Link>
          <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs">
            Inglês profissional para quem precisa de resultado. Plano personalizado, professores especializados e acompanhamento ativo.
          </p>

          {/* Social */}
          <div className="flex gap-3 mt-6">
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
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-laranja hover:border-laranja transition-colors duration-200"
                style={{ "--laranja": "#FF6820" } as React.CSSProperties}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-display font-semibold text-sm text-white mb-4">{title}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-body text-sm text-white/50 hover:text-laranja transition-colors duration-200"
                    style={{ "--laranja": "#FF6820" } as React.CSSProperties}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} Falandou Escola de Inglês. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
