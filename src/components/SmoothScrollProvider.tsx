// Hello World
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

/** Mantém o ScrollTrigger sincronizado com cada passo do Lenis. */
function LenisScrollTriggerBridge() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

type SmoothScrollProviderProps = { children: ReactNode };

/**
 * Rolagem inercial (Lenis) acionada pelo mesmo relógio do GSAP (ticker),
 * eliminando o descompasso entre scroll suave e animações de ScrollTrigger.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const tick = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        gestureOrientation: "both",
      }}
    >
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
