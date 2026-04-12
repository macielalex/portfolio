"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Locale = "pt" | "en";

const translations = {
  pt: {
    nav: {
      projects: "Impacto",
      experience: "Experiência",
      stack: "Stack",
      education: "Formação",
      contact: "Contato",
    },
    hero: {
      badge: "Disponível para Projetos",
      title: "Engineering Scalable Apps with a Business Mindset",
      subtitle:
        "Senior Flutter Developer com background em ERP e Administração Pública. Rigor técnico com visão estratégica de produto.",
      cta: "Ver projetos",
    },
    projects: {
      title: "Impacto Real",
      whitelabel: {
        title: "The Whitelabel Architect",
        description:
          "Liderança técnica na Fiibo — startup avaliada em R$77,5M, Top 1 Healthtech nos 100 Open Startups. Arquitetura Flutter whitelabel com 10+ marcas ativas (Fiibo, FIEC, XP, Doctorclin e outras). Clean Architecture, TDD, Shorebird OTA.",
      },
      metrics: {
        title: "Real Product Metrics",
        subtitle: "Dados reais de um produto em produção — não um side project.",
        lives: "vidas cobertas",
        flavors: "flavors em produção",
        retention: "taxa de retenção (28d)",
        engagement: "engajamento médio",
        pipeline: "Pipeline GA4 + Firebase Crashlytics + groundcover APM",
      },
      business: {
        title: "Business-Driven Developer",
        description:
          "De Analista ERP a Especialista Mobile. Background em SQL Server (T-SQL), Oracle (PL/SQL) e mapeamento de processos aplicado diretamente ao design de software. Dois bacharelados na UFC: Sistemas de Informação + Administração Pública — a combinação que faz a diferença na reunião com o cliente.",
      },
      operational: {
        title: "Operational Excellence",
        description:
          "Coordenador de Implantação WMS: entregas para clientes enterprise com gestão de cronograma, alinhamento com stakeholders e treinamento de equipes. Hoje aplico o mesmo rigor na entrega de software.",
      },
      ownProducts: {
        title: "Own Products",
        subtitle: "Developer-Founder",
        badge: "Em construção",
        phonemidia: {
          name: "PhoneMidiaEasy",
          description:
            "Player local para sistemas automotivos Android via Bluetooth. Flutter, UI large-touch, ConnectionMode parametrizável.",
        },
        recorre: {
          name: "RecorreFácil",
          description:
            "SaaS de cobranças recorrentes para administradores informais. React + Node + Asaas + WhatsApp API. Em MVP.",
        },
      },
    },
    stack: {
      title: "Tech Stack Híbrida",
      mobile: {
        title: "Mobile & Modern",
        items: ["Flutter", "Dart", "React", "Node.js", "TypeScript", "Prisma", "Firebase", "Shorebird OTA"],
      },
      observability: {
        title: "Observability & Data",
        items: ["Google Analytics 4", "Firebase Crashlytics", "New Relic", "groundcover APM", "Looker Studio"],
      },
      enterprise: {
        title: "Enterprise & Legacy",
        items: ["SQL Server (T-SQL)", "Oracle (PL/SQL)", "ERP", "WMS"],
      },
    },
    experience: {
      title: "Experiência",
      fiibo: {
        role: "Senior Mobile Developer",
        company: "Fiibo",
        period: "Atual",
        badge: "Top 1 Healthtech Open Startups",
        description: "Startup avaliada em R$77,5M",
        bullets: [
          "Plataforma Flutter whitelabel com 10+ flavors",
          "Implementação de GA4 pipeline e Firebase Crashlytics",
          "Adoção de Clean Architecture e TDD",
          "OTA deployments via Shorebird",
        ],
      },
      wms: {
        role: "Dev & Coordenador de Implantação",
        company: "WMS Expert",
        period: "2019 - 2021",
        description: "",
        bullets: [
          "Ponte entre operações de negócio e desenvolvimento",
          "Gestão de implantações em clientes enterprise",
          "SQL Server e integrações de sistema",
        ],
      },
      lux: {
        role: "Analista de Processos ERP",
        company: "LUX Sistemas",
        period: "2017 - 2019",
        description: "",
        bullets: [
          "Levantamento de regras de negócio para indústrias",
          "Oracle PL/SQL, modelagem de dados",
          "Documentação técnica",
        ],
      },
    },
    education: {
      title: "Formação",
      si: {
        degree: "Bacharelado em Sistemas de Informação",
        institution: "Estácio",
      },
      adm: {
        degree: "Bacharelado em Administração Pública",
        institution: "UFC — Universidade Federal do Ceará",
      },
      spec: {
        degree: "Especialização em Engenharia de Software",
        institution: "Em andamento",
      },
      footnote: "A combinação rara que garante fluência técnica e estratégica simultaneamente.",
    },
    contact: {
      title: "Entre em contato",
      subtitle: "Aberto a conversas sobre oportunidades, colaborações ou só trocar ideia sobre tecnologia.",
      form: {
        name: "Nome",
        email: "E-mail",
        message: "Mensagem",
        submit: "Enviar",
        sending: "Enviando...",
        success: "Mensagem enviada!",
      },
      info: {
        email: "alexmaciel.mail@gmail.com",
      },
    },
    footer: {
      built: "Construído com",
      and: "e",
    },
  },
  en: {
    nav: {
      projects: "Impact",
      experience: "Experience",
      stack: "Stack",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      badge: "Available for Projects",
      title: "Engineering Scalable Apps with a Business Mindset",
      subtitle:
        "Senior Flutter Developer with ERP and Public Administration background. Technical rigor with strategic product vision.",
      cta: "View projects",
    },
    projects: {
      title: "Real Impact",
      whitelabel: {
        title: "The Whitelabel Architect",
        description:
          "Technical leadership at Fiibo — startup valued at R$77.5M, Top 1 Healthtech in 100 Open Startups. Flutter whitelabel architecture with 10+ active brands (Fiibo, FIEC, XP, Doctorclin and others). Clean Architecture, TDD, Shorebird OTA.",
      },
      metrics: {
        title: "Real Product Metrics",
        subtitle: "Real data from a production product — not a side project.",
        lives: "lives covered",
        flavors: "flavors in production",
        retention: "retention rate (28d)",
        engagement: "avg engagement",
        pipeline: "GA4 + Firebase Crashlytics + groundcover APM Pipeline",
      },
      business: {
        title: "Business-Driven Developer",
        description:
          "From ERP Analyst to Mobile Specialist. Background in SQL Server (T-SQL), Oracle (PL/SQL) and process mapping applied directly to software design. Two degrees from UFC: Information Systems + Public Administration — the combination that makes the difference in client meetings.",
      },
      operational: {
        title: "Operational Excellence",
        description:
          "WMS Implementation Coordinator: enterprise client deliveries with schedule management, stakeholder alignment and team training. Today I apply the same rigor in software delivery.",
      },
      ownProducts: {
        title: "Own Products",
        subtitle: "Developer-Founder",
        badge: "In progress",
        phonemidia: {
          name: "PhoneMidiaEasy",
          description:
            "Local player for Android automotive systems via Bluetooth. Flutter, large-touch UI, configurable ConnectionMode.",
        },
        recorre: {
          name: "RecorreFácil",
          description:
            "Recurring billing SaaS for informal administrators. React + Node + Asaas + WhatsApp API. In MVP.",
        },
      },
    },
    stack: {
      title: "Hybrid Tech Stack",
      mobile: {
        title: "Mobile & Modern",
        items: ["Flutter", "Dart", "React", "Node.js", "TypeScript", "Prisma", "Firebase", "Shorebird OTA"],
      },
      observability: {
        title: "Observability & Data",
        items: ["Google Analytics 4", "Firebase Crashlytics", "New Relic", "groundcover APM", "Looker Studio"],
      },
      enterprise: {
        title: "Enterprise & Legacy",
        items: ["SQL Server (T-SQL)", "Oracle (PL/SQL)", "ERP", "WMS"],
      },
    },
    experience: {
      title: "Experience",
      fiibo: {
        role: "Senior Mobile Developer",
        company: "Fiibo",
        period: "Current",
        badge: "Top 1 Healthtech Open Startups",
        description: "Startup valued at R$77.5M",
        bullets: [
          "Flutter whitelabel platform with 10+ flavors",
          "GA4 pipeline and Firebase Crashlytics implementation",
          "Clean Architecture and TDD adoption",
          "OTA deployments via Shorebird",
        ],
      },
      wms: {
        role: "Dev & Implementation Coordinator",
        company: "WMS Expert",
        period: "2019 - 2021",
        description: "",
        bullets: [
          "Bridge between business operations and development",
          "Enterprise client implementation management",
          "SQL Server and system integrations",
        ],
      },
      lux: {
        role: "ERP Process Analyst",
        company: "LUX Sistemas",
        period: "2017 - 2019",
        description: "",
        bullets: [
          "Business rules gathering for industries",
          "Oracle PL/SQL, data modeling",
          "Technical documentation",
        ],
      },
    },
    education: {
      title: "Education",
      si: {
        degree: "Bachelor in Information Systems",
        institution: "Estácio",
      },
      adm: {
        degree: "Bachelor in Public Administration",
        institution: "UFC — Federal University of Ceará",
      },
      spec: {
        degree: "Software Engineering Specialization",
        institution: "In progress",
      },
      footnote: "The rare combination that ensures technical and strategic fluency simultaneously.",
    },
    contact: {
      title: "Get in touch",
      subtitle: "Open to conversations about opportunities, collaborations, or just talking about technology.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send",
        sending: "Sending...",
        success: "Message sent!",
      },
      info: {
        email: "alexmaciel.mail@gmail.com",
      },
    },
    footer: {
      built: "Built with",
      and: "and",
    },
  },
};

type TranslationSchema = (typeof translations)["pt"];

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationSchema;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");

  const value: I18nContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
