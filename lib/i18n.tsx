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
      extras: "Extras",
    },
    hero: {
      availability:
        "Aberto para freelas e CLT remoto — prefiro projeto com problema real a pitch bonito.",
      title: "Dev full stack que veio do chão de fábrica",
      subtitle:
        "Passei anos implantando ERP e WMS antes de virar dev. Isso me fez programar diferente: eu pergunto o porquê da regra de negócio antes de abrir o editor — hoje aplico isso do banco de dados à interface.",
      cta: "Ver o que ando fazendo",
    },
    voice: {
      title: "O que eu penso sobre desenvolvimento em 2026",
      body:
        "Não gosto de side project que morre no Figma. O PhoneMidiaEasy surgiu porque um cliente precisava tocar mídia no carro sem internet — não porque eu queria ter um app na loja. Na Fiibo, aprendi que whitelabel não é só trocar cor: é não quebrar dez marcas quando você corrige um bug na undécima. E sim, ainda acho que Flutter faz sentido para produto sério — mas só se você mede o que acontece depois do deploy, não só se o build passou. O mesmo vale para a API que sustenta o app: métrica de produção importa mais do que a camada que você mostra no pitch.",
    },
    projects: {
      title: "O que ando construindo",
      whitelabel: {
        title: "Um app, dez marcas",
        description:
          "Na Fiibo, o mesmo Flutter roda como Fiibo, FIEC, XP, Doctorclin e outras. O trabalho pesado não é a tela bonita — é fazer deploy de uma marca nova sem derrubar as outras. Shorebird entra quando a correção não pode esperar a fila da loja.",
        storeLinksLabel: "Ver na Play Store",
        fiiboLabel: "Fiibo",
        fiecLabel: "RH Benefícios FIEC",
        fiiboAriaLabel:
          "App Fiibo na Google Play Store, link externo abre em nova aba",
        fiecAriaLabel:
          "App RH Benefícios FIEC na Google Play Store, link externo abre em nova aba",
      },
      metrics: {
        title: "Números de produção",
        subtitle: "Dados reais do app em produção. Não inventei isso num slide.",
        lives: "beneficiários ativos",
        flavors: "marcas no mesmo código",
        retention: "retenção em 28 dias",
        engagement: "tempo médio por sessão",
        pipeline: "GA4 + Firebase Crashlytics + groundcover APM",
      },
      business: {
        title: "De analista ERP a dev mobile",
        description:
          "Trabalhei com SQL Server e Oracle mapeando processo de indústria antes de escrever Flutter. Quando alguém fala em regra de negócio na reunião, eu já vi isso rodando num ERP — não preciso fingir que entendi.",
        operationalNote:
          "Antes disso, coordenei implantação de WMS em cliente enterprise. Aprendi que cronograma e treinamento pesam tanto quanto o código.",
      },
      ownProducts: {
        title: "Produtos meus",
        subtitle: "",
        badge: "Em construção",
        phonemidia: {
          name: "PhoneMidiaEasy",
          description:
            "Cliente queria tocar música no sistema Android do carro via Bluetooth, offline. Começou como pedido real, não como ideia de startup.",
        },
      },
      dynamicAppIcon: {
        title: "dynamic_app_icon",
        badge: "Open Source",
        description:
          "Precisávamos trocar o ícone do app sem atualizar a Play Store a cada campanha de branding. Esse package resolve isso no Android e no iOS.",
        deepDiveLabel: "Por baixo dos panos:",
        android: "Android: activity-alias e PackageManager",
        ios: "iOS: alternateIcons",
        bridge: "Flutter Method Channels (Kotlin/Swift)",
        githubLabel: "Ver no GitHub",
        githubAriaLabel:
          "Repositório dynamic_app_icon no GitHub, link externo abre em nova aba",
      },
      scoreboard: {
        title: "scoreboard",
        badge: "Open Source",
        description:
          "Placar eletrônico de vôlei para usar no celular — toque para marcar ponto, arraste para desfazer. PWA leve, sem build, funciona offline na quadra.",
        deepDiveLabel: "Por baixo dos panos:",
        pwa: "PWA instalável",
        offline: "Service worker + offline",
        stack: "HTML, CSS e JS puro",
        githubLabel: "Ver no GitHub",
        githubAriaLabel:
          "Repositório scoreboard no GitHub, link externo abre em nova aba",
        liveLabel: "Ver em produção",
        liveAriaLabel:
          "Placar de Vôlei em produção no Netlify, link externo abre em nova aba",
      },
    },
    stack: {
      title: "Ferramentas que uso no dia a dia",
      mobile: {
        title: "Mobile e front-end",
        subtitle: "Onde passo a maior parte do tempo",
        items: ["Flutter", "Dart", "React", "Shorebird OTA"],
      },
      backend: {
        title: "Backend e APIs",
        subtitle: "O que sustenta o produto",
        items: ["Node.js", "TypeScript", "Prisma", "Firebase"],
      },
      observability: {
        title: "Dados e monitoramento",
        items: ["Google Analytics 4", "Firebase Crashlytics", "New Relic", "groundcover APM", "Looker Studio"],
      },
      enterprise: {
        title: "Sistemas legados",
        items: ["SQL Server (T-SQL)", "Oracle (PL/SQL)", "ERP", "WMS"],
      },
    },
    experience: {
      title: "Experiência",
      current: "Atual",
      fiibo: {
        role: "Desenvolvedor Full Stack Sênior",
        company: "Fiibo",
        period: "Atual",
        badge: "",
        description: "Benefícios corporativos — app whitelabel com dezenas de marcas em produção.",
        bullets: [
          "Mesmo código Flutter, marcas diferentes (Fiibo, FIEC, XP, Doctorclin…)",
          "Montei pipeline de GA4 e Crashlytics para parar de adivinhar bug em produção",
          "Clean Architecture e TDD onde dá — nem sempre dá, e tudo bem",
          "Deploy OTA com Shorebird quando a loja não pode esperar",
        ],
      },
      wms: {
        role: "Dev e coordenador de implantação",
        company: "WMS Expert",
        period: "2019 – 2021",
        description: "",
        bullets: [
          "Fazia a ponte entre operação do cliente e o time de dev",
          "Implantação em fábrica e distribuidor — prazo apertado, usuário impaciente",
          "SQL Server e integrações que ninguém documentou direito",
        ],
      },
      lux: {
        role: "Analista de processos ERP",
        company: "LUX Sistemas",
        period: "2017 – 2019",
        description: "",
        bullets: [
          "Levantamento de regra de negócio em indústria — chão de fábrica, não slide",
          "Oracle PL/SQL e modelagem quando o ERP não fazia o que o cliente jurava que fazia",
          "Documentação técnica para quem vinha depois (incluindo eu mesmo)",
        ],
      },
    },
    education: {
      title: "Formação",
      inProgress: "Em andamento",
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
      footnote: "",
    },
    contact: {
      title: "Fala comigo",
      subtitle: "Me manda um e-mail. Respondo em português, sem texto de vendas.",
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
      extras: "Extras",
    },
    hero: {
      availability:
        "Open to freelance and remote full-time — I prefer real problems over polished pitches.",
      title: "A full stack dev who came from the factory floor",
      subtitle:
        "I spent years deploying ERP and WMS systems before writing code for a living. That changed how I work: I ask why the business rule exists before opening the editor — today I apply that from the database to the UI.",
      cta: "See what I'm building",
    },
    voice: {
      title: "What I think about development in 2026",
      body:
        "I don't like side projects that die in Figma. PhoneMidiaEasy started because a client needed offline media in their car — not because I wanted an app on the store. At Fiibo, I learned whitelabel isn't just swapping colors: it's not breaking ten brands when you fix a bug in the eleventh. And yes, I still think Flutter makes sense for serious products — but only if you measure what happens after deploy, not just whether the build passed. The same goes for the API behind the app: production metrics matter more than the layer you show in the pitch.",
    },
    projects: {
      title: "What I'm building",
      whitelabel: {
        title: "One app, ten brands",
        description:
          "At Fiibo, the same Flutter codebase runs as Fiibo, FIEC, XP, Doctorclin, and others. The hard part isn't a pretty screen — it's shipping a new brand without breaking the rest. Shorebird helps when the store queue is too slow.",
        storeLinksLabel: "View on Play Store",
        fiiboLabel: "Fiibo",
        fiecLabel: "RH Benefícios FIEC",
        fiiboAriaLabel:
          "Fiibo app on Google Play Store, external link opens in a new tab",
        fiecAriaLabel:
          "RH Benefícios FIEC app on Google Play Store, external link opens in a new tab",
      },
      metrics: {
        title: "Production numbers",
        subtitle: "Real data from a live app. I didn't make this up for a slide deck.",
        lives: "active beneficiaries",
        flavors: "brands on one codebase",
        retention: "28-day retention",
        engagement: "avg. session time",
        pipeline: "GA4 + Firebase Crashlytics + groundcover APM",
      },
      business: {
        title: "From ERP analyst to mobile dev",
        description:
          "I worked with SQL Server and Oracle mapping factory processes before writing Flutter. When someone talks business rules in a meeting, I've usually seen them running in an ERP — I don't have to pretend I get it.",
        operationalNote:
          "Before that, I coordinated WMS rollouts for enterprise clients. I learned schedules and training matter as much as code.",
      },
      ownProducts: {
        title: "My own products",
        subtitle: "",
        badge: "In progress",
        phonemidia: {
          name: "PhoneMidiaEasy",
          description:
            "A client needed offline Bluetooth media on their car's Android head unit. It started as a real request, not a startup idea.",
        },
      },
      dynamicAppIcon: {
        title: "dynamic_app_icon",
        badge: "Open Source",
        description:
          "We needed to swap the app icon without a Play Store update for every branding campaign. This package does that on Android and iOS.",
        deepDiveLabel: "Under the hood:",
        android: "Android: activity-alias & PackageManager",
        ios: "iOS: alternateIcons",
        bridge: "Flutter Method Channels (Kotlin/Swift)",
        githubLabel: "View on GitHub",
        githubAriaLabel:
          "dynamic_app_icon repository on GitHub, external link opens in a new tab",
      },
      scoreboard: {
        title: "scoreboard",
        badge: "Open Source",
        description:
          "Volleyball scoreboard for your phone — tap to score, swipe down to undo. Lightweight PWA, no build step, works offline on the court.",
        deepDiveLabel: "Under the hood:",
        pwa: "Installable PWA",
        offline: "Service worker + offline",
        stack: "Vanilla HTML, CSS & JS",
        githubLabel: "View on GitHub",
        githubAriaLabel:
          "scoreboard repository on GitHub, external link opens in a new tab",
        liveLabel: "View live",
        liveAriaLabel:
          "Volleyball Scoreboard live on Netlify, external link opens in a new tab",
      },
    },
    stack: {
      title: "Tools I use day to day",
      mobile: {
        title: "Mobile & front-end",
        subtitle: "Where I spend most of my time",
        items: ["Flutter", "Dart", "React", "Shorebird OTA"],
      },
      backend: {
        title: "Backend & APIs",
        subtitle: "What keeps the product running",
        items: ["Node.js", "TypeScript", "Prisma", "Firebase"],
      },
      observability: {
        title: "Data & monitoring",
        items: ["Google Analytics 4", "Firebase Crashlytics", "New Relic", "groundcover APM", "Looker Studio"],
      },
      enterprise: {
        title: "Legacy systems",
        items: ["SQL Server (T-SQL)", "Oracle (PL/SQL)", "ERP", "WMS"],
      },
    },
    experience: {
      title: "Experience",
      current: "Current",
      fiibo: {
        role: "Senior Full Stack Developer",
        company: "Fiibo",
        period: "Current",
        badge: "",
        description: "Corporate benefits — whitelabel app with dozens of brands in production.",
        bullets: [
          "Same Flutter codebase, different brands (Fiibo, FIEC, XP, Doctorclin…)",
          "Built GA4 and Crashlytics pipeline to stop guessing production bugs",
          "Clean Architecture and TDD where it fits — not always, and that's fine",
          "OTA deploys with Shorebird when the store can't wait",
        ],
      },
      wms: {
        role: "Dev & implementation lead",
        company: "WMS Expert",
        period: "2019 – 2021",
        description: "",
        bullets: [
          "Bridge between client operations and the dev team",
          "Rollouts at factories and distributors — tight deadlines, impatient users",
          "SQL Server and integrations nobody documented properly",
        ],
      },
      lux: {
        role: "ERP process analyst",
        company: "LUX Sistemas",
        period: "2017 – 2019",
        description: "",
        bullets: [
          "Business rules on the factory floor, not in slides",
          "Oracle PL/SQL and modeling when the ERP didn't do what sales promised",
          "Technical docs for whoever came next (including future me)",
        ],
      },
    },
    education: {
      title: "Education",
      inProgress: "In progress",
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
      footnote: "",
    },
    contact: {
      title: "Get in touch",
      subtitle: "Send me an email. I'll reply in plain language, no sales copy.",
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
