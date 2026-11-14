// Hello World
/** Nome de cada capítulo: usado nos slides (aria-label) e no HUD de navegação. */
export const CHAPTERS = {
  cover: "Capa",
  film: "O filme",
  industry: "Indústria cultural",
  propaganda: "Propaganda nazista",
  stolz: "O Orgulho da Nação",
  posters: "Dois cartazes",
  meta: "Metalinguagem",
  nitrate: "Arma física",
  execution: "Câmara de execução",
  redemption: "Poder redentor",
  deal: "O acordo",
} as const;

export const CHAPTER_ORDER: readonly string[] = [
  CHAPTERS.cover,
  CHAPTERS.film,
  CHAPTERS.industry,
  CHAPTERS.propaganda,
  CHAPTERS.stolz,
  CHAPTERS.posters,
  CHAPTERS.meta,
  CHAPTERS.nitrate,
  CHAPTERS.execution,
  CHAPTERS.redemption,
  CHAPTERS.deal,
];
