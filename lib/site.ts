export const siteConfig = {
  name: "Alex Maciel Portfolio",
  title: "Alex Maciel | Senior Full Stack Engineer",
  description:
    "Dev Full Stack Sênior — Node.js, React e Flutter. App whitelabel em produção com 10+ marcas e 80 mil+ usuários; 17 anos de TI, do ERP ao código.",
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
