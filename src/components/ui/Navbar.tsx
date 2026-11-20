"use client";

/**
 * Navbar — Arquitetura da Informação §2.
 * - Até 4 links + botão "Quero começar" (laranja, isolado).
 * - Transparente no topo; grafite sólido depois de 80px de rolagem.
 * - `solid`: grafite desde o topo, para páginas que começam com fundo claro (blog).
 * - Mobile: menu em tela cheia sobre fundo escuro, sem submenus.
 * Sobre, Professores, Resultados e Plataforma do Aluno ficam no rodapé.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

const navLinks = [
  { label: "Método", href: "/metodo" },
  { label: "Planos", href: "/planos" },
  { label: "Blog", href: "/blog" },
  { label: "Depoimentos", href: "/depoimentos" },
];

const GRAFITE = "#161616";
const LARANJA = "#FF6820";

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu mobile aberto: trava a rolagem do fundo.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const filled = solid || scrolled || menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        filled ? "shadow-lg border-b border-white/5" : ""
      }`}
      style={{ backgroundColor: filled ? GRAFITE : "transparent" }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-white">
            Falandou
            <span style={{ color: LARANJA }}>.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-base font-medium transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA — botão, não link */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={getWhatsAppUrlForContext("navbar")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: LARANJA }}
          >
            Quero começar
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu — tela cheia, fundo escuro */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-20 bottom-0 px-6 pt-8 pb-10 flex flex-col"
          style={{ backgroundColor: GRAFITE }}
        >
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-display font-extrabold text-3xl text-white py-4 border-b border-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={getWhatsAppUrlForContext("navbar")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto block px-5 py-4 rounded-full text-base font-bold text-white text-center"
            style={{ backgroundColor: LARANJA }}
            onClick={() => setMenuOpen(false)}
          >
            Quero começar
          </a>
        </div>
      )}
    </header>
  );
}
