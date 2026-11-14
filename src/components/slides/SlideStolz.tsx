// Hello World
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

/** Slide 5 — O Orgulho da Nação (Stolz der Nation): o filme de propaganda dentro do filme. */
export function SlideStolz() {
  return (
    <SlideShell id="stolz-der-nation" title={CHAPTERS.stolz} backdrop="/img/stolz-scene-2.jpg" widthVw={185}>
      <div className="flex h-full items-center gap-[6vw] lg:gap-[4vw]">
        <div className="flex w-[84vw] shrink-0 flex-col gap-3 lg:w-[min(36vw,580px)] lg:gap-6">
          <MaskedTitle
            text={"Stolz\nder Nation"}
            srText="Stolz der Nation, ou O Orgulho da Nação"
            accent={[2]}
            className="font-fraktur text-[clamp(2.6rem,12vw,4rem)] font-bold leading-[0.95] lg:text-[clamp(3.6rem,6.4vw,7rem)]"
          />
          <p data-rise className="t-display text-[clamp(1rem,1.5vw,1.6rem)] font-semibold italic text-ink">
            O Orgulho da Nação: o filme dentro do filme.
          </p>
          <p data-rise className="t-body">
            No filme, essa lógica aparece em O Orgulho da Nação, onde um combate desesperado é
            transformado em espetáculo épico de supremacia ariana. A montagem manipula a
            plateia, nazista e moderna, fazendo todos vibrarem com a violência antes de
            perceberem a armadilha moral.
          </p>
        </div>

        <Frame
          src="/img/zoller.jpg"
          alt="Fredrick Zoller, o soldado alemão que estrela o filme de propaganda, em close"
          caption="Fredrick Zoller (Daniel Brühl): o herói de guerra que interpreta a si mesmo na tela."
          className="w-[80vw] shrink-0 sm:w-[46vw] lg:w-[min(30vw,calc(40svh*1.9))]"
          aspect="1200/630"
          clip="l"
          speed={0.05}
          sizes="(min-width: 1024px) 30vw, 80vw"
        />

        <Frame
          src="/img/stolz-scene-1.jpg"
          alt="Soldado alemão mirando um fuzil ao lado de um companheiro, em cena em preto e branco"
          caption="Cena de Stolz der Nation: o soldado sozinho contra todos, em preto e branco."
          className="w-[62vw] shrink-0 self-start sm:w-[34vw] lg:mt-[4svh] lg:w-[min(24vw,calc(46svh*1.33))]"
          aspect="1011/760"
          clip="u"
          speed={-0.05}
          sizes="(min-width: 1024px) 24vw, 62vw"
        />

        <Frame
          src="/img/stolz-scene-2.jpg"
          alt="Franco-atirador em cena de Stolz der Nation, com uma suástica desenhada por tiros na parede"
          caption="A suástica desenhada a tiros: a violência vira assinatura ideológica."
          className="w-[76vw] shrink-0 self-end sm:w-[42vw] lg:mb-[3svh] lg:w-[min(27vw,calc(44svh*1.5))]"
          aspect="1200/800"
          clip="r"
          speed={0.1}
          sizes="(min-width: 1024px) 27vw, 76vw"
        />

        <Frame
          src="/img/stolz-audience.jpg"
          alt="Um homem de smoking diante da tela, onde passa o filme de propaganda, e a plateia em silhueta"
          caption="Dentro do cinema, a plateia assiste ao filme dentro do filme."
          className="mr-[4vw] w-[78vw] shrink-0 sm:w-[44vw] lg:w-[min(26vw,calc(36svh*1.78))]"
          aspect="750/422"
          clip="l"
          speed={0.03}
          sizes="(min-width: 1024px) 26vw, 78vw"
        />
      </div>
    </SlideShell>
  );
}
