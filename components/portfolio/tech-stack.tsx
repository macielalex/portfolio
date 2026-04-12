"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Smartphone, BarChart3, Database } from "lucide-react";
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

function BadgeTooltip({ label, color }: { label: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  const tip = stackTooltips[label];

  return (
    <motion.span
      className={cn(
        "relative cursor-default rounded-full border px-3 py-1.5 font-mono text-xs font-medium transition-all",
        "hover:scale-105",
        color
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
              background: "#161622",
              border: "0.5px solid rgba(6,182,212,0.2)",
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
            <p style={{ color: "#06B6D4", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>
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
                background: "#161622",
                borderRight: "0.5px solid rgba(6,182,212,0.2)",
                borderBottom: "0.5px solid rgba(6,182,212,0.2)",
                transform: "translateX(-50%) rotate(45deg)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.span>
  );
}

const stackColors: Record<string, string> = {
  Flutter: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  Dart: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  React: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
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

function StackColumn({
  title,
  items,
  icon: Icon,
  delay,
}: {
  title: string;
  items: string[];
  icon: React.ElementType;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="overflow-visible rounded-2xl border border-border bg-card p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <BadgeTooltip
            key={item}
            label={item}
            color={stackColors[item] || "bg-muted text-muted-foreground border-border"}
          />
        ))}
      </div>
    </motion.div>
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

        <div className="grid gap-4 md:grid-cols-3">
          <StackColumn
            title={t.stack.mobile.title}
            items={t.stack.mobile.items}
            icon={Smartphone}
            delay={0.1}
          />
          <StackColumn
            title={t.stack.observability.title}
            items={t.stack.observability.items}
            icon={BarChart3}
            delay={0.2}
          />
          <StackColumn
            title={t.stack.enterprise.title}
            items={t.stack.enterprise.items}
            icon={Database}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
