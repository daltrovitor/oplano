// Hello World
"use client";

import { useCallback, useSyncExternalStore } from "react";

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => Promise<void> | void;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type LockableOrientation = ScreenOrientation & {
  lock?: (orientation: "landscape") => Promise<void>;
};

/**
 * Tela cheia da página inteira. No Android (Chrome), entrar em tela cheia também permite
 * travar a orientação na horizontal, então o celular gira sozinho. iPhone não oferece a API
 * de tela cheia para páginas: `supported` fica falso e o botão não aparece.
 */
function subscribe(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);
  document.addEventListener("webkitfullscreenchange", onChange);
  return () => {
    document.removeEventListener("fullscreenchange", onChange);
    document.removeEventListener("webkitfullscreenchange", onChange);
  };
}

const isSupported = () => {
  const doc = document as FullscreenDocument;
  return Boolean(doc.fullscreenEnabled || doc.webkitFullscreenEnabled);
};
const isActive = () => {
  const doc = document as FullscreenDocument;
  return Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement);
};
const never = () => false;
const noSubscription = () => () => {};

export function useFullscreen() {
  /* useSyncExternalStore lê o navegador sem divergir do HTML do servidor (começa falso). */
  const supported = useSyncExternalStore(noSubscription, isSupported, never);
  const active = useSyncExternalStore(subscribe, isActive, never);

  const toggle = useCallback(async () => {
    const doc = document as FullscreenDocument;
    const root = document.documentElement as FullscreenElement;
    const orientation = screen.orientation as LockableOrientation | undefined;
    try {
      if (doc.fullscreenElement ?? doc.webkitFullscreenElement) {
        orientation?.unlock?.();
        await (doc.exitFullscreen?.() ?? doc.webkitExitFullscreen?.());
        return;
      }
      await (root.requestFullscreen?.({ navigationUI: "hide" }) ?? root.webkitRequestFullscreen?.());
      try {
        await orientation?.lock?.("landscape");
      } catch {
        /* Sem suporte a travar a orientação (desktop, iOS): segue só em tela cheia. */
      }
    } catch (error) {
      console.warn("Tela cheia indisponível:", error);
    }
  }, []);

  return { supported, active, toggle };
}
