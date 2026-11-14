// Hello World
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

/** Slide 4 — Cinema como máquina de propaganda nazista (Goebbels, Ufa, noticiários, Riefenstahl). */
export function SlidePropaganda() {
  return (
    <SlideShell
      id="propaganda"
      title={CHAPTERS.propaganda}
      backdrop="/img/rally.jpg"
      widthVw={205}
    >
      <div className="flex h-full items-center gap-[6vw] desk:gap-[4vw]">
        <div className="flex w-[84vw] shrink-0 flex-col gap-3 desk:w-[min(35vw,560px)] short:w-[46vw] desk:gap-6">
          <MaskedTitle
            text="O cinema como máquina de propaganda nazista"
            accent={[4, 5]}
            className="t-display t-title"
          />
          <p data-rise className="t-body">
            Historicamente, o Ministério da Propaganda de Joseph Goebbels viu o cinema não só
            como entretenimento, mas como uma linha de montagem de obediência.
          </p>
          <ul data-rise className="t-body hidden space-y-2 sm:block">
            <li className="border-l-2 border-ink pl-3">
              O Estado controlou a produtora Ufa e a indústria do cinema.
            </li>
            <li className="border-l-2 border-ink pl-3">
              Os noticiários (Wochenschau) eram exibidos antes de cada filme.
            </li>
            <li className="border-l-2 border-ink pl-3">
              O comício virava espetáculo: Triunfo da Vontade, de Leni Riefenstahl (1935).
            </li>
          </ul>
        </div>

        <Frame
          src="/img/goebbels-portrait.jpg"
          alt="Retrato em preto e branco de Joseph Goebbels"
          caption="Joseph Goebbels, ministro da Propaganda do Reich de 1933 a 1945."
          className="w-[56vw] shrink-0 sm:w-[34vw] desk:w-[min(20vw,calc(46svh*0.72))]"
          aspect="418/580"
          clip="u"
          speed={0.06}
          sizes="(min-width: 1024px) 20vw, 56vw"
        />

        <Frame
          src="/img/rally.jpg"
          alt="Comício nazista em Nuremberg, com milhares de soldados em formação diante da tribuna"
          caption="Comício nazista em Nuremberg: o tipo de imagem que o cinema de Riefenstahl transformou em espetáculo."
          className="w-[82vw] shrink-0 self-start sm:w-[50vw] desk:mt-[4svh] desk:w-[min(32vw,calc(36svh*1.78))]"
          aspect="16/9"
          clip="l"
          speed={-0.04}
          sizes="(min-width: 1024px) 32vw, 82vw"
        />

        <Frame
          src="/img/newsreel-queue.jpg"
          alt="Fila diante de um cinema de Paris que anuncia os noticiários alemães"
          caption="Paris ocupada: fila para o cinema que exibia os noticiários alemães."
          className="w-[62vw] shrink-0 self-end sm:w-[40vw] desk:mb-[2svh] desk:w-[min(25vw,calc(40svh*1.31))]"
          aspect="1300/991"
          clip="r"
          speed={0.09}
          sizes="(min-width: 1024px) 25vw, 62vw"
        />

        <Frame
          src="/img/kolberg-poster.jpg"
          alt="Cartaz do filme Kolberg, superprodução nazista de 1945"
          caption="Kolberg (1945): superprodução encomendada pelo regime em plena derrota."
          className="w-[50vw] shrink-0 sm:w-[28vw] desk:w-[min(17vw,calc(52svh*0.667))]"
          aspect="2/3"
          clip="u"
          speed={0.05}
          sizes="(min-width: 1024px) 17vw, 50vw"
        />

        <Frame
          src="/img/goebbels-hitler-camera.jpg"
          alt="Dirigentes nazistas posando ao lado de uma câmera de cinema"
          caption="Dirigentes nazistas ao lado de uma câmera: o cinema como assunto de Estado."
          className="mr-[4vw] w-[70vw] shrink-0 self-start sm:w-[44vw] desk:mt-[6svh] desk:w-[min(22vw,calc(34svh*1.6))]"
          aspect="640/400"
          clip="l"
          speed={-0.07}
          sizes="(min-width: 1024px) 22vw, 70vw"
        />
      </div>
    </SlideShell>
  );
}
