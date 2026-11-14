// Hello World
import type { CSSProperties } from "react";

type MaskedTitleProps = {
  /** Texto do título. Use "\n" para forçar quebra de linha. */
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  /** Índices (0-based, contando todas as palavras) que recebem a cor de destaque. */
  accent?: readonly number[];
  /** Texto acessível alternativo, quando o visual não é o texto corrido. */
  srText?: string;
  /** Entrada por CSS puro (sem JavaScript): usada no primeiro slide para um LCP rápido. */
  intro?: boolean;
  style?: CSSProperties;
};

/**
 * Título com revelação por palavras: cada palavra vive dentro de uma máscara
 * (overflow-hidden) e o motor de animação do Stage a desliza para cima.
 * O texto real fica em um span sr-only, então SEO e leitores de tela leem o título inteiro.
 */
export function MaskedTitle({
  text,
  as: Tag = "h2",
  className = "",
  accent = [],
  srText,
  intro = false,
  style,
}: MaskedTitleProps) {
  let wordIndex = 0;
  const lines = text.split("\n");

  return (
    <Tag className={className} style={style}>
      <span className="sr-only">{srText ?? text.replace(/\n/g, " ")}</span>
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block">
            {line.split(" ").map((word) => {
              const index = wordIndex++;
              return (
                <span
                  key={`${lineIndex}-${index}`}
                  className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] pr-[0.04em] align-bottom"
                >
                  <span
                    data-word={intro ? undefined : ""}
                    style={intro ? ({ "--i": index } as CSSProperties) : undefined}
                    className={`inline-block ${intro ? "intro-word" : ""} ${
                      accent.includes(index) ? "text-accent" : ""
                    }`}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </Tag>
  );
}
