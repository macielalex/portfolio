"use client";

import { I18nProvider } from "@/lib/i18n";
import { Navigation } from "@/components/portfolio/navigation";
import { Hero } from "@/components/portfolio/hero";
import { Voice } from "@/components/portfolio/voice";
import { BentoGrid } from "@/components/portfolio/bento-grid";
import { TechStack } from "@/components/portfolio/tech-stack";
import { Experience } from "@/components/portfolio/experience";
import { Education } from "@/components/portfolio/education";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export function HomePage() {
  return (
    <I18nProvider>
      <main className="relative min-h-screen overflow-hidden bg-background">
        <Navigation />
        <Hero />
        <Voice />
        <BentoGrid />
        <TechStack />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </main>
    </I18nProvider>
  );
}
