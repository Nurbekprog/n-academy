"use client";

import React from "react";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "Haqida" },
  { href: "#projects", label: "Loyihalar" },
  { href: "#courses", label: "Kurslar" },
  { href: "#contact", label: "Aloqa" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)]"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-9 h-9 text-white rounded-xl bg-[#0A1A2F] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              N
            </div>
            <span className="font-semibold text-lg tracking-tight text-foreground">
              ACADEMY
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#courses"
              onClick={(e) => handleNavClick(e, "#courses")}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#0A1A2F] rounded-full hover:bg-[#0A1A2F]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#0A1A2F]/20"
            >
              Kursga yozilish
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-transform duration-300",
                mobileMenuOpen && "rotate-90",
              )}
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out bg-white/95 backdrop-blur-xl",
          mobileMenuOpen ? "max-h-80 border-t border-border" : "max-h-0",
        )}
      >
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#courses"
            onClick={(e) => handleNavClick(e, "#courses")}
            className="block w-full mt-4 px-4 py-3 text-center text-base font-medium text-white bg-[#0A1A2F] rounded-xl hover:bg-[#0A1A2F]/90 transition-colors"
          >
            Kursga yozilish
          </a>
        </div>
      </div>
    </nav>
  );
}
