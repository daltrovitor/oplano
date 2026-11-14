// Hello World
"use client";

import { useState } from "react";
import { Maximize2, Smartphone } from "lucide-react";
import { useFullscreen } from "@/lib/useFullscreen";

/**
 * Aviso para girar o celular. A visibilidade é decidida só por CSS (celular na vertical),
 * então ele aparece já no primeiro quadro, sem esperar o JavaScript. O botão permite seguir
 * na vertical (por exemplo, com a rotação de tela travada).
 */
export function RotatePrompt() {
  const [dismissed, setDismissed] = useState(false);
  const fullscreen = useFullscreen();

  return (
    <div
      className="rotate-prompt fixed inset-0 z-[200] flex-col items-center justify-center gap-6 bg-white px-8 text-center"
      data-dismissed={dismissed}
      role="alertdialog"
      aria-labelledby="rotate-title"
      aria-describedby="rotate-text"
    >
      <div className="rotate-phone text-ink" aria-hidden="true">
        <Smartphone className="size-20" strokeWidth={1.25} />
      </div>
      <h2 id="rotate-title" className="t-display text-[clamp(1.7rem,8vw,2.4rem)] text-ink">
        Gire o <span className="text-accent">celular</span>
      </h2>
      <p id="rotate-text" className="t-body max-w-[30ch]">
        Esta apresentação foi feita para ser vista na horizontal. Deite o celular para começar, ou use a tela cheia para ele girar sozinho.
      </p>
      {fullscreen.supported ? (
        <button
          type="button"
          onClick={() => void fullscreen.toggle()}
          className="inline-flex h-12 cursor-pointer items-center gap-3 rounded-sm bg-ink px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent active:scale-95"
        >
          <Maximize2 className="size-4" aria-hidden="true" />
          Tela cheia e girar
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="inline-flex h-12 cursor-pointer items-center rounded-sm border border-line px-6 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink active:scale-95"
      >
        Continuar assim mesmo
      </button>
    </div>
  );
}
