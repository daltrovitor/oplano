// Hello World
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

/** Slide 8 — O cinema como arma física: o nitrato de celulose. */
export function SlideNitrate() {
  return (
    <SlideShell id="arma-fisica" title={CHAPTERS.nitrate} backdrop="/img/nitrate-flame.jpg" widthVw={175}>
      <div className="flex h-full items-center gap-[6vw] desk:gap-[4vw]">
        <div className="flex w-[84vw] shrink-0 flex-col gap-3 desk:w-[min(36vw,580px)] short:w-[46vw] desk:gap-6">
          <MaskedTitle
            text="O cinema como arma física"
            accent={[3, 4]}
            className="t-display t-title"
          />
          <p data-rise className="t-body">
            Mas a tecnologia tem um reverso químico implacável. Antes da metade do século XX, os
            filmes eram impressos em nitrato de celulose, um material altamente instável que
            carrega seu próprio oxigênio e queima de forma explosiva.
          </p>
          <p data-rise className="t-body">
            Shosanna Dreyfus acumula trezentos e cinquenta rolos dessa película, a própria
            história do cinema francês, transformando a sala de projeção em uma bomba-relógio.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-1 desk:w-[min(20vw,300px)]">
          <span
            data-count="350"
            className="t-display text-[clamp(5rem,13vw,13rem)] font-black leading-[0.85] text-accent tabular-nums"
          >
            350
          </span>
          <span data-hline className="h-px w-full bg-ink" />
          <p data-rise className="t-body mt-2 max-w-[22ch] font-semibold text-ink">
            rolos de película de nitrato de celulose
          </p>
        </div>

        <Frame
          src="/img/nitrate-label.jpg"
          alt="Rótulo antigo de uma lata de película cinematográfica de nitrato, impresso em verde e amarelo"
          caption="Rótulo de uma lata de película antiga: a memória do cinema em material inflamável."
          className="w-[62vw] shrink-0 self-start sm:w-[32vw] desk:mt-[3svh] desk:w-[min(22vw,calc(48svh*1.05))]"
          aspect="1800/1720"
          clip="u"
          speed={0.06}
          sizes="(min-width: 1024px) 22vw, 62vw"
        />

        <Frame
          src="/img/shosanna-film.jpg"
          alt="Shosanna segurando uma tira de película contra a luz na cabine de projeção"
          caption="Shosanna examina a película: a história do cinema francês vira combustível."
          className="w-[84vw] shrink-0 self-end sm:w-[48vw] desk:mb-[2svh] desk:w-[min(32vw,calc(38svh*2))]"
          aspect="2/1"
          clip="l"
          speed={-0.04}
          sizes="(min-width: 1024px) 32vw, 84vw"
        />

        <Frame
          src="/img/nitrate-flame.jpg"
          alt="Tira de filme pegando fogo em uma chama intensa, segurada com uma pinça"
          caption="Uma tira de nitrato em chamas: queima rápido e não se apaga fácil."
          className="mr-[4vw] w-[70vw] shrink-0 sm:w-[38vw] desk:w-[min(24vw,calc(40svh*1.52))]"
          aspect="1013/667"
          clip="r"
          speed={0.09}
          sizes="(min-width: 1024px) 24vw, 70vw"
        />
      </div>
    </SlideShell>
  );
}
