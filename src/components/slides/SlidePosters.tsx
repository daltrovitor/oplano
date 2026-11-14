// Hello World
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

/** Slide 6 — Os dois cartazes lado a lado: a propaganda e o filme que a espelha. */
export function SlidePosters() {
  return (
    <SlideShell id="dois-cartazes" title={CHAPTERS.posters} backdrop="/img/stolz-scene-1.jpg">
      <div className="grid h-full grid-cols-2 content-start items-start gap-x-3 gap-y-3 desk:grid-cols-[1fr_1.15fr_1fr] desk:content-center desk:items-center desk:gap-x-[4vw]">
        <Frame
          src="/img/stolz-poster.jpg"
          alt="Cartaz do filme fictício Stolz der Nation, com um soldado alemão armado diante de ruínas"
          caption="Stolz der Nation: o cartaz do filme fictício de propaganda nazista."
          className="mx-auto w-[min(42vw,calc(30svh*0.708))] desk:ml-auto desk:mr-0 desk:w-[min(23vw,calc(58svh*0.708))]"
          aspect="466/658"
          clip="u"
          speed={0.08}
          tilt
          sizes="(min-width: 1024px) 23vw, 42vw"
        />

        <div className="order-last col-span-2 flex flex-col gap-3 desk:order-none desk:col-span-1 desk:gap-6 short:gap-2">
          <MaskedTitle
            text="Dois cartazes, uma mesma máquina"
            accent={[4, 5]}
            className="t-display t-title"
          />
          <p data-rise className="t-body">
            Os dois cartazes prometem a mesma coisa: ação, uniforme, rostos conhecidos e um
            herói para torcer. Um é propaganda do regime; o outro, uma sátira que usa as mesmas
            armas contra ele.
          </p>
          <dl data-rise className="t-body hidden grid-cols-2 gap-6 border-t border-line pt-4 desk:grid short:hidden">
            <div>
              <dt className="font-semibold text-ink">Stolz der Nation</dt>
              <dd>Letra gótica, soldado heroico, ruínas ao fundo.</dd>
            </div>
            <div>
              <dt className="font-semibold text-accent">Bastardos Inglórios</dt>
              <dd>Elenco de estrelas, estética de filme de guerra, vingança como diversão.</dd>
            </div>
          </dl>
        </div>

        <Frame
          src="/img/basterds-poster.jpg"
          alt="Cartaz de Bastardos Inglórios, com Brad Pitt ao centro e o elenco ao redor"
          caption="Bastardos Inglórios (2009): o cartaz do filme de Quentin Tarantino."
          className="mx-auto w-[min(42vw,calc(30svh*0.675))] desk:ml-0 desk:mr-auto desk:mt-[7svh] desk:w-[min(21vw,calc(55svh*0.675))]"
          aspect="255/378"
          clip="u"
          speed={-0.06}
          tilt
          sizes="(min-width: 1024px) 21vw, 42vw"
        />
      </div>
    </SlideShell>
  );
}
