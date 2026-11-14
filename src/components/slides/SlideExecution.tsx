// Hello World
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

/** Slide 9 — A sala de cinema como câmara de execução (Le Gamaar em chamas). */
export function SlideExecution() {
  return (
    <SlideShell id="camara-de-execucao" title={CHAPTERS.execution} backdrop="/img/legamaar.jpg" widthVw={185}>
      <div className="flex h-full items-center gap-[6vw] lg:gap-[4vw]">
        <div className="flex w-[84vw] shrink-0 flex-col gap-3 lg:w-[min(36vw,580px)] lg:gap-6">
          <MaskedTitle
            text="A sala de cinema como câmara de execução"
            accent={[5, 6]}
            className="t-display t-title"
          />
          <p data-rise className="t-body">
            Arquitetonicamente, o cinema é o espaço da passividade e da confiança cega. Ao
            trancar as portas pelo lado de fora e incendiar a tela, Tarantino transforma o
            templo de adoração nazista em uma câmara de extermínio perfeita.
          </p>
          <p
            data-rise
            className="t-body border-l-2 border-accent pl-4 font-semibold text-ink"
          >
            Na vida real, os líderes do Reich morreram de formas bem diferentes; mas na tela, o
            cinema cumpre seu ato definitivo: reescrever e vingar a História através da própria
            arte.
          </p>
        </div>

        <Frame
          src="/img/legamaar.jpg"
          alt="Shosanna observa, do alto, a multidão e as bandeiras nazistas diante do cinema Le Gamaar"
          caption="O cinema Le Gamaar na noite da estreia: bandeiras, uniformes e uma única saída."
          className="w-[82vw] shrink-0 self-start sm:w-[46vw] lg:mt-[4svh] lg:w-[min(30vw,calc(38svh*1.78))]"
          aspect="780/438"
          clip="l"
          speed={0.05}
          sizes="(min-width: 1024px) 30vw, 82vw"
        />

        <Frame
          src="/img/shosanna-veil.jpg"
          alt="Shosanna, de vestido vermelho e véu preto, diante das cortinas vermelhas do cinema"
          caption="Shosanna, de vermelho: a anfitriã que tranca as portas."
          className="w-[84vw] shrink-0 self-end sm:w-[48vw] lg:mb-[2svh] lg:w-[min(32vw,calc(36svh*2))]"
          aspect="2/1"
          clip="u"
          speed={-0.05}
          sizes="(min-width: 1024px) 32vw, 84vw"
        />

        <Frame
          src="/img/hitler-fire.jpg"
          alt="Hitler atingido pelos tiros no camarote, cercado por faíscas e por uma bandeira com suástica"
          caption="Na tela, a cúpula do Reich morre na sala escura onde se sentia segura."
          className="mr-[4vw] w-[84vw] shrink-0 sm:w-[48vw] lg:w-[min(32vw,calc(42svh*1.78))]"
          aspect="1422/800"
          clip="r"
          speed={0.09}
          sizes="(min-width: 1024px) 32vw, 84vw"
        />
      </div>
    </SlideShell>
  );
}
