import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SecondaryNavigation } from "@/components/portfolio/secondary-navigation";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Extras | ${siteConfig.name}`,
  description: "Lista de projetos embutidos no portfolio, incluindo ferramentas e paginas adicionais.",
  alternates: {
    canonical: "/extras",
  },
  openGraph: {
    title: `Extras | ${siteConfig.name}`,
    description: "Lista de projetos embutidos no portfolio, incluindo ferramentas e paginas adicionais.",
    url: "/extras",
    type: "website",
    images: [{ url: "/logo.svg" }],
  },
};

const embeddedProjects = [
  {
    name: "English Planner",
    description: "Plano de estudos de ingles com fases, avaliacoes e prompts para pratica.",
    href: "/english",
    status: "Ativo",
  },
];

export default function ExtrasPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-24 text-foreground">
      <SecondaryNavigation />
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <p className="font-mono text-xs tracking-widest text-muted-foreground">EXTRAS</p>
          <h1 className="text-3xl font-semibold">Projetos embutidos</h1>
          <p className="text-sm text-muted-foreground">
            Lista de funcionalidades adicionais publicadas dentro deste portfolio.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {embeddedProjects.map((project) => (
            <Card key={project.name} className="border-border bg-card">
              <CardHeader className="space-y-1">
                <p className="font-mono text-xs text-primary">{project.status}</p>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <Link
                  href={project.href}
                  className="inline-flex rounded-md border border-border bg-secondary px-3 py-2 text-sm transition-colors hover:text-primary"
                >
                  Acessar projeto
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
