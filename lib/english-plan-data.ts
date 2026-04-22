export type PhaseWeek = {
  week: string;
  focus: string;
  daily: string[];
  meta: string;
  tip: string;
  isEval?: boolean;
};

export type PhaseMonth = {
  title: string;
  weeks: PhaseWeek[];
};

export type Resource = {
  icon: string;
  name: string;
  desc: string;
  link: string;
};

export type EvalTask = {
  label: string;
  desc: string;
};

export type Evaluation = {
  title: string;
  tasks: EvalTask[];
  pass: string;
  fail: string;
};

export type Phase = {
  id: number;
  label: string;
  sublabel: string;
  duration: string;
  color: string;
  bg: string;
  months: PhaseMonth[];
  resources: Resource[];
  evals: Evaluation[];
};

export type EnglishTab = "plano" | "recursos" | "avaliacao" | "gemini";

export type GeminiPrompt = {
  phase: string;
  situation: string;
  prompt: string;
};

export const phases: Phase[] = [
  {
    id: 1,
    label: "FASE 1",
    sublabel: "A1/A2 -> B1",
    duration: "3-5 meses",
    color: "#60a5fa",
    bg: "#1e3a5f",
    months: [
      {
        title: "Mes 1 - Fundacao",
        weeks: [
          {
            week: "Semana 1",
            focus: "Setup + primeiros passos",
            daily: [
              "BBC Learning English: playlist 'English in a Minute' - 1 video por dia (YouTube)",
              "Baixar Anki (Android, gratuito) e instalar deck 'Basic English 500 words'",
              "Gemini Live: se apresentar em ingles por 3 minutos (nome, trabalho, familia)",
            ],
            meta: "7 videos BBC assistidos - 50 palavras no Anki - 1 sessao Gemini Live",
            tip: "Nao se preocupe com erro. O objetivo desta semana e so comecar.",
          },
          {
            week: "Semana 2",
            focus: "Listening diario + pronuncia",
            daily: [
              "6 Minute English (BBC Podcast no Spotify) - 1 episodio por dia",
              "English with Lucy no YouTube - serie de pronuncia basica (1 video/dia)",
              "Anki: minimo 10 novas palavras por dia",
              "Gemini Live (3x): falar sobre sua rotina diaria por 3 minutos",
            ],
            meta: "7 episodios 6 Min English - 70 novas palavras Anki - 3 sessoes Gemini Live",
            tip: "Prompt sugerido: 'Correct my grammar after I speak. I'll talk about my daily routine.'",
          },
          {
            week: "Semana 3",
            focus: "Streaming entra na rotina",
            daily: [
              "6 Minute English diario (Spotify)",
              "Streaming: 20 min de serie conhecida com legenda em INGLES (Friends ou The Office)",
              "Anki diario",
              "Gemini Live (3x): descrever uma cena da serie que assistiu",
            ],
            meta: "7 episodios 6 Min English - 140 min de streaming - 3 sessoes Gemini Live",
            tip: "Nao usar legenda em portugues. Mesmo sem entender tudo, o cerebro adapta.",
          },
          {
            week: "Semana 4",
            focus: "AVALIACAO MENSAL 1",
            daily: [],
            meta: "",
            tip: "",
            isEval: true,
          },
        ],
      },
      {
        title: "Mes 2 - Construcao",
        weeks: [
          {
            week: "Semanas 5-6",
            focus: "Shadowing comeca",
            daily: [
              "6 Minute English diario com shadowing",
              "Streaming: 30 min com legenda EN",
              "Anki diario - meta: 400 palavras totais",
              "Gemini Live (3x): conversas sobre trabalho (standup simulado)",
            ],
            meta: "14 ep. 6 Min English com shadowing - 400+ palavras Anki - 6 sessoes Gemini Live",
            tip: "Standup: 'Act as my tech lead. Ask yesterday, today and blockers.'",
          },
          {
            week: "Semanas 7-8",
            focus: "Consolidacao + vocabulario tecnico",
            daily: [
              "6 Minute English + shadowing",
              "Streaming: 30 min e menos pausas na legenda",
              "Anki: adicionar vocabulario tecnico de Flutter/dev",
              "Gemini Live (3x): explicar codigo em ingles por 5 min",
            ],
            meta: "500+ palavras Anki - explicar uma feature com poucas pausas",
            tip: "Semana 8 termina com avaliacao mensal 2.",
          },
        ],
      },
      {
        title: "Mes 3 - Consolidacao",
        weeks: [
          {
            week: "Semanas 9-11",
            focus: "Mistura + fluencia crescente",
            daily: [
              "3 dias: 6 Minute English com shadowing",
              "4 dias: streaming 30 min com legenda EN",
              "Anki: revisao + 5 novas palavras por dia",
              "Gemini Live (4x): standup + perguntas tecnicas simples",
            ],
            meta: "600+ palavras - standup de 5 min com boa fluidez - 75% de compreensao no streaming",
            tip: "Na semana 11, testar trechos sem legenda para medir compreensao real.",
          },
          {
            week: "Semana 12",
            focus: "AVALIACAO DE FASE 1",
            daily: [],
            meta: "",
            tip: "",
            isEval: true,
          },
        ],
      },
    ],
    resources: [
      { icon: "TV", name: "BBC Learning English", desc: "Playlist 'English in a Minute' e 'English at Work'", link: "youtube.com/bbclearningenglish" },
      { icon: "POD", name: "6 Minute English", desc: "Podcast BBC no Spotify", link: "Spotify -> '6 Minute English'" },
      { icon: "TV", name: "English with Lucy", desc: "Pronuncia clara e videos curtos", link: "youtube.com/@EnglishwithLucy" },
      { icon: "ANKI", name: "Anki", desc: "Deck recomendado: 'Basic English 500 words'", link: "Play Store -> Anki" },
      { icon: "TV", name: "Streaming", desc: "Series com legenda apenas em ingles", link: "Netflix / Prime / etc." },
      { icon: "LIVE", name: "Gemini Live", desc: "Pratica oral 3x por semana", link: "App Gemini (Android)" },
    ],
    evals: [
      {
        title: "Avaliacao Mensal 1 (fim semana 4)",
        tasks: [
          { label: "Listening", desc: "3 episodios do 6 Minute English sem legenda e resumo do tema" },
          { label: "Speaking", desc: "2 min sobre daily routine no Gemini Live sem preparo" },
          { label: "Vocabulario", desc: "Anki com acerto acima de 70%" },
        ],
        pass: "Compreensao basica + fala com fluidez inicial + Anki 70%+",
        fail: "Repetir mes 1 com novos episodios.",
      },
      {
        title: "Avaliacao Mensal 2 (fim semana 8)",
        tasks: [
          { label: "Listening", desc: "20 min de serie com legenda EN e resumo em 5 frases" },
          { label: "Speaking", desc: "Conversa de 5 min com menos de 3 pausas longas" },
          { label: "Vocabulario", desc: "400+ palavras retidas no Anki" },
        ],
        pass: "Resumo claro + conversa 5 min + 400 palavras",
        fail: "Repetir mes 2 por 3 semanas.",
      },
      {
        title: "Avaliacao de Fase 1 (fim semana 12)",
        tasks: [
          { label: "Listening", desc: "2 episodios do 6 Minute English sem legenda com 70%+ de compreensao" },
          { label: "Speaking", desc: "Standup simulado de 5 min: yesterday, today e blockers" },
          { label: "Vocabulario", desc: "600+ palavras retidas no Anki" },
        ],
        pass: "70%+ listening + standup com fluidez + 600 palavras",
        fail: "4 semanas de reforco antes de iniciar a fase 2.",
      },
    ],
  },
  {
    id: 2,
    label: "FASE 2",
    sublabel: "B1 -> B2",
    duration: "4-6 meses",
    color: "#34d399",
    bg: "#1a3d2e",
    months: [
      {
        title: "Meses 1-2 - Ingles autentico",
        weeks: [
          {
            week: "Semanas 1-4",
            focus: "Easy English + TED-Ed entram",
            daily: [
              "Easy English (YouTube): 1 video por dia com legenda EN",
              "TED-Ed (YouTube): 1 video por semana, primeiro com legenda EN, depois sem",
              "Streaming: serie nova (Silicon Valley, Suits, Black Mirror) com legenda EN",
              "Anki: vocabulario tecnico de dev/trabalho (minimo 5 novas por dia)",
              "Gemini Live (4x/semana): code review simulado + perguntas tecnicas",
            ],
            meta: "28 videos Easy English - 4 TED-Ed - 800+ palavras Anki",
            tip: "Code review: 'Act as a senior developer reviewing my Flutter code.'",
          },
          {
            week: "Semanas 5-8",
            focus: "Reduzir dependencia de legenda",
            daily: [
              "English Learning for Curious Minds (Spotify): 1 episodio por dia",
              "TED-Ed: assistir sem legenda primeiro, depois conferir",
              "Streaming: alternar 2 dias sem legenda e 2 com legenda EN",
              "Gemini Live (4x): simulacao de 1:1 e feedback",
            ],
            meta: "70%+ em TED-Ed sem legenda - 1:1 de 10 min com boa fluidez",
            tip: "Semana 8: avaliacao mensal da fase 2.",
          },
        ],
      },
      {
        title: "Meses 3-4 - Comunicacao tecnica",
        weeks: [
          {
            week: "Semanas 9-12",
            focus: "Vocabulario tecnico avancado",
            daily: [
              "Curious Minds diario",
              "Streaming: 50% sem legenda e 50% com legenda EN",
              "Anki: meta total 1000+ palavras",
              "Gemini Live (4x): entrevistas tecnicas de 15 min",
            ],
            meta: "1000 palavras Anki - entrevista de 15 min com fluidez B2",
            tip: "Prompt: 'Simulate a full technical interview for a Senior Flutter developer position.'",
          },
          {
            week: "Semanas 13-16",
            focus: "Velocidade e espontaneidade",
            daily: [
              "Podcast de tech em ingles (Syntax.fm, Flutter Dev Podcast)",
              "Streaming 70% sem legenda",
              "Gemini Live: conversas sem tema definido",
            ],
            meta: "Conversar 10 min sem preparo - entender 80% de podcast tecnico",
            tip: "Semana 16: avaliacao final da fase 2.",
          },
        ],
      },
    ],
    resources: [
      { icon: "TV", name: "Easy English", desc: "Ingles real de rua com legendas EN/PT", link: "youtube.com/@EasyEnglishTeam" },
      { icon: "TV", name: "TED-Ed", desc: "Temas variados com vocabulario rico", link: "youtube.com/@TededTalks" },
      { icon: "POD", name: "English Learning for Curious Minds", desc: "Podcast B1/B2 com episodios tematicos", link: "Spotify -> 'English Learning for Curious Minds'" },
      { icon: "POD", name: "Flutter Dev Podcast / Syntax.fm", desc: "Podcasts tecnicos reais para vocabulario diario", link: "Spotify" },
      { icon: "TV", name: "Silicon Valley / Suits / Black Mirror", desc: "Series com vocabulario profissional e tech", link: "Streaming" },
      { icon: "LIVE", name: "Gemini Live", desc: "4x por semana para code review, 1:1 e entrevistas", link: "App Gemini" },
    ],
    evals: [
      {
        title: "Avaliacao Mensal (fim de cada mes)",
        tasks: [
          { label: "Listening", desc: "TED-Ed de 10 min sem legenda e resumo de 3 pontos em ingles" },
          { label: "Speaking", desc: "Code review de 10 min no Gemini Live explicando decisoes tecnicas" },
          { label: "Vocabulario", desc: "800+ palavras retidas no Anki com mais de 70% de acerto" },
        ],
        pass: "3 pontos corretos + code review claro + 800 palavras",
        fail: "Mais 3 semanas no mesmo mes e nova avaliacao.",
      },
      {
        title: "Avaliacao de Fase 2 (fim semana 16)",
        tasks: [
          { label: "Listening", desc: "Episodio de 22 min de Silicon Valley sem legenda com 75%+ de compreensao" },
          { label: "Speaking", desc: "Entrevista tecnica de 15 min no Gemini Live com fluidez e coerencia" },
          { label: "Vocabulario", desc: "1000+ palavras retidas no Anki" },
        ],
        pass: "75%+ listening + entrevista fluente + 1000 palavras",
        fail: "4 semanas de reforco antes de iniciar fase 3.",
      },
    ],
  },
  {
    id: 3,
    label: "FASE 3",
    sublabel: "B2 -> C1",
    duration: "6-8 meses",
    color: "#f59e0b",
    bg: "#3d2a00",
    months: [
      {
        title: "Meses 1-2 - Imersao total",
        weeks: [
          {
            week: "Semanas 1-8",
            focus: "Ingles autentico sem suporte",
            daily: [
              "Lex Fridman Podcast: 30 min por dia",
              "How I Built This: 2 episodios por semana",
              "Streaming totalmente sem legenda",
              "Gemini Live (5x): entrevistas avancadas e negociacao salarial",
            ],
            meta: "80%+ em Lex Fridman - 80%+ em streaming sem legenda - negociacao fluente",
            tip: "Negociacao: 'Simulate a salary negotiation for a senior developer role.'",
          },
        ],
      },
      {
        title: "Meses 3-4 - Precisao e naturalidade",
        weeks: [
          {
            week: "Semanas 9-16",
            focus: "Zero travadas, zero esforco visivel",
            daily: [
              "Darknet Diaries: 1 episodio por dia",
              "Serie/filme sem legenda",
              "Gemini Live (5x): improviso e situacoes de conflito",
              "Escrever 1 email tecnico complexo por semana",
            ],
            meta: "Email tecnico em 5 min - conversa de 20 min sem pausas longas",
            tip: "Simule reuniao tensa com cliente insatisfeito e proponha solucao clara.",
          },
        ],
      },
      {
        title: "Meses 5-6 - Refinamento C1",
        weeks: [
          {
            week: "Semanas 17-24",
            focus: "Confianca total sob pressao",
            daily: [
              "Podcast em ingles de interesse livre",
              "Filmes complexos sem legenda",
              "Gemini Live (5x): foco nos pontos fracos",
              "1 texto tecnico por semana (arquitetura, README, blog)",
            ],
            meta: "Falar 30 min sem pausas longas - entender 85%+ de conteudo EN - escrita profissional",
            tip: "Semana 24: avaliacao final C1.",
          },
        ],
      },
    ],
    resources: [
      { icon: "POD", name: "Lex Fridman Podcast", desc: "Ingles tecnico avancado com entrevistas longas", link: "Spotify / YouTube" },
      { icon: "POD", name: "How I Built This", desc: "Business + tech com vocabulario de produto", link: "Spotify" },
      { icon: "POD", name: "Darknet Diaries", desc: "Storytelling tecnico avancado em seguranca", link: "Spotify" },
      { icon: "TV", name: "Series/filmes sem legenda", desc: "Sem excecao nesta fase", link: "Qualquer streaming" },
      { icon: "WRITE", name: "Escrita tecnica semanal", desc: "Email, README e arquitetura com tempo controlado", link: "-" },
      { icon: "LIVE", name: "Gemini Live", desc: "5x por semana para improviso, conflito e pressao", link: "App Gemini" },
    ],
    evals: [
      {
        title: "Avaliacao Bimestral (a cada 2 meses)",
        tasks: [
          { label: "Listening", desc: "30 min de Lex Fridman sem legenda com 80%+ de compreensao" },
          { label: "Speaking", desc: "Entrevista tecnica + negociacao salarial por 20 min sem pausas longas" },
          { label: "Escrita", desc: "Email tecnico complexo em 10 min sem revisao" },
        ],
        pass: "80%+ listening + 20 min fluente + email profissional",
        fail: "2 semanas de reforco no ponto fraco e nova avaliacao.",
      },
      {
        title: "Avaliacao Final C1",
        tasks: [
          { label: "Listening", desc: "Episodio completo de serie sem legenda com 85%+ de compreensao" },
          { label: "Speaking", desc: "30 min de conversa em multiplos temas com menos de 2 pausas longas" },
          { label: "Escrita", desc: "Texto tecnico de 300 palavras em 15 min com nivel profissional" },
          { label: "Pressao", desc: "Entrevista tecnica simulada de 30 min com confianca" },
        ],
        pass: "Passou nos 4 criterios e atingiu C1 funcional",
        fail: "Reforcar o criterio nao atingido por 4 semanas.",
      },
    ],
  },
];

export const geminiPrompts: GeminiPrompt[] = [
  {
    phase: "Fase 1",
    situation: "Apresentacao pessoal",
    prompt:
      "I'm practicing my English. Please be my conversation partner. After I speak, correct my grammar and vocabulary. Start by asking me to introduce myself: my name, job, family, and daily routine.",
  },
  {
    phase: "Fase 1",
    situation: "Standup meeting",
    prompt:
      "Act as my tech lead. We're in our daily standup. Ask me: what did I work on yesterday? What am I doing today? Do I have any blockers? After I answer, give me feedback on my grammar and suggest better ways to say things.",
  },
  {
    phase: "Fase 2",
    situation: "Code review",
    prompt:
      "Act as a senior Flutter developer doing a code review with me. Ask me why I made certain architectural decisions and challenge my answers. At the end, give me feedback on my English fluency.",
  },
  {
    phase: "Fase 2",
    situation: "Entrevista tecnica",
    prompt:
      "Simulate a full technical interview for a Senior Flutter developer position at an international company. Ask behavioral and technical questions. At the end, give me detailed English feedback.",
  },
  {
    phase: "Fase 3",
    situation: "Negociacao de salario",
    prompt:
      "Simulate a salary negotiation. You are an HR recruiter for an international tech company. Push back, ask for justifications, and make me negotiate with confidence.",
  },
  {
    phase: "Fase 3",
    situation: "Situacao de pressao",
    prompt:
      "Simulate a tense meeting where the client is unhappy with a delayed feature. I need to explain what happened, take responsibility, and propose a concrete solution. Push me and evaluate my English under pressure.",
  },
];
