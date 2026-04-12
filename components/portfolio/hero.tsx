"use client";

import { useI18n } from "@/lib/i18n";
import { MapPin, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  const { t } = useI18n();

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-slate-900/50 blur-[120px]" />
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr from-cyan-500/10 via-transparent to-slate-800/30 blur-[100px]" style={{ animationDelay: "1s" }} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-primary/30 bg-secondary">
              <Image
                src="https://avatars.githubusercontent.com/u/65974487"
                alt="Alex Maciel"
                width={128}
                height={128}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-background bg-green-500" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-sm font-medium text-primary">
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          Alex Maciel
        </motion.h1>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-6 flex items-center justify-center gap-1.5 text-muted-foreground"
        >
          <MapPin className="h-4 w-4" />
          <span className="text-sm">Fortaleza, CE, Brasil</span>
        </motion.div>

        {/* Subtitle - Technical */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 font-mono text-lg text-primary md:text-xl"
        >
          {t.hero.title}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_-5px_rgba(0,229,192,0.5)]"
          >
            {t.hero.cta}
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5">
            <div className="h-2 w-1 animate-bounce rounded-full bg-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
