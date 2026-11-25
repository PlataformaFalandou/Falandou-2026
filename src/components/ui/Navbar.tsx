"use client";

/**
 * Navbar — Arquitetura da Informação §2 + UX/UI §8.
 * Desktop: links por intenção (revisão de jornada §4) — Começar (Método e Planos, links diretos),
 * Conhecer a escola e Aprender (listas que abrem com clique ou teclado) — + botão "Quero começar".
 * Página atual: cor + traço sob o link (forma, não só cor) + aria-current (§7).
 * Celular:
 *  - header fixo mínimo (56px) com logo, botão "Começar" sempre visível e menu;
 *  - menu em gaveta da direita, com overlay escuro 50% (fecha ao tocar fora ou com Esc);
 *  - barra fixa no rodapé com 4 atalhos (Início, Planos, Professores, Falar), com safe area.
 * `solid`: grafite desde o topo, para páginas que começam com fundo claro.
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, CreditCard, GraduationCap, Home, Menu, MessageCircle, X } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/analytics";

type NavLink = { label: string; href: string; desc?: string };
type NavGroup = { id: string; title: string; links: NavLink[] };

// Arquitetura por intenção (revisão de jornada §4). A mesma estrutura serve ao menu do
// computador e à gaveta do celular.
const NAV_GROUPS: NavGroup[] = [
  {
    id: "comecar",
    title: "Começar",
    links: [
      { label: "Método", href: "/metodo", desc: "Como funciona o ciclo de 90 dias" },
      { label: "Planos", href: "/planos", desc: "Preços, ritmo e o que cada plano inclui" },
    ],
  },
  {
    id: "escola",
    title: "Conhecer a escola",
    links: [
      { label: "Professores", href: "/professores", desc: "Quem conduz as sessões" },
      { label: "Resultados", href: "/resultados", desc: "Evolução medida no exame CEFR" },
      { label: "Depoimentos", href: "/depoimentos", desc: "O que dizem os profissionais" },
      { label: "Sobre a Falandou", href: "/sobre", desc: "A escola e como ela trabalha" },
    ],
  },
  {
    id: "aprender",
    title: "Aprender",
    links: [
      { label: "Blog", href: "/blog", desc: "Artigos sobre inglês no trabalho" },
      { label: "Vocabulário profissional", href: "/vocabulario", desc: "Expressões por situação" },
    ],
  },
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
        backgroundColor: "rgba(20,20,20,0.96)",
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
                className="relative h-full flex flex-col items-center justify-center gap-1 text-[11px]"
                style={{ color: active ? LARANJA : "rgba(245,246,241,0.65)", fontWeight: active ? 800 : 600 }}
              >
                {/* Página atual também pela forma: traço no topo do atalho (§7) */}
                {active && <span aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full" style={{ backgroundColor: LARANJA }} />}
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
  // Menu aberto = aberto NESTA rota (revisão técnica §1.2): trocar de página fecha sozinho,
  // sem efeito que reajusta estado.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuOpen = openPath === pathname;
  const setMenuOpen = (open: boolean) => setOpenPath(open ? pathname : null);

  useEffect(() => {
    // Direção de movimento §5.1: depois de 24px, fundo e borda inferior aparecem (180ms)
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Foco (direção de movimento §5.2): ao abrir, vai para o painel; ao fechar, volta ao botão.
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelCloseRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (menuOpen) {
      panelCloseRef.current?.focus();
      wasOpen.current = true;
    } else if (wasOpen.current) {
      triggerRef.current?.focus();
      wasOpen.current = false;
    }
  }, [menuOpen]);

  // Passou para o layout desktop com o menu aberto: fecha (a gaveta só existe no celular).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpenPath(null);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Gaveta aberta = diálogo modal (revisão técnica §1.1):
  // - o resto da página fica inerte (Tab não alcança o conteúdo de trás);
  // - Tab e Shift+Tab circulam dentro do painel; Esc fecha;
  // - a rolagem do fundo trava e o valor anterior de overflow é restaurado.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = document.getElementById("menu-gaveta");
    const overlay = document.getElementById("menu-overlay");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const inerted: HTMLElement[] = [];
    Array.from(document.body.children).forEach((el) => {
      const node = el as HTMLElement;
      if (node === panel || node === overlay || node.tagName === "SCRIPT" || (panel && node.contains(panel))) return;
      if (!node.inert) {
        node.inert = true;
        inerted.push(node);
      }
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPath(null);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      inerted.forEach((n) => (n.inert = false));
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Listas do menu do computador: abertas nesta rota (trocar de página fecha).
  const [openGroup, setOpenGroup] = useState<{ id: string; path: string } | null>(null);
  const groupOpen = (id: string) => openGroup?.id === id && openGroup.path === pathname;
  const groupBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    if (!openGroup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      groupBtnRefs.current[openGroup.id]?.focus();
      setOpenGroup(null);
    };
    const onDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest("[data-nav-group]")) setOpenGroup(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [openGroup]);

  const filled = solid || scrolled;

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: filled ? "rgba(20,20,20,0.96)" : "rgba(20,20,20,0)",
          borderColor: filled ? "var(--color-border)" : "transparent",
          transition: "background-color var(--dur-base) ease-out, border-color var(--dur-base) ease-out",
        }}
      >
        <nav className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <span className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight text-white">
              Falandou
              <span style={{ color: LARANJA }}>.</span>
            </span>
          </Link>

          {/* Desktop nav — por intenção (§4) */}
          <ul className="hidden md:flex items-center gap-5 lg:gap-8">
            {NAV_GROUPS[0].links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className="nav-link text-base font-medium"
                    data-active={active || undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            {NAV_GROUPS.slice(1).map((g) => {
              const open = groupOpen(g.id);
              const hasActive = g.links.some((l) => isActive(pathname, l.href));
              const panelId = `menu-${g.id}`;
              return (
                <li
                  key={g.id}
                  className="relative"
                  data-nav-group
                  onBlur={(e) => {
                    if (open && !e.currentTarget.contains(e.relatedTarget as Node)) setOpenGroup(null);
                  }}
                >
                  <button
                    type="button"
                    ref={(el) => {
                      groupBtnRefs.current[g.id] = el;
                    }}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenGroup(open ? null : { id: g.id, path: pathname })}
                    className="nav-link inline-flex items-center gap-1 text-base font-medium"
                    data-active={hasActive || undefined}
                  >
                    {g.title}
                    {hasActive && <span className="sr-only"> (a página atual está aqui)</span>}
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-base) ease-out" }}
                    />
                  </button>
                  <div
                    id={panelId}
                    hidden={!open}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 rounded-2xl p-2 shadow-2xl confirm-in"
                    style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <ul>
                      {g.links.map((l) => {
                        const active = isActive(pathname, l.href);
                        return (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              aria-current={active ? "page" : undefined}
                              onClick={() => setOpenGroup(null)}
                              className="menu-item flex items-start gap-3 rounded-xl px-3 py-2.5"
                            >
                              <span className="dot mt-2 flex-shrink-0" aria-hidden="true" style={{ visibility: active ? "visible" : "hidden" }} />
                              <span>
                                <span className="block font-semibold" style={{ color: active ? LARANJA : "#F5F6F1" }}>
                                  {l.label}
                                  {active && <span className="ml-2 text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>você está aqui</span>}
                                </span>
                                {l.desc && (
                                  <span className="block text-sm" style={{ color: "var(--color-text-muted)" }}>
                                    {l.desc}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
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
              className="cta-primary cta-sm-mobile rounded-full"
            >
              <span className="lg:hidden">Começar</span>
              <span className="hidden lg:inline">Quero começar</span>
            </a>

            {/* Botão do menu: hambúrguer ↔ X com rotação de 45° (§5) */}
            <button
              type="button"
              className="md:hidden w-11 h-11 -mr-1 rounded-lg text-white flex items-center justify-center"
              ref={triggerRef}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-gaveta"
            >
              <span
                className="inline-flex"
                style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform var(--dur-base) ease-out" }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Gaveta do celular: entra da direita, overlay 50% (§8) */}
      <div
        id="menu-overlay"
        className={`md:hidden fixed inset-0 z-[55] ${menuOpen ? "" : "pointer-events-none"}`}
        style={{ backgroundColor: "rgba(0,0,0,0.5)", opacity: menuOpen ? 1 : 0, transition: "opacity var(--dur-fast) ease-out" }}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="menu-gaveta"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className="md:hidden fixed top-0 right-0 bottom-0 z-[56] w-[84%] max-w-sm flex flex-col"
        style={{
          backgroundColor: "var(--color-surface)",
          borderLeft: "1px solid var(--color-border)",
          // Painel entra com 16px de deslocamento + opacidade em 220ms (§5.2)
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "none" : "translateX(16px)",
          visibility: menuOpen ? "visible" : "hidden",
          transition: menuOpen
            ? "opacity 220ms var(--ease-enter), transform 220ms var(--ease-enter), visibility 0s"
            : "opacity var(--dur-fast) ease-in, transform var(--dur-fast) ease-in, visibility 0s var(--dur-fast)",
        }}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b" style={{ borderColor: "var(--color-border)" }}>
          <span className="font-display font-extrabold text-xl text-white">
            Menu<span style={{ color: LARANJA }}>.</span>
          </span>
          <button
            ref={panelCloseRef}
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="w-11 h-11 flex items-center justify-center text-white"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          {NAV_GROUPS.map((group, gi) => (
            <div key={group.id} className={gi > 0 ? "mt-3 pt-3 border-t" : ""} style={{ borderColor: "var(--color-border)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--color-text-muted)" }}>
                {group.title}
              </p>
              <ul>
                {group.links.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className="flex items-center gap-3 min-h-[48px] text-xl font-semibold"
                        style={{ color: active ? LARANJA : "#F5F6F1" }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                        {/* Página atual também em texto (§7) */}
                        {active && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                            <span className="dot" aria-hidden="true" />
                            você está aqui
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
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
