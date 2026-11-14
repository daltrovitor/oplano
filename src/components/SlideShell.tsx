// Hello World
import Image from "next/image";
import type { ReactNode } from "react";

type SlideShellProps = {
  id: string;
  /** Nome do capítulo (aparece no HUD). */
  title: string;
  /** Imagem de atmosfera (plano de fundo), lavada e em tons de cinza. Omitida na capa (LCP). */
  backdrop?: string;
  /** Largura da slide em vw. 100 = uma tela. */
  widthVw?: number;
  /** Posição da imagem de fundo. */
  backdropPosition?: string;
  children: ReactNode;
};

/**
 * Estrutura tríptica de cada slide:
 *  1. Plano de fundo  — atmosfera, move-se mais devagar que a câmera (data-speed negativo)
 *  2. Plano médio     — o conteúdo (título, texto, imagens)
 *  3. Primeiro plano  — linhas de enquadramento que passam mais rápido (data-speed positivo)
 */
export function SlideShell({
  id,
  title,
  backdrop,
  widthVw = 100,
  backdropPosition = "center",
  children,
}: SlideShellProps) {
  return (
    <section
      id={id}
      data-slide
      data-title={title}
      aria-label={title}
      className="relative h-svh shrink-0 overflow-hidden"
      style={{ width: `${widthVw}vw` }}
    >
      {/* Plano 3 — fundo */}
      {backdrop ? (
        <div
          aria-hidden="true"
          data-speed="-0.2"
          className="absolute inset-y-0 -left-[24vw] -right-[24vw]"
        >
          <Image
            src={backdrop.replace("/img/", "/img/bg/")}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.08]"
            style={{ objectPosition: backdropPosition }}
          />
        </div>
      ) : null}

      {/* Plano 2 — conteúdo */}
      <div className="relative z-10 h-full px-5 pb-[76px] pt-12 sm:px-8 lg:px-[clamp(40px,5vw,96px)] lg:pb-[88px] lg:pt-[56px]">
        {children}
      </div>

      {/* Plano 1 — primeiro plano: guias da proporção áurea */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
        <span
          data-speed="0.14"
          data-line
          className="absolute bottom-[76px] top-6 left-[38.2%] hidden w-px bg-ink/[0.06] lg:block"
        />
        <span
          data-speed="0.3"
          data-line
          className="absolute bottom-[76px] top-6 left-[61.8%] hidden w-px bg-ink/[0.06] lg:block"
        />
      </div>
    </section>
  );
}
