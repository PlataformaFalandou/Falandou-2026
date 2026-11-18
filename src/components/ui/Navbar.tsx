"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getWhatsAppUrlForContext } from "@/lib/whatsapp";

const navLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Para quem é", href: "#para-quem" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 md:h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="font-display font-extrabold text-2xl tracking-tight"
            style={{ color: "#161616" }}
          >
            Falandou
            <span style={{ color: "#FF6820" }}>.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-body text-sm font-medium text-grafite/70 hover:text-laranja transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={getWhatsAppUrlForContext("hero")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#FF6820" }}
          >
            Falar com consultor
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-black/5 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block font-body text-base font-medium text-grafite py-2 hover:text-laranja transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={getWhatsAppUrlForContext("hero")}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 px-5 py-3 rounded-full text-sm font-semibold text-white text-center transition-all duration-200"
            style={{ backgroundColor: "#FF6820" }}
            onClick={() => setMenuOpen(false)}
          >
            Falar com consultor
          </a>
        </div>
      )}
    </header>
  );
}
