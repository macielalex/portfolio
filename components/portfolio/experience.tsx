"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

export function Experience() {
  const { t } = useI18n();

  const experiences = [
    {
      role: t.experience.fiibo.role,
      company: t.experience.fiibo.company,
      period: t.experience.fiibo.period,
      badge: t.experience.fiibo.badge,
      description: t.experience.fiibo.description,
      bullets: t.experience.fiibo.bullets,
      current: true,
    },
    {
      role: t.experience.wms.role,
      company: t.experience.wms.company,
      period: t.experience.wms.period,
      description: t.experience.wms.description,
      bullets: t.experience.wms.bullets,
      current: false,
    },
    {
      role: t.experience.lux.role,
      company: t.experience.lux.company,
      period: t.experience.lux.period,
      description: t.experience.lux.description,
      bullets: t.experience.lux.bullets,
      current: false,
    },
  ];

  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {t.experience.title}
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col gap-4 pl-8 md:flex-row md:gap-8 md:pl-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 md:left-1/2 md:-translate-x-1/2">
                  <div className="relative">
                    {exp.current && (
                      <div className="absolute inset-0 animate-ping rounded-full bg-primary opacity-50" />
                    )}
                    <div
                      className={`relative h-4 w-4 rounded-full border-2 ${
                        exp.current
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/50 bg-background"
                      }`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div
                    className={`inline-block rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(0,229,192,0.1)] ${
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-medium text-primary">
                        {exp.company}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="font-mono text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                    {exp.badge && (
                      <div className="mb-3">
                        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400">
                          {exp.badge}
                        </span>
                      </div>
                    )}
                    {exp.description && (
                      <p className="mb-3 text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                    )}
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className={`flex items-start gap-2 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
