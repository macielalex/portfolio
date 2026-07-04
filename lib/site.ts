export const siteConfig = {
  name: "Alex Maciel Portfolio",
  title: "Alex Maciel | Senior Full Stack Engineer",
  description:
    "Dev mobile Flutter — whitelabel, ERP no passado, produto em produção com dezenas de marcas.",
  locale: "pt_BR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexmaciel.dev",
  social: {
    github: "https://github.com/macielalex",
    linkedin: "https://www.linkedin.com/in/alex-maciel-867b8933",
  },
} as const;

export function getSiteUrl() {
  return new URL(siteConfig.url);
}
