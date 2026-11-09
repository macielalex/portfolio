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
        "Começo pelo que trava o negócio. Foi o que aprendi em anos dentro da operação de clientes, implantando ERP e WMS, e é assim que hoje construo produto para 80 mil+ pessoas.",
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
        tests: "testes automatizados no app",
        years: "anos em TI, do ERP ao código",
        pipeline: "GA4 + Firebase Crashlytics + groundcover APM",
      },
      business: {
        title: "Do ERP ao full stack",
        description:
          "Trabalhei com SQL Server e Oracle mapeando processo de indústria antes de escrever Flutter. Quando alguém fala em regra de negócio na reunião, eu já vi isso rodando num ERP — não preciso fingir que entendi.",
        operationalNote:
          "Antes disso, implantei WMS em operações logísticas, da configuração ao go-live. Aprendi que cronograma e treinamento pesam tanto quanto o código.",
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
      ai: {
        title: "IA no trabalho, não no pitch",
        description:
          "Na Fiibo, IA virou ferramenta de engenharia: ajuda a sustentar o app em produção e responde perguntas do negócio. Não é demo que só funciona no slide.",
        rag: {
          title: "RAG local para sustentação",
          text: "Ollama com embeddings nomic-embed-text, Qdrant, reranking e Dify, montado para executar ações de sustentação do app.",
        },
        agents: {
          title: "Agentes com Claude Code",
          text: "9 agentes, 42 skills e hooks orquestrados no Claude Code, mais servidores MCP próprios.",
        },
        analytics: {
          title: "Analytics conversacional",
          text: "Times de produto e negócio perguntam em linguagem natural e a resposta sai do GA4 e do BigQuery.",
        },
        studying: "Em estudo: agentes de IA generativa",
      },
      agentsOffice: {
        title: "escritorio-pessoal",
        badge: "Projeto pessoal",
        description:
          "Seis agentes de IA agendados (cinco ativos) acompanham finanças pessoais: diário, leitor de faturas, semanal, previsão, estratégia e lembretes. Cada agente é dono de um campo do banco compartilhado e só escreve se a versão que leu ainda for a atual.",
        rulesLabel: "Proibido por regra:",
        rules: "pagar, transferir, contratar crédito, excluir ou responder e-mail.",
        deepDiveLabel: "Por baixo dos panos:",
        openFinance: "Open Finance somente leitura",
        models: "Modelo escolhido pelo custo do erro",
        tests: "TypeScript strict + 24 testes Vitest",
        ci: "GitHub Actions + gitleaks",
        dataNote: "O repositório usa dados fictícios.",
        githubLabel: "Ver no GitHub",
        githubAriaLabel:
          "Repositório escritorio-pessoal no GitHub, link externo abre em nova aba",
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
        items: ["Flutter", "Dart", "React", "React Native", "Kotlin (Android)", "Shorebird OTA"],
      },
      backend: {
        title: "Backend e APIs",
        subtitle: "O que sustenta o produto",
        items: ["Node.js", "TypeScript", "Prisma", "PostgreSQL", "Swagger/OpenAPI", "Microsserviços", "AWS (Cognito, SQS)", "Firebase"],
      },
      delivery: {
        title: "CI/CD e entrega",
        items: ["Bitbucket Pipelines", "GitHub Actions", "Fastlane", "Docker"],
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
        period: "fev/2022 – presente",
        badge: "",
        description: "Benefícios corporativos — app whitelabel com 10+ marcas em produção.",
        bullets: [
          "Mesmo código Flutter, marcas diferentes (Fiibo, FIEC, XP, Doctorclin…)",
          "Montei pipeline de GA4 e Crashlytics para parar de adivinhar bug em produção",
          "Arquitetura modular com Provider, migrando para Clean Architecture aos poucos",
          "APIs em Node.js, TypeScript, Prisma e PostgreSQL, com integrações com Amazon Cognito, HubSpot e AWS SQS, e portais em React",
          "Configurei os pipelines de build e release (Bitbucket Pipelines, Fastlane) e o deploy OTA com Shorebird, com scripts de pré-release",
          "Código nativo Android em Kotlin e Remote Config para forçar atualização",
          "Suíte com mais de 1.100 testes (unitários, de widget e de integração)",
        ],
      },
      wms: {
        role: "Product Owner e Desenvolvedor Flutter",
        company: "WMS Expert",
        period: "jul/2016 – jan/2022",
        description: "",
        bullets: [
          "Fazia a ponte entre operação do cliente e o time de dev",
          "Implantação em fábrica e distribuidor — prazo apertado, usuário impaciente",
          "SQL Server e integrações que ninguém documentou direito",
        ],
      },
      lux: {
        role: "Analista de Implantação (ERP)",
        company: "LUX Sistemas",
        period: "abr/2013 – fev/2016",
        description: "",
        bullets: [
          "Levantamento de regra de negócio em indústria — chão de fábrica, não slide",
          "Oracle PL/SQL e modelagem quando o ERP não fazia o que o cliente jurava que fazia",
          "Documentação técnica para quem vinha depois (incluindo eu mesmo)",
        ],
      },
      shalom: {
        role: "Analista de Suporte ERP",
        company: "Comunidade Católica Shalom",
        period: "2009 – 2013",
        description: "",
        bullets: [
          "Onde tudo começou: suporte a sistemas ERP no dia a dia",
          "Manutenção de banco de dados SQL Server (T-SQL)",
          "Implantação de novas rotinas no ERP",
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
        degree: "Pós-graduação em Engenharia de Software",
        institution: "Centro Universitário União das Américas / Descomplica",
      },
      ai: {
        degree: "Formação em Inteligência Artificial Generativa (96h)",
        institution: "Geração Tech",
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
        "I start with what's holding the business back. I learned that from years inside client operations, rolling out ERP and WMS, and it's how I build a product used by 80,000+ people today.",
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
        tests: "automated tests in the app",
        years: "years in IT, from ERP to code",
        pipeline: "GA4 + Firebase Crashlytics + groundcover APM",
      },
      business: {
        title: "From ERP to full stack",
        description:
          "I worked with SQL Server and Oracle mapping factory processes before writing Flutter. When someone talks business rules in a meeting, I've usually seen them running in an ERP — I don't have to pretend I get it.",
        operationalNote:
          "Before that, I rolled out WMS in logistics operations, from setup to go-live. I learned schedules and training matter as much as code.",
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
      ai: {
        title: "AI at work, not in the pitch",
        description:
          "At Fiibo, AI became an engineering tool: it helps support the app in production and answers business questions. Not a demo that only works on a slide.",
        rag: {
          title: "Local RAG for app support",
          text: "Ollama with nomic-embed-text embeddings, Qdrant, reranking and Dify, built to run support actions on the app.",
        },
        agents: {
          title: "Agents with Claude Code",
          text: "9 agents, 42 skills and hooks orchestrated in Claude Code, plus my own MCP servers.",
        },
        analytics: {
          title: "Conversational analytics",
          text: "Product and business teams ask in plain language and the answer comes from GA4 and BigQuery.",
        },
        studying: "Currently studying: generative AI agents",
      },
      agentsOffice: {
        title: "escritorio-pessoal",
        badge: "Personal project",
        description:
          "Six scheduled AI agents (five active) track personal finances: daily, invoice reader, weekly, forecast, strategy and reminders. Each agent owns one field of the shared store and only writes if the version it read is still current.",
        rulesLabel: "Forbidden by rule:",
        rules: "paying, transferring, taking credit, deleting or replying to email.",
        deepDiveLabel: "Under the hood:",
        openFinance: "Read-only Open Finance",
        models: "Model picked by the cost of error",
        tests: "Strict TypeScript + 24 Vitest tests",
        ci: "GitHub Actions + gitleaks",
        dataNote: "The repository uses fictional data.",
        githubLabel: "View on GitHub",
        githubAriaLabel:
          "escritorio-pessoal repository on GitHub, external link opens in a new tab",
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
        items: ["Flutter", "Dart", "React", "React Native", "Kotlin (Android)", "Shorebird OTA"],
      },
      backend: {
        title: "Backend & APIs",
        subtitle: "What keeps the product running",
        items: ["Node.js", "TypeScript", "Prisma", "PostgreSQL", "Swagger/OpenAPI", "Microservices", "AWS (Cognito, SQS)", "Firebase"],
      },
      delivery: {
        title: "CI/CD & delivery",
        items: ["Bitbucket Pipelines", "GitHub Actions", "Fastlane", "Docker"],
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
        period: "Feb 2022 – present",
        badge: "",
        description: "Corporate benefits — whitelabel app with 10+ brands in production.",
        bullets: [
          "Same Flutter codebase, different brands (Fiibo, FIEC, XP, Doctorclin…)",
          "Built GA4 and Crashlytics pipeline to stop guessing production bugs",
          "Modular architecture with Provider, gradually migrating to Clean Architecture",
          "APIs in Node.js, TypeScript, Prisma and PostgreSQL, integrating Amazon Cognito, HubSpot and AWS SQS, plus React portals",
          "Set up build and release pipelines (Bitbucket Pipelines, Fastlane) and OTA deploys with Shorebird, with pre-release scripts",
          "Native Android code in Kotlin and Remote Config to force updates",
          "Test suite with 1,100+ cases (unit, widget and integration)",
        ],
      },
      wms: {
        role: "Product Owner & Flutter Developer",
        company: "WMS Expert",
        period: "Jul 2016 – Jan 2022",
        description: "",
        bullets: [
          "Bridge between client operations and the dev team",
          "Rollouts at factories and distributors — tight deadlines, impatient users",
          "SQL Server and integrations nobody documented properly",
        ],
      },
      lux: {
        role: "ERP Implementation Analyst",
        company: "LUX Sistemas",
        period: "Apr 2013 – Feb 2016",
        description: "",
        bullets: [
          "Business rules on the factory floor, not in slides",
          "Oracle PL/SQL and modeling when the ERP didn't do what sales promised",
          "Technical docs for whoever came next (including future me)",
        ],
      },
      shalom: {
        role: "ERP Support Analyst",
        company: "Comunidade Católica Shalom",
        period: "2009 – 2013",
        description: "",
        bullets: [
          "Where it all started: day-to-day ERP support",
          "SQL Server (T-SQL) database maintenance",
          "Rolling out new routines in the ERP",
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
        degree: "Postgraduate degree in Software Engineering",
        institution: "Centro Universitário União das Américas / Descomplica",
      },
      ai: {
        degree: "Generative AI Program (96h)",
        institution: "Geração Tech",
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
