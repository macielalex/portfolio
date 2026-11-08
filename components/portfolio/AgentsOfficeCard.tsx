"use client";

import { motion } from "framer-motion";
import { Bot, FlaskConical, Github, Landmark, Scale, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const GITHUB_URL = "https://github.com/macielalex/escritorio-pessoal";

const RULES_SNIPPET = `// regras do escritório
forbidden: [
  "pagamento", "transferência",
  "contratar crédito",
  "excluir e-mail", "responder e-mail",
]

// cada agente é dono de um campo
write(field, value, { ifVersion: read.version })`;

const chipClass =
  "gap-1.5 border-border bg-secondary/40 py-1 pl-2 pr-2.5 text-xs font-normal text-foreground";

export function AgentsOfficeCard({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  const { t } = useI18n();
  const copy = t.projects.agentsOffice;
  const titleId = "agents-office-card-title";

  return (
    <motion.article
      id="escritorio-pessoal"
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300",
        "hover:border-primary/40 hover:shadow-[0_4px_24px_-4px_rgba(196,87,42,0.15)]",
        "focus-within:border-primary/40 focus-within:shadow-[0_4px_24px_-4px_rgba(196,87,42,0.1)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        aria-hidden
      >
        <pre className="absolute -right-4 top-1/2 max-h-[min(100%,220px)] w-[min(100%,420px)] -translate-y-1/2 overflow-hidden p-4 font-mono text-[10px] leading-relaxed text-primary opacity-[0.06] sm:text-[11px] md:opacity-[0.08]">
          <code>{RULES_SNIPPET}</code>
        </pre>
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <header className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-4 w-4 text-primary" aria-hidden />
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 id={titleId} className="text-base font-semibold tracking-tight text-foreground">
                {copy.title}
              </h3>
              <Badge
                variant="outline"
                className="border-primary/25 bg-primary/5 text-[10px] font-medium uppercase tracking-wide text-primary"
              >
                {copy.badge}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{copy.description}</p>
          </div>
        </header>

        <p className="flex items-start gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <span>
            <span className="font-medium text-foreground">{copy.rulesLabel}</span> {copy.rules}
          </span>
        </p>

        <div>
          <p className="mb-2 text-sm text-muted-foreground">{copy.deepDiveLabel}</p>
          <ul className="flex flex-wrap gap-2" aria-label={copy.deepDiveLabel}>
            <li>
              <Badge variant="outline" className={chipClass}>
                <Landmark className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span>{copy.openFinance}</span>
              </Badge>
            </li>
            <li>
              <Badge variant="outline" className={chipClass}>
                <Scale className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span>{copy.models}</span>
              </Badge>
            </li>
            <li>
              <Badge variant="outline" className={chipClass}>
                <FlaskConical className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span>{copy.tests}</span>
              </Badge>
            </li>
            <li>
              <Badge variant="outline" className={chipClass}>
                <span>{copy.ci}</span>
              </Badge>
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.githubAriaLabel}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm font-medium text-foreground transition-colors",
              "hover:border-primary/35 hover:bg-secondary/50 hover:text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "sm:w-auto sm:justify-start"
            )}
          >
            <Github className="size-4 shrink-0" aria-hidden />
            <span>{copy.githubLabel}</span>
          </a>
          <span className="text-xs text-muted-foreground/70">{copy.dataNote}</span>
        </div>
      </div>
    </motion.article>
  );
}
