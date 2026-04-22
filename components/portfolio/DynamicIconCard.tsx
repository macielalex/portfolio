"use client";

import { motion } from "framer-motion";
import { Apple, Cable, Github, Smartphone, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const GITHUB_URL = "https://github.com/macielalex/dynamic_app_icon";

const METHOD_CHANNEL_SNIPPET = `// Flutter ↔ Native (Kotlin / Swift)
class DynamicAppIcon {
  static const MethodChannel _channel =
      MethodChannel('dynamic_app_icon');

  static Future<void> setAlternateIcon(String name) async {
    await _channel.invokeMethod<void>('setAlternateIcon', {
      'name': name,
    });
  }
}`;

export type DynamicIconCardLabels = {
  title: string;
  badge: string;
  description: string;
  deepDiveLabel: string;
  android: string;
  ios: string;
  bridge: string;
  githubLabel: string;
  githubAriaLabel: string;
};

export type DynamicIconCardProps = {
  delay?: number;
  className?: string;
  labels?: Partial<DynamicIconCardLabels>;
};

export function DynamicIconCard({ delay = 0, className, labels }: DynamicIconCardProps) {
  const { t } = useI18n();
  const base = t.projects.dynamicAppIcon;
  const copy: DynamicIconCardLabels = { ...base, ...labels };

  const titleId = "dynamic-app-icon-card-title";

  return (
    <motion.article
      id="dynamic-app-icon"
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300",
        "hover:border-[#00e5c0]/45 hover:shadow-[0_0_36px_-6px_rgba(0,229,192,0.28)]",
        "focus-within:border-[#00e5c0]/45 focus-within:shadow-[0_0_36px_-6px_rgba(0,229,192,0.22)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        aria-hidden
      >
        <pre
          className="absolute -right-4 top-1/2 max-h-[min(100%,220px)] w-[min(100%,420px)] -translate-y-1/2 overflow-hidden p-4 font-mono text-[10px] leading-relaxed text-primary opacity-[0.06] sm:text-[11px] md:opacity-[0.08]"
        >
          <code>{METHOD_CHANNEL_SNIPPET}</code>
        </pre>
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
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
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
            {copy.deepDiveLabel}
          </p>
          <ul
            className="flex flex-wrap gap-2"
            aria-label={copy.deepDiveLabel}
          >
            <li>
              <Badge
                variant="outline"
                className="gap-1.5 border-border bg-secondary/40 py-1 pl-2 pr-2.5 text-xs font-normal text-foreground"
              >
                <Smartphone className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span>{copy.android}</span>
              </Badge>
            </li>
            <li>
              <Badge
                variant="outline"
                className="gap-1.5 border-border bg-secondary/40 py-1 pl-2 pr-2.5 text-xs font-normal text-foreground"
              >
                <Apple className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span>{copy.ios}</span>
              </Badge>
            </li>
            <li>
              <Badge
                variant="outline"
                className="gap-1.5 border-border bg-secondary/40 py-1 pl-2 pr-2.5 text-xs font-normal text-foreground"
              >
                <Cable className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span>{copy.bridge}</span>
              </Badge>
            </li>
          </ul>
        </div>

        <div className="pt-1">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.githubAriaLabel}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/30 px-4 py-2.5 text-sm font-medium text-foreground transition-colors",
              "hover:border-[#00e5c0]/35 hover:bg-secondary/50 hover:text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5c0]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
