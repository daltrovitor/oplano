// Hello World
import { Frame } from "@/components/Frame";
import { MaskedTitle } from "@/components/MaskedTitle";
import { SlideShell } from "@/components/SlideShell";
import { CHAPTERS } from "@/data/chapters";

const PRINCIPLES = [
  {
    title: "Cultura em série",
    text: "Filmes fabricados com fórmulas repetidas: o novo é sempre o mesmo, com outro rosto.",
  },
  {
    title: "Diversão que disciplina",
    text: "O entretenimento prolonga a lógica do trabalho e treina o público a aceitar o que já vem pronto.",
  },
  {
    title: "Escolha aparente",
    text: "O espectador escolhe entre produtos que saem iguais da fábrica; a liberdade é só a do cardápio.",
  },
] as const;

/** Slide 3 — Conceito de indústria cultural (Adorno e Horkheimer). */
export function SlideIndustry() {
  return (
    <SlideShell id="industria-cultural" title={CHAPTERS.industry} backdrop="/img/cinema-audience.jpg">
      <div className="flex h-full flex-col gap-4 desk:grid desk:grid-cols-12 desk:items-center desk:gap-14">
        <div className="flex flex-col gap-3 desk:col-span-5 desk:gap-6 short:gap-2">
          <MaskedTitle text="A indústria cultural" accent={[2]} className="t-display t-title" />
          <p data-rise className="t-body">
            O conceito nasce com Theodor Adorno e Max Horkheimer, na Dialética do Esclarecimento
            (1947). Para eles, a cultura passa a ser produzida em série, como mercadoria, para
            entreter as massas e acomodá-las ao sistema. O cinema é o exemplo central.
          </p>
          <div className="hidden desk:block short:hidden">
            <Frame
              src="/img/cinema-audience.jpg"
              alt="Plateia em preto e branco diante de uma tela de cinema iluminada"
              caption="A sala de cinema: o público reunido diante da mesma tela."
              className="w-[min(30vw,calc(30svh*1.78))]"
              aspect="862/485"
              clip="l"
              sizes="30vw"
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 desk:col-span-7 desk:flex-none desk:gap-8 desk:pl-[4vw] short:gap-2">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="relative pt-3 desk:pt-6 short:pt-2">
              <span data-hline className="absolute left-0 top-0 h-px w-full bg-ink/20" />
              <h3
                data-rise
                className="t-display text-[clamp(1.05rem,2vw,2.1rem)] font-extrabold text-ink"
              >
                {principle.title}
              </h3>
              <p data-rise className="t-body mt-1 max-w-[52ch] desk:mt-2">
                {principle.text}
              </p>
            </div>
          ))}
          <p
            data-rise
            className="t-display text-[clamp(1.05rem,1.9vw,2rem)] font-extrabold text-accent"
          >
            No nazismo, essa máquina deixa de ser só mercado: passa a ser Estado.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}
