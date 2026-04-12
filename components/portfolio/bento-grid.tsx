"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useCounter } from "@/hooks/use-counter";
import { cn } from "@/lib/utils";
import { Briefcase, Shield, Rocket, Smartphone, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Tooltip icons ────────────────────────────────────────────────────────────

function LivesIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="9"  r="3"   fill="#06B6D4" />
      <circle cx="9"  cy="15" r="2.5" fill="#06B6D4" opacity="0.7" />
      <circle cx="23" cy="15" r="2.5" fill="#06B6D4" opacity="0.7" />
      <circle cx="5"  cy="22" r="2"   fill="#06B6D4" opacity="0.45" />
      <circle cx="27" cy="22" r="2"   fill="#06B6D4" opacity="0.45" />
    </svg>
  );
}

function RetentionIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polyline
        points="4,26 10,21 16,17 22,11 28,6"
        stroke="#06B6D4" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="28" cy="6" r="2.5" fill="#06B6D4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke="#06B6D4" strokeWidth="2" />
      <line x1="16" y1="16" x2="16" y2="9"  stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="16" x2="21" y2="16" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FlavorsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3"  y="8" width="11" height="16" rx="3" stroke="#06B6D4" strokeWidth="2" />
      <rect x="18" y="8" width="11" height="16" rx="3" stroke="#06B6D4" strokeWidth="2" />
    </svg>
  );
}

// ── StatCard with tooltip ────────────────────────────────────────────────────

interface TooltipData {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function StatCard({ children, tooltip }: { children: React.ReactNode; tooltip: TooltipData }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-default"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "50%",
              width: 220,
              background: "#161622",
              border: "0.5px solid rgba(6,182,212,0.2)",
              borderRadius: 10,
              padding: 12,
              zIndex: 50,
              pointerEvents: "none",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              {tooltip.icon}
            </div>
            <p style={{ color: "#06B6D4", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
              {tooltip.title}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: 11, lineHeight: 1.6 }}>
              {tooltip.text}
            </p>
            {/* Downward arrow */}
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
    </motion.div>
  );
}

const codeSnippet = `// Flavor Dependency Injection
abstract class FlavorConfig {
  static late FlavorConfig _instance;
  
  factory FlavorConfig() => _instance;
  
  static void initialize(FlavorConfig config) {
    _instance = config;
  }

  String get appName;
  String get apiBaseUrl;
  ThemeData get theme;
}

class FiiboConfig implements FlavorConfig {
  @override
  String get appName => 'Fiibo';
  
  @override
  String get apiBaseUrl => 'https://api.fiibo.com';
}`;

function BentoCard({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300",
        "hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(0,229,192,0.15)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function formatCompact(value: number): string {
  if (value >= 1000) return `${Math.floor(value / 1000)}k`;
  return value.toLocaleString();
}

function MetricCounter({ value, suffix = "", label, delay = 0 }: { value: number; suffix?: string; label: string; delay?: number }) {
  const { count, ref } = useCounter({ end: value, duration: 2000, delay });

  return (
    <div ref={ref} className="text-center">
      <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-2xl font-bold text-transparent tabular-nums md:text-3xl">
        {formatCompact(count)}{suffix}
      </span>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export function BentoGrid() {
  const { t } = useI18n();

  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {t.projects.title}
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Card 1 - Whitelabel Architect (wide) */}
          <BentoCard className="md:col-span-2" delay={0.1}>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Smartphone className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">
                {t.projects.whitelabel.title}
              </h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {t.projects.whitelabel.description}
            </p>

            {/* Code Block */}
            <div className="overflow-hidden rounded-lg border border-border bg-[#0d0d0d]">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  flavor_config.dart
                </span>
              </div>
              <pre className="overflow-x-auto p-4">
                <code className="font-mono text-xs leading-relaxed text-muted-foreground">
                  {codeSnippet.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="mr-4 select-none text-muted-foreground/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          line.includes("//") && "text-green-500/80",
                          line.includes("class") && "text-purple-400",
                          line.includes("abstract") && "text-purple-400",
                          line.includes("String") && "text-cyan-400",
                          line.includes("get") && "text-yellow-400",
                          line.includes("@override") && "text-orange-400"
                        )}
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </BentoCard>

          {/* Card 2 - Real Product Metrics (tall) */}
          <BentoCard className="md:row-span-2 overflow-visible" delay={0.2}>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">
                {t.projects.metrics.title}
              </h3>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <StatCard
                tooltip={{
                  icon: <LivesIcon />,
                  title: "O que significa?",
                  text: "O app é usado por mais de 80 mil beneficiários ativos — pessoas reais que dependem dele para acessar planos de saúde e benefícios corporativos.",
                }}
              >
                <MetricCounter value={80000} suffix="+" label={t.projects.metrics.lives} delay={0} />
              </StatCard>

              <StatCard
                tooltip={{
                  icon: <FlavorsIcon />,
                  title: "O que significa?",
                  text: "O mesmo app roda como 10 marcas diferentes — cada empresa cliente tem sua própria identidade visual e configuração, tudo a partir de um único código.",
                }}
              >
                <MetricCounter value={10} suffix="+" label={t.projects.metrics.flavors} delay={100} />
              </StatCard>

              <StatCard
                tooltip={{
                  icon: <RetentionIcon />,
                  title: "O que significa?",
                  text: "71% dos usuários voltam a usar o app todo mês. Na indústria, qualquer número acima de 40% já é considerado saudável.",
                }}
              >
                <MetricCounter value={71} suffix="%" label={t.projects.metrics.retention} delay={200} />
              </StatCard>

              <StatCard
                tooltip={{
                  icon: <ClockIcon />,
                  title: "O que significa?",
                  text: "Cada usuário passa em média 13 minutos por sessão — indicando que o app resolve tarefas reais, não só notificações rápidas.",
                }}
              >
                <div className="text-center">
                  <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                    13:24
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">{t.projects.metrics.engagement}</p>
                </div>
              </StatCard>
            </div>

            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="text-center font-mono text-xs text-muted-foreground">
                {t.projects.metrics.pipeline}
              </p>
            </div>

            <p className="mt-4 text-center text-xs italic text-muted-foreground/70">
              {t.projects.metrics.subtitle}
            </p>
          </BentoCard>

          {/* Card 3 - Business-Driven Developer */}
          <BentoCard delay={0.3}>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">
                {t.projects.business.title}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {t.projects.business.description}
            </p>
          </BentoCard>

          {/* Card 4 - Operational Excellence */}
          <BentoCard delay={0.4}>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">
                {t.projects.operational.title}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {t.projects.operational.description}
            </p>
          </BentoCard>

          {/* Card 5 - Own Products (wide) */}
          <BentoCard className="md:col-span-3" delay={0.5}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Rocket className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {t.projects.ownProducts.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">{t.projects.ownProducts.subtitle}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* PhoneMidiaEasy */}
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-mono text-sm font-semibold text-foreground">
                    {t.projects.ownProducts.phonemidia.name}
                  </h4>
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {t.projects.ownProducts.badge}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {t.projects.ownProducts.phonemidia.description}
                </p>
              </div>

              {/* RecorreFácil */}
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-mono text-sm font-semibold text-foreground">
                    {t.projects.ownProducts.recorre.name}
                  </h4>
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {t.projects.ownProducts.badge}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {t.projects.ownProducts.recorre.description}
                </p>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
