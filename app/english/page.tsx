import type { Metadata } from "next";
import { EnglishPlanner } from "@/components/english/english-planner";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `English Planner | ${siteConfig.name}`,
  description: "Plano estruturado de estudo de ingles com fases, metas, avaliacoes e prompts prontos.",
  alternates: {
    canonical: "/english",
  },
  openGraph: {
    title: `English Planner | ${siteConfig.name}`,
    description: "Plano estruturado de estudo de ingles com fases, metas, avaliacoes e prompts prontos.",
    url: "/english",
    type: "website",
    images: [{ url: "/logo.svg" }],
  },
};

export default function EnglishPage() {
  return <EnglishPlanner />;
}
