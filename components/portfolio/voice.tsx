"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

export function Voice() {
  const { t } = useI18n();

  return (
    <section id="sobre" className="relative px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-card/60 p-8 md:p-10"
        >
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {t.voice.title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.voice.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
