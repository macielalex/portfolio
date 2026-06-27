"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Smartphone, WifiOff, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const GITHUB_URL = "https://github.com/macielalex/scoreboard";
const LIVE_URL = "https://euphonious-meringue-41868f.netlify.app/";

const GESTURE_SNIPPET = `// Toque +1, arrastar ↓ −1
panel.addEventListener('pointerdown', onPressStart);
panel.addEventListener('pointerup', onPressEnd);

function addPoint(team) {
  state[team]++;
  saveToLocalStorage(state);
  checkMatchEnd();
}`;

export function ScoreboardCard({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  const { t } = useI18n();
  const copy = t.projects.scoreboard;
  const titleId = "scoreboard-card-title";

  return (
    <motion.article
      id="scoreboard"
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
          <code>{GESTURE_SNIPPET}</code>
        </pre>
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-4 w-4 text-primary" aria-hidden />
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
          </div>
        </header>

        <div>
          <p className="mb-2 text-sm text-muted-foreground">{copy.deepDiveLabel}</p>
          <ul className="flex flex-wrap gap-2" aria-label={copy.deepDiveLabel}>
            <li>
              <Badge
                variant="outline"
                className="gap-1.5 border-border bg-secondary/40 py-1 pl-2 pr-2.5 text-xs font-normal text-foreground"
              >
                <Smartphone className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span>{copy.pwa}</span>
              </Badge>
            </li>
            <li>
              <Badge
                variant="outline"
                className="gap-1.5 border-border bg-secondary/40 py-1 pl-2 pr-2.5 text-xs font-normal text-foreground"
              >
                <WifiOff className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span>{copy.offline}</span>
              </Badge>
            </li>
            <li>
              <Badge
                variant="outline"
                className="gap-1.5 border-border bg-secondary/40 py-1 pl-2 pr-2.5 text-xs font-normal text-foreground"
              >
                <span>{copy.stack}</span>
              </Badge>
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.liveAriaLabel}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm font-medium text-foreground transition-colors",
              "hover:border-primary/35 hover:bg-secondary/50 hover:text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "sm:w-auto sm:justify-start"
            )}
          >
            <ExternalLink className="size-4 shrink-0" aria-hidden />
            <span>{copy.liveLabel}</span>
          </a>
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
        </div>
      </div>
    </motion.article>
  );
}
