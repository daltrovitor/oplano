// Hello World
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

/** Slide 1 — Capa: título monumental, projetor ao fundo e o cartaz do filme em primeiro plano. */
export function SlideCover() {
  return (
    <SlideShell id="capa" title={CHAPTERS.cover}>
      <div className="flex h-full flex-col justify-between gap-4 desk:grid desk:grid-cols-12 desk:items-center desk:gap-10">
        <div className="flex flex-col gap-4 desk:col-span-7 desk:gap-8 short:gap-2">
          <MaskedTitle
            as="h1"
            text={"Bastardos\nInglórios"}
            accent={[1]}
            intro
            className="t-display text-[clamp(2.7rem,14vw,4.6rem)] leading-[0.95] desk:text-[clamp(4rem,9.2vw,10.5rem)] short:text-[clamp(2rem,16vh,4rem)]"
          />
          <p className="intro-rise t-body max-w-[46ch] text-ink desk:text-[clamp(1rem,1.5vw,1.5rem)] short:text-[0.8rem]">
            O cinema como máquina de propaganda e como arma de vingança.
          </p>

          <div
            className="intro-rise flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8"
            style={{ "--i": 1 } as CSSProperties}
          >
            <button
              type="button"
              data-magnetic
              data-goto="1"
              className="inline-flex h-12 w-fit cursor-pointer items-center gap-3 rounded-sm bg-ink px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent"
            >
              Começar
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <p className="t-note short:hidden">Role para o lado ou use as setas do teclado.</p>
          </div>

          <div className="relative pt-3 sm:pt-4">
            <span data-hline className="absolute left-0 top-0 h-px w-full bg-line" />
            <p className="t-note">
              <span className="font-semibold text-ink">Trabalho de Sociologia</span>
              <span className="mx-3 text-line">|</span>
              Davi Godoy &amp; Vitor Daltro
            </p>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 desk:col-span-5 desk:h-[68svh] desk:flex-none">
          <Frame
            src="/img/hero-projector.jpg"
            alt="Projetor de cinema antigo lançando um feixe de luz sobre a sala escura"
            caption="O projetor: a máquina que serve tanto à propaganda quanto à vingança."
            className="absolute inset-0 desk:inset-y-[4%]"
            captionClassName="ml-auto text-right"
            clip="r"
            intro
            priority
            sizes="(min-width: 1024px) 38vw, 90vw"
          />
          <Frame
            src="/img/basterds-poster.jpg"
            alt="Cartaz de Bastardos Inglórios, de Quentin Tarantino, com Brad Pitt ao centro"
            className="absolute -bottom-2 left-1 w-[24%] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)] desk:-left-14 desk:bottom-[-2%] desk:w-[32%]"
            aspect="255/378"
            clip="u"
            intro
            speed={0.12}
            tilt
            marks={false}
            sizes="(min-width: 1024px) 14vw, 28vw"
          />
        </div>
      </div>
    </SlideShell>
  );
}
