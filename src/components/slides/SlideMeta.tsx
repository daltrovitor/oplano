// Hello World
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

const MIRRORS = [
  {
    label: "O astro",
    inside: "Zoller, herói fabricado por Goebbels.",
    outside: "Brad Pitt e Christoph Waltz, astros do estúdio.",
  },
  {
    label: "A plateia",
    inside: "Nazistas vibram com soldados mortos na tela.",
    outside: "Nós vibramos quando Hitler é metralhado.",
  },
  {
    label: "O estilo",
    inside: "Letra gótica, marcha e uniforme.",
    outside: "Letreiros de faroeste, Morricone e sangue em cores vivas.",
  },
] as const;

/** Slide 7 — Metalinguagem: o filme usa a indústria cultural para expor a indústria cultural. */
export function SlideMeta() {
  return (
    <SlideShell id="metalinguagem" title={CHAPTERS.meta} backdrop="/img/donny-gun.jpg" widthVw={150}>
      <div className="flex h-full items-center gap-[6vw] lg:gap-[4vw]">
        <div className="flex w-[84vw] shrink-0 flex-col gap-3 lg:w-[min(42vw,640px)] lg:gap-5">
          <MaskedTitle
            text="O cinema olha para o cinema"
            accent={[5]}
            className="t-display t-title"
          />
          <p data-rise className="t-body">
            Bastardos Inglórios é um filme sobre o poder das imagens, feito com o poder das
            imagens. Para atacar a propaganda nazista, Tarantino usa as armas da própria
            indústria cultural: estrelas, gêneros, trilha, violência estilizada e um final que o
            público quer ver.
          </p>
          <div data-rise className="t-body hidden grid-cols-[auto_1fr_1fr] gap-x-5 gap-y-3 lg:grid">
            <span />
            <span className="font-semibold text-ink">Dentro do filme</span>
            <span className="font-semibold text-accent">Fora do filme</span>
            {MIRRORS.map((row) => (
              <div key={row.label} className="contents">
                <span className="border-t border-line pt-2 font-semibold text-ink">{row.label}</span>
                <span className="border-t border-line pt-2">{row.inside}</span>
                <span className="border-t border-line pt-2">{row.outside}</span>
              </div>
            ))}
          </div>
        </div>

        <Frame
          src="/img/donny-gun.jpg"
          alt="Donny Donowitz metralhando a plateia nazista de dentro de um camarote vermelho"
          caption="A armadilha moral: a plateia do cinema também quer ver a violência."
          className="w-[84vw] shrink-0 sm:w-[52vw] lg:w-[min(36vw,calc(40svh*2))]"
          aspect="1780/890"
          clip="l"
          speed={0.05}
          sizes="(min-width: 1024px) 36vw, 84vw"
        />

        <div className="flex w-[78vw] shrink-0 flex-col gap-4 lg:w-[min(24vw,380px)] lg:gap-6">
          <Frame
            src="/img/hitler-map.jpg"
            alt="Hitler, interpretado por Martin Wuttke, diante de um mapa da Europa dominado por suásticas"
            caption="Hitler como personagem de cinema: o ditador vira figura de ficção."
            className="w-full"
            aspect="1000/563"
            clip="u"
            speed={-0.06}
            sizes="(min-width: 1024px) 24vw, 78vw"
          />
          <p data-rise className="t-body hidden border-l-2 border-accent pl-4 lg:block">
            Walter Benjamin chamou de <span className="font-semibold text-ink">estetização da política</span>{" "}
            o uso da arte para tornar a violência bela e desejável (1936). O filme expõe esse
            mecanismo ao colocar a plateia do lado de dentro dele.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}
