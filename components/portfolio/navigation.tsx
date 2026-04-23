"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Logo = () => (
  <div className="flex items-center gap-3">
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#0d1117"/>
      <path d="M13 50 L32 14 L51 50" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="20" y1="37" x2="44" y2="37" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
    <span className="font-mono text-sm font-semibold tracking-tight">
      <span className="text-white">Alex</span>
      <span style={{ color: "#06B6D4" }}>Maciel</span>
    </span>
  </div>
);

const navLinkClass =
  "relative text-sm text-muted-foreground transition-colors hover:text-primary after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full";

export function Navigation() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#projects",   label: t.nav.projects },
    { href: "#stack",      label: t.nav.stack },
    { href: "#experience", label: t.nav.experience },
    { href: "#education",  label: t.nav.education },
    { href: "#contact",    label: t.nav.contact },
  ];

  const LocaleSwitcher = () => (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/50 p-1">
      <button
        onClick={() => setLocale("pt")}
        className={cn(
          "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
          locale === "pt" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        PT
      </button>
      <button
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
          locale === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={navLinkClass}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LocaleSwitcher />

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/50 md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-4 bg-foreground origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-px w-4 bg-foreground"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-4 bg-foreground origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
