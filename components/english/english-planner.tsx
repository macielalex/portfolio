"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EnglishTab, geminiPrompts, phases } from "@/lib/english-plan-data";
import { SecondaryNavigation } from "@/components/portfolio/secondary-navigation";
import { useLocalStorage } from "./use-local-storage";

type LocalMap = Record<string, boolean>;

export function EnglishPlanner() {
  const [activePhase, setActivePhase] = useLocalStorage<number>("eng_activePhase", 0);
  const [activeTab, setActiveTab] = useLocalStorage<EnglishTab>("eng_activeTab", "plano");
  const [expandedMonths, setExpandedMonths] = useLocalStorage<LocalMap>("eng_expandedMonths", {});
  const [completedWeeks, setCompletedWeeks] = useLocalStorage<LocalMap>("eng_completedWeeks", {});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [targetEvalIndex, setTargetEvalIndex] = useState<number | null>(null);
  const evalRefs = useRef<Array<HTMLElement | null>>([]);

  const phase = phases[activePhase] ?? phases[0];

  const toggleMonth = (key: string) => setExpandedMonths((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleWeek = (key: string) => setCompletedWeeks((prev) => ({ ...prev, [key]: !prev[key] }));

  const copyPrompt = (text: string, i: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const getEvalIndexForWeek = (monthIndex: number, weekIndex: number) => {
    let index = -1;
    for (let mi = 0; mi <= monthIndex; mi += 1) {
      const weeks = phase.months[mi]?.weeks ?? [];
      const stopAt = mi === monthIndex ? weekIndex : weeks.length - 1;
      for (let wi = 0; wi <= stopAt; wi += 1) {
        if (weeks[wi]?.isEval) {
          index += 1;
        }
      }
    }
    return index;
  };

  useEffect(() => {
    if (activeTab !== "avaliacao" || targetEvalIndex === null) {
      return;
    }
    const el = evalRefs.current[targetEvalIndex];
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTargetEvalIndex(null);
  }, [activeTab, targetEvalIndex, activePhase]);

  return (
    <main className="min-h-screen bg-background px-4 pb-10 pt-24 text-foreground">
      <SecondaryNavigation />
      <div className="mx-auto max-w-5xl">
        <Card className="mb-6 border-border bg-card">
          <CardHeader className="pb-1">
            <p className="font-mono text-xs tracking-widest text-muted-foreground">PLANO COMPLETO</p>
            <CardTitle className="text-2xl">A1/A2 - C1</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Sem curso presencial - 20-30 min/dia - Android</CardContent>
        </Card>

        <section className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {phases.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePhase(i);
                setActiveTab("plano");
                setExpandedMonths({});
              }}
              className="min-w-44 rounded-lg border p-3 text-left transition-colors"
              style={{
                borderColor: activePhase === i ? p.color : "var(--color-border)",
                background: activePhase === i ? p.bg : "var(--color-card)",
                color: activePhase === i ? p.color : "var(--color-muted-foreground)",
              }}
            >
              <p className="font-mono text-xs font-bold tracking-wide">{p.label}</p>
              <p className="text-xs opacity-80">{p.sublabel}</p>
              <p className="text-[11px] opacity-70">{p.duration}</p>
            </button>
          ))}
        </section>

        <section className="mb-6 grid grid-cols-4 border-b border-border">
          {(["plano", "recursos", "avaliação", "gemini"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab === "avaliação" ? "avaliacao" : tab)}
              className="border-b-2 py-2 font-mono text-xs uppercase tracking-wide transition-colors"
              style={{
                borderBottomColor:
                  activeTab === (tab === "avaliação" ? "avaliacao" : tab) ? phase.color : "transparent",
                color:
                  activeTab === (tab === "avaliação" ? "avaliacao" : tab) ? phase.color : "var(--color-muted-foreground)",
              }}
            >
              {tab}
            </button>
          ))}
        </section>

        {activeTab === "plano" && (
          <section className="space-y-3">
            {phase.months.length === 0 && <EmptyPhaseState />}
            {phase.months.map((month, mi) => {
              const mKey = `${activePhase}-${mi}`;
              const isOpen = expandedMonths[mKey] !== false;
              return (
                <Card key={month.title} className="gap-0 py-0">
                  <button onClick={() => toggleMonth(mKey)} className="flex w-full items-center justify-between px-6 py-4 text-left">
                    <span className="font-semibold">{month.title}</span>
                    <span style={{ color: phase.color }}>{isOpen ? "-" : "+"}</span>
                  </button>

                  {isOpen && (
                    <CardContent className="space-y-2 pb-4">
                      {month.weeks.map((week, wi) => {
                        const wKey = `${activePhase}-${mi}-${wi}`;
                        const isDone = completedWeeks[wKey];
                        const evalIndex = week.isEval ? getEvalIndexForWeek(mi, wi) : -1;
                        return (
                          <div
                            key={week.week}
                            className={cn(
                              "rounded-md border border-border bg-background p-3",
                              isDone && "border-primary/50 bg-primary/5",
                            )}
                          >
                            <div className="mb-2 flex items-start justify-between gap-2">
                              <div>
                                <p className="font-mono text-xs tracking-wide" style={{ color: phase.color }}>
                                  {week.week}
                                </p>
                                <p className="text-sm font-semibold">{week.focus}</p>
                              </div>
                              {!week.isEval && (
                                <button
                                  onClick={() => toggleWeek(wKey)}
                                  className="h-7 w-7 rounded-full border text-[10px] font-medium"
                                  style={{
                                    borderColor: phase.color,
                                    color: isDone ? "var(--color-background)" : phase.color,
                                    background: isDone ? phase.color : "transparent",
                                  }}
                                >
                                  {isDone ? "OK" : ""}
                                </button>
                              )}
                            </div>

                            {week.isEval ? (
                              <button
                                onClick={() => {
                                  if (evalIndex < 0) return;
                                  setTargetEvalIndex(evalIndex);
                                  setActiveTab("avaliacao");
                                }}
                                className="w-full rounded-md border border-amber-500/30 bg-amber-500/10 p-2 text-left text-xs text-amber-300 transition-colors hover:bg-amber-500/20"
                              >
                                Ir para detalhes desta avaliação na aba avaliação.
                              </button>
                            ) : (
                              <>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  {week.daily.map((item) => (
                                    <p key={item}>{item}</p>
                                  ))}
                                </div>
                                {week.meta && <p className="mt-2 text-xs text-muted-foreground">META: {week.meta}</p>}
                                {week.tip && <p className="mt-1 text-xs italic text-muted-foreground">Dica: {week.tip}</p>}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </section>
        )}

        {activeTab === "recursos" && (
          <section className="space-y-2">
            {phase.resources.length === 0 && <EmptyPhaseState />}
            {phase.resources.map((resource) => (
              <Card key={resource.name} className="gap-2">
                <CardHeader>
                  <CardTitle className="text-sm">{resource.icon} {resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-sm text-muted-foreground">{resource.desc}</p>
                  <p className="font-mono text-xs text-primary">{resource.link}</p>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {activeTab === "avaliacao" && (
          <section className="space-y-3">
            {phase.evals.length === 0 && <EmptyPhaseState />}
            {phase.evals.map((evaluation) => (
              <article
                key={evaluation.title}
                className="scroll-mt-24"
                ref={(el) => {
                  const index = phase.evals.findIndex((item) => item.title === evaluation.title);
                  evalRefs.current[index] = el;
                }}
              >
                <Card className="gap-3">
                  <CardHeader>
                    <CardTitle className="text-sm">{evaluation.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {evaluation.tasks.map((task) => (
                      <div key={task.label}>
                        <p className="font-mono text-xs tracking-wide text-primary">{task.label}</p>
                        <p className="text-sm text-muted-foreground">{task.desc}</p>
                      </div>
                    ))}
                    <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs">
                      PASSA SE: {evaluation.pass}
                    </p>
                    <p className="rounded-md border border-rose-500/30 bg-rose-500/10 p-2 text-xs">
                      NÃO PASSOU: {evaluation.fail}
                    </p>
                  </CardContent>
                </Card>
              </article>
            ))}
          </section>
        )}

        {activeTab === "gemini" && (
          <section className="space-y-2">
            {geminiPrompts.map((item, i) => (
              <Card key={`${item.phase}-${item.situation}`} className="gap-2">
                <CardHeader className="grid grid-cols-[1fr_auto] items-center gap-2">
                  <div>
                    <p className="font-mono text-xs tracking-wide text-muted-foreground">{item.phase.toUpperCase()}</p>
                    <CardTitle className="text-sm">{item.situation}</CardTitle>
                  </div>
                  <button onClick={() => copyPrompt(item.prompt, i)} className="rounded-md border border-border px-3 py-1 text-xs">
                    {copiedIndex === i ? "Copiado" : "Copiar"}
                  </button>
                </CardHeader>
                <CardContent>
                  <p className="rounded-md bg-background p-3 text-sm text-muted-foreground">{item.prompt}</p>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

function EmptyPhaseState() {
  return (
    <Card>
      <CardContent className="pt-6 text-sm text-muted-foreground">Conteúdo desta fase será preenchido na próxima etapa.</CardContent>
    </Card>
  );
}
