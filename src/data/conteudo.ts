// Tudo aqui vem do mídia kit 2026 e da biografia enviada pelo artista. Nada inventado: dado novo só com fonte.

export type Video = { id: string; titulo: string; musicas: string };
export const VIDEOS: Video[] = [
  { id: 'H_wYliEwh_4', titulo: 'Apaga Apaga Apaga', musicas: 'Apaga Apaga Apaga' },
  { id: 'W9hHyNxQfK4', titulo: 'Na Maldade / Olho Encharcado', musicas: 'Na Maldade · Olho Encharcado' },
  { id: '1cz9R6D7s2E', titulo: 'I Love Baby / Vida Vazia / Fruto Especial', musicas: 'I Love Baby · Vida Vazia · Fruto Especial' },
  { id: 'nQpfv5TKhYo', titulo: 'Amor dos Outros', musicas: 'Amor dos Outros' },
];

export const NUMEROS = [
  { valor: '40 mil', rotulo: 'pessoas num show só', nota: 'Av. Itaúba, Zona Leste de Manaus, com o programa AGORA (SBT)' },
  { valor: '34', rotulo: 'casas e palcos em Manaus', nota: 'bares, casas de show, hotéis e praças' },
  { valor: '20', rotulo: 'destinos no interior do AM', nota: 'de Parintins a Lábrea' },
  { valor: '8', rotulo: 'cidades fora do estado', nota: 'de Boa Vista a São Paulo' },
];

export type Marco = { quando: string; texto: string };
export const ESTRADA: Marco[] = [
  { quando: '1987', texto: 'Elizeu dos Santos Oliveira nasce em Manaus, no dia 6 de março.' },
  { quando: 'Aos 20', texto: 'Começa a cantar na igreja, em aniversários e nas festas da família.' },
  { quando: 'Aos 24', texto: 'Forma com um amigo a dupla Lukas & David. A dupla dura pouco e ele segue carreira solo, embalado pelo sertanejo.' },
  { quando: '2014', texto: 'Vira a Sensação do sertanejo universitário em Manaus e leva o show a Presidente Figueiredo, Manacapuru, Rio Preto da Eva, Beruri, Lábrea, Humaitá, Novo Airão, Itacoatiara, Fonte Boa, Coari e Tefé.' },
  { quando: '2015–2016', texto: 'Abre horizontes fora do Amazonas: Rondônia, Fortaleza, Goiânia e Rio de Janeiro.' },
  { quando: 'Recorde', texto: 'Na mesma época, em parceria com o programa AGORA (Grupo Ramá Neves, SBT), canta para 40 mil pessoas na Avenida Itaúba, Zona Leste de Manaus.' },
  { quando: '2026', texto: 'Lança Estrada & Saudade em todas as plataformas digitais.' },
];

export const LANCAMENTO = {
  titulo: 'Estrada & Saudade',
  faixas: ['Na Maldade / Olho Encharcado', 'I Love Baby / Vida Vazia / Fruto Especial'],
};

// Listas do mídia kit ("Apresentações"). Grafia dos nomes a confirmar com o artista (ver TODO.md).
export const MANAUS = [
  'Copacabana', 'Pegadas Sertaneja', 'Clube Sertanejo', 'Terra Brasil', 'Rancho Sertanejo', 'Chapéu Goiano', 'Moai',
  'Lappa Bar', 'Leblon Macher', 'Gargalo', 'Open House', 'Zero 92', 'Bar do Elon', 'Confraria do Espeto', 'Wolf Beer Pub',
  'All Night', 'Salomé', 'Boteco Davila', 'Hotel Ibis', 'Boteco Caminho de Ksa', 'Axerito', 'Caritó', 'Hotel Mercure',
  'Meet', 'Bravo', 'Bar do Canto', 'Sindicato', 'Fuego', 'Made in Brazil', 'Ponta Negra', 'Choperia Rio Negro',
  'Esquina Choperia', 'Praça do Eldorado', 'Clube do Municipal',
];
export const INTERIOR = [
  'Manacapuru', 'Itacoatiara', 'Presidente Figueiredo', 'Autazes', 'Humaitá', 'Lábrea', 'Tefé', 'Fonte Boa', 'Coari',
  'Anamã', 'Beruri', 'Parintins', 'Careiro Castanho', 'Careiro da Várzea', 'Nova Olinda', 'Novo Airão', 'Borba',
  'Rio Preto da Eva', 'Novo Aripuanã', 'Urucu',
];
export const BRASIL = [
  { cidade: 'Boa Vista', uf: 'RR' }, { cidade: 'Ouro Preto', uf: 'RO' }, { cidade: 'Rio de Janeiro', uf: 'RJ' },
  { cidade: 'Goiânia', uf: 'GO' }, { cidade: 'Fortaleza', uf: 'CE' }, { cidade: 'São Paulo', uf: 'SP' },
  { cidade: 'Recife', uf: 'PE' }, { cidade: 'Camaçari', uf: 'BA' },
];

// Formatos do mídia kit, SEM preço (decisão do Humberto em 22/10/2026: valor só na conversa).
export type Formato = { id: string; nome: string; formacao: string[]; destaque?: string };
export const FORMATOS: Formato[] = [
  { id: 'banda-completa', nome: 'Banda completa', formacao: ['Lukas Santos (voz)', 'Bateria', 'Baixo', 'Guitarra ou violão', 'Sanfona ou teclado', 'VS'], destaque: 'Palco grande' },
  { id: 'banda-reduzida', nome: 'Banda reduzida', formacao: ['Lukas Santos (voz)', 'Bateria', 'Violões ou sanfona', 'VS'] },
  { id: 'banda-acustico', nome: 'Banda acústico', formacao: ['Lukas Santos (voz)', 'Cajón ou bateria', 'Violões', 'VS'] },
  { id: 'voz-violao-bonus', nome: 'Voz e violão + bônus', formacao: ['Lukas Santos (voz e violão)', 'Bônus: cajón ou bateria reduzida', 'VS'] },
  { id: 'voz-violoes', nome: 'Voz e violões', formacao: ['Lukas Santos (voz)', 'Violões', 'VS'], destaque: 'Mais intimista' },
];

export const EVENTOS = [
  'Shows e eventos', 'Casas de show', 'Bares e restaurantes', 'Casamentos', 'Aniversários', 'Confraternizações',
  'Festas de fim de ano', 'Bailes de formatura', 'Eventos particulares',
];

export type Musico = { nome: string; funcao: string; foto: string };
export const BANDA: Musico[] = [
  { nome: 'Jorge Sousa', funcao: 'Violão principal · Produtor musical', foto: 'banda-jorge-sousa' },
  { nome: 'Salmo Barbosa', funcao: 'Acordeon', foto: 'banda-salmo-barbosa' },
  { nome: 'Mailson Mendes', funcao: 'Contrabaixo', foto: 'banda-mailson-mendes' },
  { nome: 'Raimundo Nonato', funcao: 'Bateria', foto: 'banda-raimundo-nonato' },
  { nome: 'Alexsandro Silva', funcao: 'Violão base', foto: 'banda-alexsandro-silva' },
  { nome: 'Felipe Sena', funcao: 'Teclado', foto: 'banda-felipe-sena' },
];

export const RIDER = [
  'Mic — voz Lukas Santos', 'Violão — base', 'Violão — solo', 'Sanfona', 'Teclado', 'Contrabaixo',
  'Comunicador músicos geral', 'Comunicador cantor banda',
];

export type Foto = { arquivo: string; alt: string; largura: number; altura: number };
export const GALERIA: Foto[] = [
  { arquivo: 'palco-chapeu-canta', alt: 'Lukas Santos de chapéu cantando no palco', largura: 1128, altura: 1600 },
  { arquivo: 'estudio-chapeu', alt: 'Lukas Santos de chapéu branco e jaqueta de couro, em estúdio', largura: 854, altura: 1280 },
  { arquivo: 'palco-gargalhada', alt: 'Lukas Santos rindo com o microfone, sentado no palco', largura: 1066, altura: 1600 },
  { arquivo: 'palco-violao', alt: 'Lukas Santos tocando violão de chapéu', largura: 1066, altura: 1600 },
  { arquivo: 'estudio-oculos', alt: 'Lukas Santos de óculos escuros e jaqueta de couro, em estúdio', largura: 854, altura: 1280 },
  { arquivo: 'palco-pb-violao', alt: 'Lukas Santos com violão, em preto e branco', largura: 1066, altura: 1600 },
  { arquivo: 'palco-chapeu-sorri', alt: 'Lukas Santos sorrindo de chapéu, com a banda ao fundo', largura: 1124, altura: 1600 },
  { arquivo: 'estudio-camiseta', alt: 'Lukas Santos de camiseta branca e jaqueta de couro, em estúdio', largura: 1066, altura: 1600 },
  { arquivo: 'palco-olhar', alt: 'Lukas Santos com o microfone, olhando para o público', largura: 1066, altura: 1600 },
  { arquivo: 'palco-violao-banda', alt: 'Lukas Santos cantando de chapéu, com o violonista ao lado', largura: 1132, altura: 1600 },
  { arquivo: 'estudio-costas', alt: 'Lukas Santos de costas, ajeitando o chapéu, em estúdio', largura: 854, altura: 1280 },
  { arquivo: 'palco-casa', alt: 'Lukas Santos cantando para a casa cheia', largura: 1066, altura: 1600 },
];

export const IMPRENSA = [
  { arquivo: 'lukas-santos-estudio-chapeu.jpg', rotulo: 'Chapéu, jaqueta aberta' },
  { arquivo: 'lukas-santos-estudio-oculos.jpg', rotulo: 'Óculos escuros' },
  { arquivo: 'lukas-santos-estudio-camiseta.jpg', rotulo: 'Camiseta branca' },
  { arquivo: 'lukas-santos-estudio-chapeu-queixo.jpg', rotulo: 'Chapéu, mão no queixo' },
  { arquivo: 'lukas-santos-estudio-chapeu-frente.jpg', rotulo: 'Chapéu, de frente' },
  { arquivo: 'lukas-santos-estudio-bolsos.jpg', rotulo: 'Mãos no bolso' },
  { arquivo: 'lukas-santos-estudio-costas.jpg', rotulo: 'De costas' },
];
