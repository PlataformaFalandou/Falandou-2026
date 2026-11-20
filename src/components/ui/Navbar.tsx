"use client";

/**
 * Navbar — Arquitetura da Informação §2 + UX/UI §8.
 * Desktop: até 4 links + botão "Quero começar"; transparente no topo e grafite depois de 80px.
 * Celular:
 *  - header fixo mínimo (56px) com logo, botão "Começar" sempre visível e menu;
 *  - menu em gaveta da direita, com overlay escuro 50% (fecha ao tocar fora ou com Esc);
 *  - barra fixa no rodapé com 4 atalhos (Início, Planos, Professores, Falar), com safe area.
 * `solid`: grafite desde o topo, para páginas que começam com fundo claro.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, GraduationCap, Home, Menu, MessageCircle, X } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

const navLinks = [
  { label: "Método", href: "/metodo" },
  { label: "Planos", href: "/planos" },
  { label: "Blog", href: "/blog" },
  { label: "Depoimentos", href: "/depoimentos" },
];

// Gaveta do celular: grupos separados por divisores.
const drawerGroups = [
  navLinks,
  [
    { label: "Professores", href: "/professores" },
    { label: "Resultados", href: "/resultados" },
    { label: "Sobre a Falandou", href: "/sobre" },
    { label: "Vocabulário profissional", href: "/vocabulario" },
  ],
];

const LARANJA = "#FF6820";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Barra fixa no rodapé do celular (§8): o polegar alcança naturalmente. */
function BottomNav({ pathname }: { pathname: string }) {
  const items = [
    { label: "Início", href: "/", Icon: Home },
    { label: "Planos", href: "/planos", Icon: CreditCard },
    { label: "Professores", href: "/professores", Icon: GraduationCap },
  ];
  return (
    <nav
      aria-label="Atalhos"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t"
      style={{
        backgroundColor: "rgba(15,15,15,0.96)",
        borderColor: "var(--color-border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="grid grid-cols-4 h-16">
        {items.map(({ label, href, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className="h-full flex flex-col items-center justify-center gap-1 text-[11px] font-semibold"
                style={{ color: active ? LARANJA : "rgba(245,246,241,0.65)" }}
              >
                <Icon size={20} aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
        <li>
          <a
            href={getWhatsAppUrlForContext("navbar")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("bottom-nav")}
            className="h-full flex flex-col items-center justify-center gap-1 text-[11px] font-bold"
            style={{ color: LARANJA }}
          >
            <MessageCircle size={20} aria-hidden="true" />
            Falar
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gaveta aberta: trava a rolagem do fundo e fecha com Esc.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    if (menuOpen) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const filled = solid || scrolled;

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          filled ? "shadow-lg border-b border-white/5" : ""
        }`}
        style={{ backgroundColor: filled ? "rgba(15,15,15,0.96)" : "transparent" }}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-24 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <span className="font-display font-extrabold text-2xl md:text-4xl tracking-tight text-white">
              Falandou
              <span style={{ color: LARANJA }}>.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className="link-hover text-base font-medium"
                    style={{ color: active ? LARANJA : "rgba(255,255,255,0.8)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* CTA sempre visível — no celular, versão curta */}
            <a
              href={getWhatsAppUrlForContext("navbar")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick("navbar")}
              className="cta-primary inline-flex items-center gap-2 px-4 md:px-6 h-10 md:h-12 rounded-full text-sm md:text-base font-semibold"
            >
              <span className="md:hidden">Começar</span>
              <span className="hidden md:inline">Quero começar</span>
            </a>

            {/* Botão do menu: hambúrguer ↔ X com rotação de 45° (§5) */}
            <button
              type="button"
              className="md:hidden w-11 h-11 -mr-1 rounded-lg text-white flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-gaveta"
            >
              <span
                className="inline-flex transition-transform duration-200 ease-in-out"
                style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Gaveta do celular: entra da direita, overlay 50% (§8) */}
      <div
        className={`md:hidden fixed inset-0 z-[55] transition-opacity duration-200 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="menu-gaveta"
        aria-label="Menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`md:hidden fixed top-0 right-0 bottom-0 z-[56] w-[84%] max-w-sm flex flex-col transition-transform duration-200 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "var(--color-surface)", borderLeft: "1px solid var(--color-border)" }}
      >
        <div className="h-14 px-4 flex items-center justify-between border-b" style={{ borderColor: "var(--color-border)" }}>
          <span className="font-display font-extrabold text-xl text-white">
            Menu<span style={{ color: LARANJA }}>.</span>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="w-11 h-11 flex items-center justify-center text-white"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          {drawerGroups.map((group, gi) => (
            <ul key={gi} className={gi > 0 ? "mt-3 pt-3 border-t" : ""} style={{ borderColor: "var(--color-border)" }}>
              {group.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="flex items-center min-h-[48px] text-xl font-semibold"
                      style={{ color: active ? LARANJA : "#F5F6F1" }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ))}
        </nav>
        <div className="p-5 border-t" style={{ borderColor: "var(--color-border)", paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}>
          <a
            href={getWhatsAppUrlForContext("navbar")}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary flex items-center justify-center gap-2 px-5 py-4 rounded-full text-base font-bold"
            onClick={() => setMenuOpen(false)}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Quero começar
          </a>
        </div>
      </aside>

      <BottomNav pathname={pathname} />
    </>
  );
}
