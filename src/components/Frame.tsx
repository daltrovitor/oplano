// Hello World
import Image from "next/image";
import type { CSSProperties } from "react";

export type ClipDirection = "l" | "r" | "u" | "d";

type FrameProps = {
  src: string;
  alt: string;
  caption?: string;
  /** Tamanho/posicionamento do <figure> (classes Tailwind). */
  className?: string;
  /** Proporção CSS (ex.: "16/9"). Sem ela, o quadro preenche o espaço do figure. */
  aspect?: string;
  /** Direção da revelação por clip-path. */
  clip?: ClipDirection;
  /** Velocidade de paralaxe do quadro (fração da largura da tela). */
  speed?: number;
  /** Cantos de enquadramento (primeiro plano) que "desregistram" levemente em relação à imagem. */
  marks?: boolean;
  grayscale?: boolean;
  priority?: boolean;
  sizes?: string;
  unoptimized?: boolean;
  /** CSS object-position da imagem. */
  position?: string;
  tilt?: boolean;
  /** Classes extras da legenda (ex.: alinhamento). */
  captionClassName?: string;
  /** Entrada por CSS puro (sem JavaScript): usada no primeiro slide para um LCP rápido. */
  intro?: boolean;
  style?: CSSProperties;
};

function CropMarks() {
  const corner = "absolute h-3.5 w-3.5 border-ink";
  return (
    <span
      aria-hidden="true"
      data-speed="0.035"
      className="pointer-events-none absolute -inset-2.5 hidden sm:block"
    >
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}

/** Quadro de imagem do tríptico: revelação, zoom de paralaxe, cantos de enquadramento e legenda. */
export function Frame({
  src,
  alt,
  caption,
  className = "",
  aspect,
  clip = "l",
  speed,
  marks = true,
  grayscale = false,
  priority = false,
  sizes = "(min-width: 1024px) 45vw, 90vw",
  unoptimized = false,
  position,
  tilt = false,
  captionClassName = "",
  intro = false,
  style,
}: FrameProps) {
  return (
    <figure
      className={`flex flex-col ${className}`}
      data-speed={speed}
      data-tilt={tilt ? "" : undefined}
      style={style}
    >
      <div
        className="relative min-h-0 w-full flex-1"
        style={aspect ? { aspectRatio: aspect, flex: "none" } : undefined}
      >
        <div
          data-clip={intro ? undefined : clip}
          className={`absolute inset-0 overflow-hidden rounded-sm bg-ink ${
            intro ? "intro-fade" : ""
          }`}
        >
          <Image
            data-zoom
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            unoptimized={unoptimized}
            className={`object-cover ${grayscale ? "grayscale" : ""}`}
            style={position ? { objectPosition: position } : undefined}
          />
        </div>
        {marks ? <CropMarks /> : null}
      </div>
      {caption ? (
        <figcaption
          data-rise={intro ? undefined : ""}
          className={`t-note mt-3 max-w-[46ch] ${intro ? "intro-rise" : ""} ${captionClassName}`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
