import type { Metadata } from "next";

import { LabBench } from "@/components/lab/compare";
import { SecondaryNavigation } from "@/components/portfolio/secondary-navigation";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Lab | ${siteConfig.name}`,
  description: "Prova interna dos primitivos de interface, fora do menu e da indexação.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LabPage() {
  return (
    <main className="min-h-screen bg-background pb-16 pt-24 text-foreground">
      <SecondaryNavigation />
      <LabBench />
    </main>
  );
}
