"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const stackTooltips: Record<string, string> = {
  Flutter:                "Framework da Google para apps mobile, web e desktop com uma única base de código.",
  Dart:                   "Linguagem otimizada para apps client-side, base do Flutter.",
  React:                  "Biblioteca JavaScript para construção de interfaces web declarativas.",
  "Node.js":              "Runtime JavaScript server-side para APIs e serviços backend.",
  TypeScript:             "JavaScript com tipagem estática — menos bugs, melhor experiência de desenvolvimento.",
  Prisma:                 "ORM moderno para Node.js/TypeScript com tipagem automática do banco.",
  Firebase:               "Plataforma do Google para auth, banco em tempo real e storage.",
  "Shorebird OTA":        "Atualização Over-the-Air para Flutter sem passar pela revisão da loja.",
  "Google Analytics 4":  "Plataforma de análise comportamental de usuários.",
  "Firebase Crashlytics": "Monitoramento de crashes em tempo real para apps mobile.",
  "New Relic":            "Observabilidade full-stack para monitorar performance e erros em produção.",
  "groundcover APM":      "Application Performance Monitoring baseado em eBPF para ambientes Kubernetes.",
  "Looker Studio":        "Ferramenta de BI do Google para dashboards e visualização de dados.",
  "SQL Server (T-SQL)":  "SGBD da Microsoft com suporte a procedimentos armazenados em T-SQL.",
  "Oracle (PL/SQL)":     "SGBD corporativo da Oracle com PL/SQL para lógica server-side.",
  ERP:                    "Sistema integrado de gestão empresarial para operações corporativas.",
  WMS:                    "Warehouse Management System — gestão de armazéns e logística.",
};

const HIGHLIGHT_ITEMS = new Set(["Flutter", "Dart"]);

const stackColors: Record<string, string> = {
  Flutter: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  Dart: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  React: "bg-primary/20 text-primary border-primary/30",
  "Node.js": "bg-green-500/20 text-green-400 border-green-500/30",
  TypeScript: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  Prisma: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  Firebase: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Shorebird OTA": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "Google Analytics 4": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Firebase Crashlytics": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "New Relic": "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  "groundcover APM": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Looker Studio": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "SQL Server (T-SQL)": "bg-red-500/20 text-red-400 border-red-500/30",
  "Oracle (PL/SQL)": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  ERP: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  WMS: "bg-lime-500/20 text-lime-400 border-lime-500/30",
};

function BadgeTooltip({
  label,
  color,
  size = "default",
  highlight = false,
}: {
  label: string;
  color: string;
  size?: "featured" | "compact" | "default";
  highlight?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const tip = stackTooltips[label];

  return (
    <motion.span
      className={cn(
        "relative cursor-default border font-mono font-medium transition-all hover:scale-105",
        size === "featured" && "rounded-lg px-4 py-2 text-sm",
        size === "compact" && "rounded-full px-2 py-1 text-[11px]",
        size === "default" && "rounded-full px-3 py-1.5 text-xs",
        highlight
          ? "border-primary/30 bg-primary/10 text-primary"
          : color || "border-border bg-muted text-muted-foreground"
      )}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {label}

      <AnimatePresence>
        {hovered && tip && (
          <motion.div
            initial={{ opacity: 0, y: 4, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: "50%",
              width: 200,
              background: "#292524",
              border: "0.5px solid rgba(196,87,42,0.2)",
              borderRadius: 10,
              padding: "10px 12px",
              zIndex: 50,
              pointerEvents: "none",
              textAlign: "center",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            <p style={{ color: "#C4572A", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>
              {label}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: 11, lineHeight: 1.6 }}>
              {tip}
            </p>
            <div
              style={{
                position: "absolute",
                bottom: -5,
                left: "50%",
                width: 8,
                height: 8,
                background: "#292524",
                borderRight: "0.5px solid rgba(196,87,42,0.2)",
                borderBottom: "0.5px solid rgba(196,87,42,0.2)",
                transform: "translateX(-50%) rotate(45deg)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.span>
  );
}

function BadgeList({
  items,
  size,
  featuredHighlights = false,
}: {
  items: string[];
  size: "featured" | "compact";
  featuredHighlights?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap", size === "featured" ? "gap-2.5" : "gap-1.5")}>
      {items.map((item) => (
        <BadgeTooltip
          key={item}
          label={item}
          size={size}
          highlight={featuredHighlights && HIGHLIGHT_ITEMS.has(item)}
          color={stackColors[item] || "bg-muted text-muted-foreground border-border"}
        />
      ))}
    </div>
  );
}

export function TechStack() {
  const { t } = useI18n();

  return (
    <section id="stack" className="relative px-6 py-24">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {t.stack.title}
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
          {/* Mobile — featured, spans 2 cols × 3 rows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-visible rounded-2xl border border-primary/20 bg-card p-8 md:col-span-2 md:row-span-3 md:p-10"
          >
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {t.stack.mobile.title}
            </h3>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">
              {t.stack.mobile.subtitle}
            </p>
            <BadgeList items={t.stack.mobile.items} size="featured" featuredHighlights />
          </motion.div>

          {/* Backend — compact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="overflow-visible rounded-xl border border-border bg-card/50 p-5"
          >
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {t.stack.backend.title}
            </h3>
            <p className="mb-3 text-xs text-muted-foreground/80">
              {t.stack.backend.subtitle}
            </p>
            <BadgeList items={t.stack.backend.items} size="compact" />
          </motion.div>

          {/* Observabilidade — compact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-visible rounded-xl border border-border bg-card/50 p-5"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {t.stack.observability.title}
            </h3>
            <BadgeList items={t.stack.observability.items} size="compact" />
          </motion.div>

          {/* Legado — compact, muted */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="overflow-visible rounded-xl border border-border/60 bg-secondary/20 p-5"
          >
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
              {t.stack.enterprise.title}
            </h3>
            <BadgeList items={t.stack.enterprise.items} size="compact" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
