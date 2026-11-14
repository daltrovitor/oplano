// Hello World
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

/** Slide 11 — Pergunta final com o GIF do acordo. */
export function SlideDeal() {
  return (
    <SlideShell id="o-acordo" title={CHAPTERS.deal} backdrop="/img/landa-aldo.jpg">
      <div className="flex h-full flex-col items-start justify-between gap-4 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="flex flex-col gap-4 lg:col-span-7 lg:gap-8">
          <MaskedTitle
            text={"Você faria\nesse acordo?"}
            accent={[3]}
            className="t-display text-[clamp(2.4rem,13vw,4.2rem)] leading-[0.98] lg:text-[clamp(3.5rem,7.4vw,8.5rem)]"
          />
          <p
            data-rise
            className="t-display text-[clamp(1.1rem,2.2vw,2.25rem)] font-semibold italic text-ink"
          >
            Vitor Daltro &amp; Davi Godoy
          </p>
        </div>
        <div className="flex min-h-0 w-full flex-1 items-center justify-center lg:col-span-5 lg:flex-none lg:justify-start">
          <Frame
            src="/gif/deal.gif"
            alt="Aldo Raine, vivido por Brad Pitt, olhando fixamente para a câmera em Bastardos Inglórios"
            className="w-[min(72vw,calc(42svh*0.904))] lg:w-[min(27vw,calc(62svh*0.904))]"
            aspect="338/374"
            clip="u"
            speed={0.06}
            unoptimized
            sizes="(min-width: 1024px) 27vw, 50vw"
          />
        </div>
      </div>
    </SlideShell>
  );
}
