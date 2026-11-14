// Hello World
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

/** Slide 10 — O poder redentor e simbólico da sétima arte: tela dividida em três planos. */
export function SlideRedemption() {
  return (
    <SlideShell id="poder-redentor" title={CHAPTERS.redemption} backdrop="/img/face-fire.jpg">
      <div className="relative flex h-full flex-col gap-3">
        <div className="flex h-[27svh] gap-2 lg:contents">
          <Frame
            src="/img/face-fire.jpg"
            alt="O rosto gigante de Shosanna, projetado na fumaça, em meio às chamas"
            caption="O rosto de Shosanna projetado nas chamas."
            className="h-full flex-1 lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[44%] lg:flex-none"
            clip="r"
            position="center 30%"
            marks={false}
            sizes="(min-width: 1024px) 44vw, 50vw"
          />
          <Frame
            src="/img/tarantino.jpg"
            alt="Quentin Tarantino, de camisa xadrez, gesticulando em um painel público"
            caption="Quentin Tarantino: o diretor como marca registrada."
            className="h-full flex-1 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[44%] lg:flex-none"
            clip="l"
            position="50% 35%"
            marks={false}
            speed={0.04}
            sizes="(min-width: 1024px) 44vw, 50vw"
          />
        </div>

        <div className="relative z-10 flex min-h-0 flex-col gap-3 bg-white lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[min(34vw,540px)] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:gap-5 lg:border lg:border-line lg:p-9">
          <MaskedTitle
            text="O poder redentor da sétima arte"
            accent={[3, 4, 5]}
            className="t-display t-title"
          />
          <p data-rise className="t-body">
            Por fim, Tarantino eleva o cinema à sua dimensão mais puramente simbólica. A História
            real é irreversível e cheia de tragédias imutáveis, mas a sétima arte tem um
            superpoder: a reparação ficcional. Ao queimar os tiranos dentro da própria sala
            escura, o diretor defende que, no reino das imagens, a arte pode corrigir os
            traumas do passado e dar à justiça o final apoteótico que ela merecia.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}
