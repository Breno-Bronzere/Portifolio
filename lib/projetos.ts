export type Projeto = {
  slug: string;
  nome: string;
  tipo: string;
  ano: string;
  resumo: string;
  numeros?: { valor: string; rotulo: string }[];
  feito: string[];
  stack: string[];
  imagem?: { src: string; alt: string };
  link?: { href: string; label: string };
};

// Dados de 04/11/2026.
export const numerosReset = [
  { valor: "3,4 mil", rotulo: "jogadores já entraram" },
  { valor: "23,7 mil", rotulo: "horas jogadas" },
  { valor: "148", rotulo: "online ao mesmo tempo no pico" },
];
export const dataNumeros = "4 de novembro de 2026";

export const projetos: Projeto[] = [
  {
    slug: "reset-gg",
    nome: "Reset GG",
    tipo: "Servidor de GTA RP (FiveM)",
    ano: "2026",
    resumo:
      "Servidor no ar desde julho. Cuido da operação e dos sistemas que a cidade usa e que não vieram prontos.",
    numeros: [
      { valor: "4.805", rotulo: "contas" },
      { valor: "3.468", rotulo: "jogadores únicos" },
      { valor: "23.766", rotulo: "horas jogadas" },
      { valor: "161", rotulo: "resources" },
    ],
    feito: [
      "Ranking semanal e mensal de kills em evento, com o prêmio entregue pela loja.",
      "/evento para os próprios jogadores criarem eventos.",
      "Cargos da staff com níveis, cada um só com o que precisa.",
      "Roleta diária com skin de 24 horas e VIP automático para quem dá boost no Discord.",
      "29 telas do jogo ajustadas para qualquer resolução, do 4:3 ao ultrawide.",
      "/tela: compartilhamento de tela com som, direto no navegador.",
      "Entrada pelo Discord quando a Steam não abre no FiveM.",
      "Spawn novo, caixas de Halloween e mapas otimizados.",
    ],
    stack: ["Lua", "vRP", "MariaDB", "JavaScript", "Docker", "Linux"],
  },
  {
    slug: "treino",
    nome: "/treino",
    tipo: "Treino de mira dentro do jogo",
    ano: "2026",
    resumo:
      "Um aim trainer dentro do servidor. O jogador treina num hangar só dele, contra clones de si mesmo, com nota, recorde e ranking.",
    numeros: [
      { valor: "10", rotulo: "modos" },
      { valor: "11 mil", rotulo: "linhas de código" },
    ],
    feito: [
      "Flick, tracking, leitura de movimento, smoke, carro, drive-by e helicóptero.",
      "Benchmark com cenários fixos de 60 segundos.",
      "Ranking por modo e dificuldade, percentil e gráfico de evolução.",
      "Clones e carros existem só na tela de quem treina, sem pesar na cidade.",
    ],
    stack: ["Lua", "FiveM", "HTML", "CSS", "JavaScript", "MariaDB"],
    imagem: { src: "/nuis/treino.png", alt: "Menu do /treino com a lista de modos e o resultado de uma rodada" },
  },
  {
    slug: "resetgg-com",
    nome: "resetgg.com",
    tipo: "Site e loja com entrega no jogo",
    ano: "2026",
    resumo:
      "Site e loja do servidor, no lugar de uma plataforma paga. O jogador entra com o Discord, paga, e o item chega no personagem sozinho.",
    numeros: [
      { valor: "155", rotulo: "pedidos" },
      { valor: "3", rotulo: "formas de pagamento" },
    ],
    feito: [
      "Login com Discord e PIX, cartão e PayPal.",
      "Entrega automática no jogo, sem item em dobro.",
      "Carrinho com vários itens e cupons de parceiro.",
      "Ranking de kills público e painel da staff com manual e quiz.",
    ],
    stack: ["Node.js", "Express", "SQLite", "Mercado Pago", "PayPal", "Docker"],
    link: { href: "https://resetgg.com", label: "Abrir o site" },
  },
  {
    slug: "bots-discord",
    nome: "Bots do Discord",
    tipo: "Integração Discord e jogo",
    ano: "2026",
    resumo: "Os bots que ligam a comunidade ao servidor: whitelist, suporte e ferramentas da staff.",
    numeros: [{ valor: "4,6 mil", rotulo: "contas na whitelist" }],
    feito: [
      "Whitelist por painel, gravando direto no banco do jogo.",
      "Pesquisa global de jogador e consulta da staff pelo Discord.",
    ],
    stack: ["TypeScript", "discord.js", "Node.js", "Docker"],
  },
  {
    slug: "financas-familia",
    nome: "Controle Financeiro Familiar",
    tipo: "App para a minha casa",
    ano: "2026",
    resumo: "Um app para a família ver para onde o dinheiro vai. Roda no meu servidor de casa.",
    numeros: [
      { valor: "65", rotulo: "testes" },
      { valor: "239", rotulo: "regras de categoria" },
    ],
    feito: [
      "Importa extrato em OFX e CSV e categoriza sozinho.",
      "Conexão com os bancos pela Pluggy.",
      "Gastos dos últimos 6 meses, por categoria, por pessoa e por assinatura.",
      "Backup toda noite.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Better Auth", "Vitest"],
  },
];

export type Nui = { src: string; titulo: string; texto: string; enquadrar?: "centro" | "retrato" };

export const nuis: Nui[] = [
  {
    src: "/nuis/guia.png",
    titulo: "Guia de boas-vindas",
    texto: "A primeira tela de quem entra na cidade.",
    enquadrar: "centro",
  },
  {
    src: "/nuis/treino.png",
    titulo: "/treino, modos",
    texto: "Escolha do modo e o resultado da última rodada.",
    enquadrar: "centro",
  },
  {
    src: "/nuis/treino-benchmark.png",
    titulo: "/treino, benchmark",
    texto: "Rotinas e cenários fixos.",
    enquadrar: "retrato",
  },
  {
    src: "/nuis/treino-ranking.png",
    titulo: "/treino, ranking",
    texto: "Ranking por modo e dificuldade.",
    enquadrar: "retrato",
  },
];

export const stackGrupos = [
  { titulo: "Linguagens", itens: "TypeScript, JavaScript, Lua, SQL, HTML e CSS" },
  { titulo: "Front-end", itens: "React, Next.js, Tailwind CSS, NUI do FiveM" },
  { titulo: "Back-end", itens: "Node.js, Express, APIs REST, discord.js" },
  { titulo: "Banco", itens: "PostgreSQL, MySQL, MariaDB, SQLite" },
  { titulo: "Infra", itens: "Docker, Linux, VPS" },
  { titulo: "Integrações", itens: "Mercado Pago, PayPal, Pluggy, Discord" },
];
