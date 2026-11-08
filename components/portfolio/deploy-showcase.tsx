"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

// Roteiro do terminal: cada linha entra depois da anterior; a última "liga" o navegador e o celular.
const terminalLines = [
  { text: "$ git push origin main", tone: "command" },
  { text: "✓ lint · typecheck", tone: "ok" },
  { text: "✓ tests passed", tone: "ok" },
  { text: "✓ migrate database", tone: "ok" },
  { text: "✓ build web · build app", tone: "ok" },
  { text: "→ deployed to production", tone: "done" },
] as const;

const LINE_DELAY_MS = 380;
const START_DELAY_MS = 700;

const layerShadow =
  "shadow-[0_1px_1px_rgba(0,0,0,0.25),0_8px_16px_-4px_rgba(0,0,0,0.35),0_24px_48px_-12px_rgba(0,0,0,0.5)]";

export function DeployShowcase({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  // No celular a cena fica abaixo da dobra: só começa o deploy quando aparece.
  const inView = useInView(sceneRef, { once: true, amount: 0.5 });
  const [step, setStep] = useState(0);
  const live = reduceMotion || step >= terminalLines.length;
  const visibleLines = reduceMotion ? terminalLines.length : step;

  useEffect(() => {
    if (reduceMotion || !inView || step >= terminalLines.length) return;
    const timer = setTimeout(
      () => setStep((current) => current + 1),
      step === 0 ? START_DELAY_MS : LINE_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, [reduceMotion, inView, step]);

  // Inclinação seguindo o ponteiro (só mouse; toque não gera hover).
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Ao rolar, as janelas se afastam e somem — sem prender o scroll.
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["center center", "end start"] });
  const spread = scrollYProgress;
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <motion.div
      ref={sceneRef}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={reduceMotion ? undefined : { opacity: fade }}
      className={cn("relative mx-auto w-full max-w-[520px] select-none [perspective:1200px]", className)}
    >
      <motion.div
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[6/5] w-full"
      >
        <Layer spread={spread} depth={0} drift={{ x: -40, y: 30 }} reduceMotion={reduceMotion} className="left-[6%] top-[47%] w-[72%]">
          <BrowserWindow live={live} />
        </Layer>

        <Layer spread={spread} depth={40} drift={{ x: -20, y: -50 }} reduceMotion={reduceMotion} className="left-0 top-[4%] w-[64%]">
          <Terminal visibleLines={visibleLines} />
        </Layer>

        <Layer spread={spread} depth={80} drift={{ x: 50, y: 10 }} reduceMotion={reduceMotion} className="right-[2%] top-[14%] w-[30%]">
          <Phone live={live} />
        </Layer>
      </motion.div>
    </motion.div>
  );
}

function Layer({
  children,
  className,
  depth,
  drift,
  spread,
  reduceMotion,
}: {
  children: ReactNode;
  className?: string;
  depth: number;
  drift: { x: number; y: number };
  spread: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const x = useTransform(spread, (value) => value * drift.x);
  const y = useTransform(spread, (value) => value * drift.y);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + depth / 400 }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn("absolute", className)}
    >
      <motion.div style={reduceMotion ? { z: depth } : { x, y, z: depth }}>{children}</motion.div>
    </motion.div>
  );
}

function Terminal({ visibleLines }: { visibleLines: number }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-[#141110]", layerShadow)}>
      <WindowBar label="~/projeto — zsh" />
      <div className="min-h-[148px] space-y-1 px-3.5 py-3 font-mono text-[11px] leading-relaxed sm:text-xs">
        {terminalLines.slice(0, visibleLines).map((line) => (
          <motion.p
            key={line.text}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "whitespace-nowrap",
              line.tone === "command" && "text-foreground",
              line.tone === "ok" && "text-muted-foreground",
              line.tone === "done" && "text-primary",
            )}
          >
            {line.text}
          </motion.p>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-foreground/70" />
        )}
      </div>
    </div>
  );
}

function BrowserWindow({ live }: { live: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-card", layerShadow)}>
      <WindowBar label="app.produção" />
      <div className="relative grid grid-cols-[1fr_2.2fr] gap-3 p-3.5">
        <div className="space-y-2">
          <Bar live={live} className="w-4/5" />
          <Bar live={live} className="w-3/5" delay={0.05} />
          <Bar live={live} className="w-2/3" delay={0.1} />
          <Bar live={live} className="w-1/2" delay={0.15} />
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={live ? { opacity: 1 } : { opacity: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="h-9 rounded-md border border-border bg-secondary/60"
              />
            ))}
          </div>
          <div className="flex h-16 items-end gap-1.5 rounded-md border border-border bg-background/40 px-2 pb-2">
            {[40, 65, 50, 80, 60, 92, 74].map((height, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{ height: live ? `${height}%` : "8%" }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                className={cn("flex-1 rounded-sm", index === 5 ? "bg-primary" : "bg-accent/50")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone({ live }: { live: boolean }) {
  return (
    <div className={cn("rounded-[22px] border border-border bg-[#141110] p-1.5", layerShadow)}>
      <div className="relative aspect-[9/19] overflow-hidden rounded-[17px] bg-card">
        <div className="mx-auto mt-1.5 h-1.5 w-8 rounded-full bg-background" />
        <div className="space-y-2 p-2.5 pt-3">
          <Bar live={live} className="h-2 w-2/3" />
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={live ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 4 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
              className="flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 p-1.5"
            >
              <div className="h-4 w-4 shrink-0 rounded bg-accent/40" />
              <div className="h-1.5 flex-1 rounded-full bg-muted-foreground/30" />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={false}
          animate={live ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="absolute inset-x-2 bottom-3 flex items-center justify-center gap-1 rounded-full bg-primary py-1 text-[9px] font-medium text-primary-foreground"
        >
          <Check className="h-2.5 w-2.5" />
          live
        </motion.div>
      </div>
    </div>
  );
}

function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-foreground/15" />
      <span className="h-2 w-2 rounded-full bg-foreground/15" />
      <span className="h-2 w-2 rounded-full bg-foreground/15" />
      <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

function Bar({ live, className, delay = 0 }: { live: boolean; className?: string; delay?: number }) {
  return (
    <motion.div
      animate={live ? { opacity: 1 } : { opacity: 0.25 }}
      transition={{ duration: 0.4, delay }}
      className={cn("h-1.5 rounded-full bg-muted-foreground/30", className)}
    />
  );
}
