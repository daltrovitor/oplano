// Hello World
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

const THEMES = [
  "Antissemitismo",
  "Resistência",
  "Vingança",
  "Violência",
  "Perseguição aos judeus",
] as const;

/** Slide 2 — O filme: resumo da obra e seu desfecho fictício. */
export function SlideFilm() {
  return (
    <SlideShell id="o-filme" title={CHAPTERS.film} backdrop="/img/trio.jpg">
      <div className="flex h-full flex-col gap-4 desk:grid desk:grid-cols-12 desk:items-center desk:gap-12">
        <div className="flex flex-col gap-3 desk:col-span-5 desk:gap-6 short:col-span-6 short:gap-2">
          <MaskedTitle
            text="Uma vingança que a História não deu"
            accent={[1]}
            className="t-display t-title"
          />
          <p data-rise className="t-body">
            Em 1944, na França ocupada, os Bastardos, soldados judeus-americanos liderados pelo
            tenente Aldo Raine, espalham terror entre os nazistas. Em Paris, Shosanna, jovem judia
            que viu a família ser assassinada pelo coronel Hans Landa, planeja a própria
            vingança. As duas histórias se cruzam em um plano para eliminar a cúpula do regime
            durante uma sessão de cinema.
          </p>
          <p data-rise className="t-body hidden sm:block short:hidden">
            O filme trata de antissemitismo, resistência, vingança, violência e perseguição aos
            judeus, e termina com um desfecho fictício, diferente da história real.
          </p>
          <ul data-rise className="hidden flex-wrap gap-2 desk:flex short:hidden" aria-label="Temas do filme">
            {THEMES.map((theme) => (
              <li
                key={theme}
                className="rounded-sm border border-line px-3 py-1.5 text-xs font-semibold text-ink"
              >
                {theme}
              </li>
            ))}
          </ul>
          <p
            data-rise
            className="t-body border-l-2 border-accent pl-4 font-semibold text-ink"
          >
            Na História, Hitler morreu em 30 de abril de 1945, em Berlim. No filme, morre numa
            sala de cinema em Paris.
          </p>
        </div>

        <div className="relative min-h-0 flex-1 desk:col-span-7 desk:h-[70svh] desk:flex-none short:col-span-6 short:h-[62svh]">
          <Frame
            src="/img/trio.jpg"
            alt="Aldo Raine, Hans Landa e Hitler em montagem em preto e branco de Bastardos Inglórios"
            caption="Bastardos Inglórios (2009), de Quentin Tarantino."
            className="absolute inset-0 desk:inset-x-auto desk:left-0 desk:top-[2%] desk:w-[86%]"
            aspect="16/9"
            clip="l"
            sizes="(min-width: 1024px) 48vw, 90vw"
          />
          <div className="hidden desk:block">
            <Frame
              src="/img/landa-aldo.jpg"
              alt="Hans Landa e Aldo Raine rindo juntos durante a cena do acordo"
              caption="Landa e Aldo: o acordo que fecha o filme."
              className="absolute bottom-[0%] right-0 w-[50%] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)]"
              aspect="16/9"
              clip="u"
              speed={0.1}
              sizes="26vw"
            />
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
