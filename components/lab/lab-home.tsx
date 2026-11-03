"use client";

import Link from "next/link";

import { BentoGrid } from "@/components/portfolio/bento-grid";
import { Contact } from "@/components/portfolio/contact";
import { Education } from "@/components/portfolio/education";
import { Experience } from "@/components/portfolio/experience";
import { Footer } from "@/components/portfolio/footer";
import { Hero } from "@/components/portfolio/hero";
import { Navigation } from "@/components/portfolio/navigation";
import { TechStack } from "@/components/portfolio/tech-stack";
import { Voice } from "@/components/portfolio/voice";
import { I18nProvider } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const labReplicas = [
  { href: "/lab/1", id: "godly", n: "1", name: "Godly" },
  { href: "/lab/2", id: "bento", n: "2", name: "Bento" },
  { href: "/lab/3", id: "lapa", n: "3", name: "Lapa" },
  { href: "/lab/4", id: "aceternity", n: "4", name: "Aceternity" },
] as const;

export type LabReplicaId = (typeof labReplicas)[number]["id"];

export function LabSwitcher({ current }: { current?: LabReplicaId }) {
  return (
    <nav
      className="flex items-center gap-1 rounded-full border border-border bg-background/90 p-1 backdrop-blur"
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 60,
      }}
    >
      {labReplicas.map((lab) => (
        <Link
          key={lab.id}
          href={lab.href}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground",
            current === lab.id && "bg-primary text-primary-foreground",
          )}
        >
          {lab.n} {lab.name}
        </Link>
      ))}
    </nav>
  );
}

export function Replica({ id }: { id: LabReplicaId }) {
  return (
    <I18nProvider>
      <main data-lab={id} className="relative min-h-screen bg-background">
        <Navigation />
        <div className="lab-body overflow-x-hidden">
          <Hero />
          <Voice />
          <BentoGrid />
          <TechStack />
          <Experience />
          <Education />
          <Contact />
          <Footer />
        </div>
      </main>
      <LabSwitcher current={id} />
    </I18nProvider>
  );
}
