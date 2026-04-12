"use client";

import { useI18n } from "@/lib/i18n";
import { GraduationCap, Code, Briefcase, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function Education() {
  const { t } = useI18n();

  const degrees = [
    {
      degree: t.education.spec.degree,
      institution: t.education.spec.institution,
      icon: BookOpen,
      highlight: true,
    },
    {
      degree: t.education.si.degree,
      institution: t.education.si.institution,
      icon: Code,
    },
    {
      degree: t.education.adm.degree,
      institution: t.education.adm.institution,
      icon: Briefcase,
    },
  ];

  return (
    <section id="education" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {t.education.title}
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {degrees.map((item, index) => {
            const Icon = item.icon;
            const isHighlight = "highlight" in item && item.highlight;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(0,229,192,0.1)] ${
                  isHighlight
                    ? "border-primary/50 hover:border-primary"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {isHighlight && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Em andamento
                    </span>
                  )}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {item.degree}
                </h3>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  {item.institution}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center text-sm italic text-muted-foreground"
        >
          {t.education.footnote}
        </motion.p>
      </div>
    </section>
  );
}
