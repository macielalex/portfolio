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
        title: "Mês 1 - Fundação",
        weeks: [
          {
            week: "Semana 1",
            focus: "Setup + primeiros passos",
            daily: [
              "BBC Learning English: playlist 'English in a Minute' - 1 vídeo por dia (YouTube)",
              "Baixar Anki (Android, gratuito) e instalar deck 'Basic English 500 words'",
              "Gemini Live: se apresentar em inglês por 3 minutos (nome, trabalho, família)",
            ],
            meta: "7 vídeos BBC assistidos - 50 palavras no Anki - 1 sessão Gemini Live",
            tip: "Não se preocupe com erro. O objetivo desta semana é só começar.",
          },
          {
            week: "Semana 2",
            focus: "Listening diário + pronúncia",
            daily: [
              "6 Minute English (BBC Podcast no Spotify) - 1 episódio por dia",
              "English with Lucy no YouTube - série de pronúncia básica (1 vídeo/dia)",
              "Anki: mínimo 10 novas palavras por dia",
              "Gemini Live (3x): falar sobre sua rotina diária por 3 minutos",
            ],
            meta: "7 episódios 6 Min English - 70 novas palavras Anki - 3 sessões Gemini Live",
            tip: "Prompt sugerido: 'Correct my grammar after I speak. I'll talk about my daily routine.'",
          },
          {
            week: "Semana 3",
            focus: "Streaming entra na rotina",
            daily: [
              "6 Minute English diário (Spotify)",
              "Streaming: 20 min de série conhecida com legenda em INGLÊS (Friends ou The Office)",
              "Anki diário",
              "Gemini Live (3x): descrever uma cena da série que assistiu",
            ],
            meta: "7 episódios 6 Min English - 140 min de streaming - 3 sessões Gemini Live",
            tip: "Não usar legenda em português. Mesmo sem entender tudo, o cérebro adapta.",
          },
          {
            week: "Semana 4",
            focus: "AVALIAÇÃO MENSAL 1",
            daily: [],
            meta: "",
            tip: "",
            isEval: true,
          },
        ],
      },
      {
        title: "Mês 2 - Construção",
        weeks: [
          {
            week: "Semanas 5-6",
            focus: "Shadowing começa",
            daily: [
              "6 Minute English diário com shadowing",
              "Streaming: 30 min com legenda EN",
              "Anki diario - meta: 400 palavras totais",
              "Gemini Live (3x): conversas sobre trabalho (standup simulado)",
            ],
            meta: "14 ep. 6 Min English com shadowing - 400+ palavras Anki - 6 sessões Gemini Live",
            tip: "Standup: 'Act as my tech lead. Ask yesterday, today and blockers.'",
          },
          {
            week: "Semanas 7-8",
            focus: "Consolidação + vocabulário técnico",
            daily: [
              "6 Minute English + shadowing",
              "Streaming: 30 min e menos pausas na legenda",
              "Anki: adicionar vocabulário técnico de Flutter/dev",
              "Gemini Live (3x): explicar código em inglês por 5 min",
            ],
            meta: "500+ palavras Anki - explicar uma feature com poucas pausas",
            tip: "Semana 8 termina com avaliação mensal 2.",
          },
        ],
      },
      {
        title: "Mês 3 - Consolidação",
        weeks: [
          {
            week: "Semanas 9-11",
            focus: "Mistura + fluência crescente",
            daily: [
              "3 dias: 6 Minute English com shadowing",
              "4 dias: streaming 30 min com legenda EN",
              "Anki: revisão + 5 novas palavras por dia",
              "Gemini Live (4x): standup + perguntas técnicas simples",
            ],
            meta: "600+ palavras - standup de 5 min com boa fluidez - 75% de compreensão no streaming",
            tip: "Na semana 11, testar trechos sem legenda para medir compreensão real.",
          },
          {
            week: "Semana 12",
            focus: "AVALIAÇÃO DE FASE 1",
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
      { icon: "TV", name: "English with Lucy", desc: "Pronúncia clara e vídeos curtos", link: "youtube.com/@EnglishwithLucy" },
      { icon: "ANKI", name: "Anki", desc: "Deck recomendado: 'Basic English 500 words'", link: "Play Store -> Anki" },
      { icon: "TV", name: "Streaming", desc: "Séries com legenda apenas em inglês", link: "Netflix / Prime / etc." },
      { icon: "LIVE", name: "Gemini Live", desc: "Pratica oral 3x por semana", link: "App Gemini (Android)" },
    ],
    evals: [
      {
        title: "Avaliação Mensal 1 (fim semana 4)",
        tasks: [
          { label: "Listening", desc: "3 episódios do 6 Minute English sem legenda e resumo do tema" },
          { label: "Speaking", desc: "2 min sobre daily routine no Gemini Live sem preparo" },
          { label: "Vocabulário", desc: "Anki com acerto acima de 70%" },
        ],
        pass: "Compreensão básica + fala com fluidez inicial + Anki 70%+",
        fail: "Repetir mes 1 com novos episodios.",
      },
      {
        title: "Avaliação Mensal 2 (fim semana 8)",
        tasks: [
          { label: "Listening", desc: "20 min de serie com legenda EN e resumo em 5 frases" },
          { label: "Speaking", desc: "Conversa de 5 min com menos de 3 pausas longas" },
          { label: "Vocabulário", desc: "400+ palavras retidas no Anki" },
        ],
        pass: "Resumo claro + conversa 5 min + 400 palavras",
        fail: "Repetir mes 2 por 3 semanas.",
      },
      {
        title: "Avaliação de Fase 1 (fim semana 12)",
        tasks: [
          { label: "Listening", desc: "2 episódios do 6 Minute English sem legenda com 70%+ de compreensão" },
          { label: "Speaking", desc: "Standup simulado de 5 min: yesterday, today e blockers" },
          { label: "Vocabulário", desc: "600+ palavras retidas no Anki" },
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
        title: "Meses 1-2 - Inglês autêntico",
        weeks: [
          {
            week: "Semanas 1-4",
            focus: "Easy English + TED-Ed entram",
            daily: [
              "Easy English (YouTube): 1 vídeo por dia com legenda EN",
              "TED-Ed (YouTube): 1 video por semana, primeiro com legenda EN, depois sem",
              "Streaming: serie nova (Silicon Valley, Suits, Black Mirror) com legenda EN",
              "Anki: vocabulário técnico de dev/trabalho (mínimo 5 novas por dia)",
              "Gemini Live (4x/semana): code review simulado + perguntas técnicas",
            ],
            meta: "28 vídeos Easy English - 4 TED-Ed - 800+ palavras Anki",
            tip: "Code review: 'Act as a senior developer reviewing my Flutter code.'",
          },
          {
            week: "Semanas 5-8",
            focus: "Reduzir dependência de legenda",
            daily: [
              "English Learning for Curious Minds (Spotify): 1 episodio por dia",
              "TED-Ed: assistir sem legenda primeiro, depois conferir",
              "Streaming: alternar 2 dias sem legenda e 2 com legenda EN",
              "Gemini Live (4x): simulacao de 1:1 e feedback",
            ],
            meta: "70%+ em TED-Ed sem legenda - 1:1 de 10 min com boa fluidez",
            tip: "Semana 8: avaliação mensal da fase 2.",
          },
        ],
      },
      {
        title: "Meses 3-4 - Comunicação técnica",
        weeks: [
          {
            week: "Semanas 9-12",
            focus: "Vocabulário técnico avançado",
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
              "Podcast de tech em inglês (Syntax.fm, Flutter Dev Podcast)",
              "Streaming 70% sem legenda",
              "Gemini Live: conversas sem tema definido",
            ],
            meta: "Conversar 10 min sem preparo - entender 80% de podcast técnico",
            tip: "Semana 16: avaliação final da fase 2.",
          },
        ],
      },
    ],
    resources: [
      { icon: "TV", name: "Easy English", desc: "Inglês real de rua com legendas EN/PT", link: "youtube.com/@EasyEnglishTeam" },
      { icon: "TV", name: "TED-Ed", desc: "Temas variados com vocabulário rico", link: "youtube.com/@TededTalks" },
      { icon: "POD", name: "English Learning for Curious Minds", desc: "Podcast B1/B2 com episodios tematicos", link: "Spotify -> 'English Learning for Curious Minds'" },
      { icon: "POD", name: "Flutter Dev Podcast / Syntax.fm", desc: "Podcasts tecnicos reais para vocabulario diario", link: "Spotify" },
      { icon: "TV", name: "Silicon Valley / Suits / Black Mirror", desc: "Series com vocabulario profissional e tech", link: "Streaming" },
      { icon: "LIVE", name: "Gemini Live", desc: "4x por semana para code review, 1:1 e entrevistas", link: "App Gemini" },
    ],
    evals: [
      {
        title: "Avaliação Mensal (fim de cada mês)",
        tasks: [
          { label: "Listening", desc: "TED-Ed de 10 min sem legenda e resumo de 3 pontos em inglês" },
          { label: "Speaking", desc: "Code review de 10 min no Gemini Live explicando decisões técnicas" },
          { label: "Vocabulário", desc: "800+ palavras retidas no Anki com mais de 70% de acerto" },
        ],
        pass: "3 pontos corretos + code review claro + 800 palavras",
        fail: "Mais 3 semanas no mesmo mês e nova avaliação.",
      },
      {
        title: "Avaliação de Fase 2 (fim semana 16)",
        tasks: [
          { label: "Listening", desc: "Episódio de 22 min de Silicon Valley sem legenda com 75%+ de compreensão" },
          { label: "Speaking", desc: "Entrevista técnica de 15 min no Gemini Live com fluidez e coerência" },
          { label: "Vocabulário", desc: "1000+ palavras retidas no Anki" },
        ],
        pass: "75%+ listening + entrevista fluente + 1000 palavras",
        fail: "4 semanas de reforço antes de iniciar fase 3.",
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
        title: "Meses 1-2 - Imersão total",
        weeks: [
          {
            week: "Semanas 1-8",
            focus: "Inglês autêntico sem suporte",
            daily: [
              "Lex Fridman Podcast: 30 min por dia",
              "How I Built This: 2 episodios por semana",
              "Streaming totalmente sem legenda",
              "Gemini Live (5x): entrevistas avançadas e negociação salarial",
            ],
            meta: "80%+ em Lex Fridman - 80%+ em streaming sem legenda - negociação fluente",
            tip: "Negociação: 'Simulate a salary negotiation for a senior developer role.'",
          },
        ],
      },
      {
        title: "Meses 3-4 - Precisão e naturalidade",
        weeks: [
          {
            week: "Semanas 9-16",
            focus: "Zero travadas, zero esforco visivel",
            daily: [
              "Darknet Diaries: 1 episodio por dia",
              "Serie/filme sem legenda",
              "Gemini Live (5x): improviso e situações de conflito",
              "Escrever 1 email tecnico complexo por semana",
            ],
            meta: "Email técnico em 5 min - conversa de 20 min sem pausas longas",
            tip: "Simule reuniao tensa com cliente insatisfeito e proponha solucao clara.",
          },
        ],
      },
      {
        title: "Meses 5-6 - Refinamento C1",
        weeks: [
          {
            week: "Semanas 17-24",
            focus: "Confiança total sob pressão",
            daily: [
              "Podcast em ingles de interesse livre",
              "Filmes complexos sem legenda",
              "Gemini Live (5x): foco nos pontos fracos",
              "1 texto técnico por semana (arquitetura, README, blog)",
            ],
            meta: "Falar 30 min sem pausas longas - entender 85%+ de conteudo EN - escrita profissional",
            tip: "Semana 24: avaliação final C1.",
          },
        ],
      },
    ],
    resources: [
      { icon: "POD", name: "Lex Fridman Podcast", desc: "Inglês técnico avançado com entrevistas longas", link: "Spotify / YouTube" },
      { icon: "POD", name: "How I Built This", desc: "Business + tech com vocabulário de produto", link: "Spotify" },
      { icon: "POD", name: "Darknet Diaries", desc: "Storytelling técnico avançado em segurança", link: "Spotify" },
      { icon: "TV", name: "Series/filmes sem legenda", desc: "Sem excecao nesta fase", link: "Qualquer streaming" },
      { icon: "WRITE", name: "Escrita técnica semanal", desc: "Email, README e arquitetura com tempo controlado", link: "-" },
      { icon: "LIVE", name: "Gemini Live", desc: "5x por semana para improviso, conflito e pressao", link: "App Gemini" },
    ],
    evals: [
      {
        title: "Avaliação Bimestral (a cada 2 meses)",
        tasks: [
          { label: "Listening", desc: "30 min de Lex Fridman sem legenda com 80%+ de compreensão" },
          { label: "Speaking", desc: "Entrevista técnica + negociação salarial por 20 min sem pausas longas" },
          { label: "Escrita", desc: "Email técnico complexo em 10 min sem revisão" },
        ],
        pass: "80%+ listening + 20 min fluente + email profissional",
        fail: "2 semanas de reforço no ponto fraco e nova avaliação.",
      },
      {
        title: "Avaliação Final C1",
        tasks: [
          { label: "Listening", desc: "Episódio completo de série sem legenda com 85%+ de compreensão" },
          { label: "Speaking", desc: "30 min de conversa em múltiplos temas com menos de 2 pausas longas" },
          { label: "Escrita", desc: "Texto técnico de 300 palavras em 15 min com nível profissional" },
          { label: "Pressão", desc: "Entrevista técnica simulada de 30 min com confiança" },
        ],
        pass: "Passou nos 4 critérios e atingiu C1 funcional",
        fail: "Reforçar o critério não atingido por 4 semanas.",
      },
    ],
  },
];

export const geminiPrompts: GeminiPrompt[] = [
  {
    phase: "Fase 1",
    situation: "Apresentação pessoal",
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
    situation: "Entrevista técnica",
    prompt:
      "Simulate a full technical interview for a Senior Flutter developer position at an international company. Ask behavioral and technical questions. At the end, give me detailed English feedback.",
  },
  {
    phase: "Fase 3",
    situation: "Negociação de salário",
    prompt:
      "Simulate a salary negotiation. You are an HR recruiter for an international tech company. Push back, ask for justifications, and make me negotiate with confidence.",
  },
  {
    phase: "Fase 3",
    situation: "Situação de pressão",
    prompt:
      "Simulate a tense meeting where the client is unhappy with a delayed feature. I need to explain what happened, take responsibility, and propose a concrete solution. Push me and evaluate my English under pressure.",
  },
];
