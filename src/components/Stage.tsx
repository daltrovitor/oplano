// Hello World
"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CLIP_FROM: Record<string, string> = {
  l: "inset(0% 100% 0% 0%)",
  r: "inset(0% 0% 0% 100%)",
  u: "inset(100% 0% 0% 0%)",
  d: "inset(0% 0% 100% 0%)",
};
const CLIP_TO = "inset(0% 0% 0% 0%)";

/** Quanto de rolagem vertical (em múltiplos da distância lateral) cada percurso consome. */
const SCROLL_LENGTH = 1.25;
/** Quantos px a fita de película corre para cada px de percurso do palco. */
const STRIP_SPEED = 1.35;

/** Zoom inicial das imagens (1.22 → 1 enquanto o slide entra na tela). */
const ZOOM_FROM = 0.22;

type SceneItem = {
  /** Índice do slide a que o elemento pertence. */
  slide: number;
  /** Para paralaxe: fração da largura da tela; para zoom: ignorado. */
  speed: number;
  set: (value: number) => void;
};

const pad = (value: number) => String(value).padStart(2, "0");
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

type StageProps = {
  /** Nome de cada capítulo, na ordem dos slides (usado no HUD). */
  titles: readonly string[];
  children: ReactNode;
};

/**
 * Palco horizontal: fixa a tela (pin) e converte a rolagem vertical (Lenis) em
 * deslocamento lateral. Cada slide anima por ScrollTrigger com `containerAnimation`,
 * lendo as marcações data-* do conteúdo:
 *   data-speed  paralaxe entre planos      data-word   revelação de palavras em máscara
 *   data-zoom   zoom suave da imagem        data-clip   revelação por clip-path (l|r|u|d)
 *   data-rise   subida + fade               data-line   linha-guia vertical que cresce
 *   data-hline  linha horizontal que cresce data-count  contador numérico
 *   data-tilt   inclinação com o ponteiro   data-magnetic botão magnético
 */
export function Stage({ titles, children }: StageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const chapterRef = useRef<HTMLSpanElement>(null);
  const tickRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stageTriggerRef = useRef<ScrollTrigger | null>(null);
  const offsetsRef = useRef<number[]>([]);
  const widthsRef = useRef<number[]>([]);
  const parallaxRef = useRef<SceneItem[]>([]);
  const zoomRef = useRef<SceneItem[]>([]);
  const activeRef = useRef(0);
  const targetRef = useRef(0);
  const lastJumpRef = useRef(0);
  const [ready, setReady] = useState(false);

  const lenis = useLenis();
  const total = titles.length;

  const setActive = useCallback(
    (index: number) => {
      if (activeRef.current === index) return;
      activeRef.current = index;
      if (counterRef.current) {
        counterRef.current.textContent = `${pad(index + 1)} / ${pad(total)}`;
      }
      if (chapterRef.current) chapterRef.current.textContent = titles[index] ?? "";
      tickRefs.current.forEach((tick, i) => {
        if (!tick) return;
        if (i === index) tick.setAttribute("aria-current", "step");
        else tick.removeAttribute("aria-current");
      });
    },
    [titles, total],
  );

  const goTo = useCallback(
    (index: number) => {
      const trigger = stageTriggerRef.current;
      const track = trackRef.current;
      if (!trigger || !track) return;
      const target = Math.max(0, Math.min(total - 1, index));
      const distance = Math.max(1, track.scrollWidth - window.innerWidth);
      const x = Math.min(offsetsRef.current[target] ?? 0, distance);
      const y = trigger.start + (x / distance) * (trigger.end - trigger.start);
      targetRef.current = target;
      lastJumpRef.current = performance.now();
      if (lenis) lenis.scrollTo(y, { duration: 1.8, easing: easeOutQuart });
      else window.scrollTo({ top: y, behavior: "smooth" });
    },
    [lenis, total],
  );

  /** Avança/volta N slides; toques rápidos em sequência somam em vez de se repetirem. */
  const step = useCallback(
    (delta: number) => {
      const jumping = performance.now() - lastJumpRef.current < 1900;
      goTo((jumping ? targetRef.current : activeRef.current) + delta);
    },
    [goTo],
  );

  /* Teclado: setas, Page Up/Down, Home e End navegam entre os slides. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
          event.preventDefault();
          step(1);
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          step(-1);
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(total - 1);
          break;
        default:
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, step, total]);

  /* O palco sempre começa no primeiro slide. */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  /* O motor de animação sobe quando o navegador está ocioso: a capa (CSS puro) aparece
     primeiro, sem esperar a inicialização do GSAP/ScrollTrigger. */
  useEffect(() => {
    const boot = () => setReady(true);
    /* Safari antigo não tem requestIdleCallback: cai para um timeout curto. */
    const idle = (window as Partial<Window>).requestIdleCallback;
    if (typeof idle === "function") {
      const id = idle.call(window, boot, { timeout: 700 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(boot, 200);
    return () => window.clearTimeout(id);
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!ready || !root || !track) return;

      /* Qualquer falha do motor de animação cai no plano B (rolagem lateral nativa) em vez de
         derrubar a página inteira com a tela de erro do Next.js. */
      try {
      ScrollTrigger.config({ ignoreMobileResize: true });

      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", track);
      const getDistance = () => Math.max(1, track.scrollWidth - window.innerWidth);
      const getStageX = () => (stageTriggerRef.current?.progress ?? 0) * getDistance();
      const measure = () => {
        offsetsRef.current = slides.map((slide) => slide.offsetLeft);
        widthsRef.current = slides.map((slide) => slide.offsetWidth);
      };
      measure();

      /**
       * Paralaxe e zoom calculados em um único passo por quadro, só para os slides
       * perto da tela (em vez de dezenas de ScrollTriggers independentes).
       *   paralaxe: x vai de +speed·W (slide entrando) a −speed·W (slide saindo)
       *   zoom:     1.22 → 1 enquanto a borda esquerda do slide cruza a tela
       */
      const applyScene = (stageX: number) => {
        const W = window.innerWidth;
        const place = (item: SceneItem, kind: "parallax" | "zoom") => {
          const left = offsetsRef.current[item.slide] - stageX;
          const width = widthsRef.current[item.slide];
          if (left > 2 * W || left + width < -W) return;
          if (kind === "parallax") {
            const p = clamp01((W - left) / (W + width));
            item.set(item.speed * W * (1 - 2 * p));
          } else {
            item.set(1 + ZOOM_FROM * (1 - clamp01((W - left) / W)));
          }
        };
        parallaxRef.current.forEach((item) => place(item, "parallax"));
        zoomRef.current.forEach((item) => place(item, "zoom"));
      };

      /* Percurso lateral principal: sempre ativo, mesmo com movimento reduzido. */
      const horizontal = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${Math.round(getDistance() * SCROLL_LENGTH)}`,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            measure();
            applyScene(self.progress * getDistance());
          },
          onUpdate: (self) => {
            const x = self.progress * getDistance();
            applyScene(x);
            let current = 0;
            offsetsRef.current.forEach((offset, i) => {
              if (offset <= x + window.innerWidth * 0.4) current = i;
            });
            setActive(current);
            if (barRef.current) gsap.set(barRef.current, { scaleX: self.progress });
            if (stripRef.current) {
              gsap.set(stripRef.current, { backgroundPositionX: -x * STRIP_SPEED });
            }
          },
        },
      });
      stageTriggerRef.current = horizontal.scrollTrigger ?? null;
      const mm = gsap.matchMedia();

      /* Animações cinematográficas (desligadas quando o usuário pede menos movimento). */
      mm.add("(prefers-reduced-motion: no-preference)", (context) => {
        const parallax: SceneItem[] = [];
        const zooms: SceneItem[] = [];
        let cancelled = false;

        /* Paralaxe entre planos (fundo lento, primeiro plano rápido) e zoom: passada leve em todos os slides. */
        slides.forEach((slide, index) => {
          const q = gsap.utils.selector(slide);
          q<HTMLElement>("[data-speed]").forEach((el) => {
            const speed = Number(el.dataset.speed ?? 0);
            if (!speed) return;
            parallax.push({ slide: index, speed, set: gsap.quickSetter(el, "x", "px") as SceneItem["set"] });
          });
          q<HTMLElement>("[data-zoom]").forEach((el) => {
            zooms.push({ slide: index, speed: 0, set: gsap.quickSetter(el, "scale") as SceneItem["set"] });
          });
        });

        /* Linha do tempo de entrada de um slide: é a parte pesada, então só os dois primeiros
           nascem já; os demais são criados aos poucos, em tempo ocioso (sem travar a thread). */
        const buildTimeline = (slide: HTMLElement, index: number) => {
          const q = gsap.utils.selector(slide);
          const base = { trigger: slide, containerAnimation: horizontal };
          const words = q<HTMLElement>("[data-word]");
          const clips = q<HTMLElement>("[data-clip]");
          const rises = q<HTMLElement>("[data-rise]");
          const lines = q<HTMLElement>("[data-line]");
          const hlines = q<HTMLElement>("[data-hline]");
          const counts = q<HTMLElement>("[data-count]");

          const tl = gsap.timeline({
            delay: index === 0 ? 0.3 : 0,
            defaults: { ease: "power3.out" },
            /* O primeiro slide já está em cena: toca sozinho. A chave scrollTrigger nem pode
               existir nele (mesmo undefined, o GSAP cria um gatilho sem elemento e quebra no resize). */
            ...(index === 0
              ? {}
              : { scrollTrigger: { ...base, start: "left 62%", toggleActions: "play none none reverse" } }),
          });

          if (lines.length) {
            tl.from(
              lines,
              { scaleY: 0, transformOrigin: "top center", duration: 1.4, ease: "power3.inOut", stagger: 0.12 },
              0,
            );
          }
          if (words.length) {
            tl.from(words, { yPercent: 118, duration: 1.15, ease: "power4.out", stagger: 0.07 }, 0.1);
          }
          clips.forEach((el, k) => {
            const direction = el.dataset.clip ?? "l";
            tl.fromTo(
              el,
              { clipPath: CLIP_FROM[direction] ?? CLIP_FROM.l },
              { clipPath: CLIP_TO, duration: 1.4, ease: "power4.inOut" },
              0.05 + k * 0.16,
            );
          });
          if (rises.length) {
            tl.from(rises, { y: 34, autoAlpha: 0, duration: 0.95, stagger: 0.09 }, 0.45);
          }
          if (hlines.length) {
            tl.from(
              hlines,
              { scaleX: 0, transformOrigin: "left center", duration: 1.2, stagger: 0.1 },
              0.3,
            );
          }
          counts.forEach((el) => {
            const target = Number(el.dataset.count ?? 0);
            const state = { value: 0 };
            el.textContent = "0";
            tl.to(
              state,
              {
                value: target,
                duration: 2.2,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = String(Math.round(state.value));
                },
              },
              0.4,
            );
          });
        };

        /* Com nome, context.add() só registra a função (sem nome ela rodaria na hora) e devolve
           uma versão "context-safe": tudo que ela criar depois é desfeito no revert. */
        const buildSafely = context.add?.("buildTimeline", (slide: HTMLElement, index: number) => {
          if (!cancelled) buildTimeline(slide, index);
        }) as ((slide: HTMLElement, index: number) => void) | undefined;

        const idle = (window as Partial<Window>).requestIdleCallback;
        slides.forEach((slide, index) => {
          if (index < 2 || !buildSafely) {
            buildTimeline(slide, index);
          } else if (typeof idle === "function") {
            idle.call(window, () => buildSafely(slide, index), { timeout: 600 + index * 40 });
          } else {
            window.setTimeout(() => buildSafely(slide, index), 120 * index);
          }
        });

        parallaxRef.current = parallax;
        zoomRef.current = zooms;
        applyScene(getStageX());

        return () => {
          cancelled = true;
          parallaxRef.current = [];
          zoomRef.current = [];
        };
      });

      /* Com movimento reduzido não há paralaxe, zoom nem revelações: só a rolagem lateral. */

      /* Interações de ponteiro fino: inclinação dos cartazes e botões magnéticos. */
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cleanups: Array<() => void> = [];

          root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
            gsap.set(el, { transformPerspective: 900 });
            const rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3.out" });
            const ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3.out" });
            const move = (event: PointerEvent) => {
              const rect = el.getBoundingClientRect();
              const px = (event.clientX - rect.left) / rect.width - 0.5;
              const py = (event.clientY - rect.top) / rect.height - 0.5;
              ry(px * 9);
              rx(-py * 9);
            };
            const leave = () => {
              rx(0);
              ry(0);
            };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            });
          });

          root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
            const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.6)" });
            const my = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.6)" });
            const move = (event: PointerEvent) => {
              const rect = el.getBoundingClientRect();
              mx((event.clientX - (rect.left + rect.width / 2)) * 0.3);
              my((event.clientY - (rect.top + rect.height / 2)) * 0.3);
            };
            const leave = () => {
              mx(0);
              my(0);
            };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            });
          });

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => {
        mm.revert();
      };
      } catch (error) {
        console.error("Stage: animações desativadas, usando rolagem nativa.", error);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        gsap.set(track, { clearProps: "transform" });
        root.classList.add("stage-fallback");
        return undefined;
      }
    },
    { scope: rootRef, dependencies: [setActive, ready] },
  );

  return (
    <>
      <div
        aria-hidden="true"
        className="curtain fixed inset-0 z-[100] flex items-center justify-center bg-white"
      >
        <span className="t-display text-2xl text-ink">
          Bastardos <span className="text-accent">Inglórios</span>
        </span>
      </div>

      <div
        ref={rootRef}
        className="relative h-svh w-full overflow-hidden bg-white"
        onClick={(event) => {
          const trigger = (event.target as HTMLElement).closest<HTMLElement>("[data-goto]");
          if (trigger) goTo(Number(trigger.dataset.goto));
        }}
      >
        <div
          ref={stripRef}
          aria-hidden="true"
          className="film-strip absolute inset-x-0 top-0 z-40 h-6"
        />

        <div ref={trackRef} className="relative flex h-full w-max will-change-transform">
          {children}
        </div>

        <nav
          aria-label="Navegação entre os slides"
          className="absolute inset-x-0 bottom-0 z-50 flex h-16 items-center justify-between gap-3 border-t border-line bg-white px-4 sm:px-8 lg:px-[clamp(40px,5vw,96px)]"
        >
          <div
            ref={barRef}
            aria-hidden="true"
            className="absolute -top-px left-0 h-[2px] w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />

          <p className="min-w-0 flex-1 truncate text-xs font-semibold text-ink" aria-live="polite">
            <span ref={counterRef} className="tabular-nums">
              {`${pad(1)} / ${pad(total)}`}
            </span>
            <span className="mx-2 text-muted" aria-hidden="true">
              /
            </span>
            <span ref={chapterRef}>{titles[0]}</span>
          </p>

          <ol className="hidden items-center md:flex">
            {titles.map((title, i) => (
              <li key={title}>
                <button
                  type="button"
                  ref={(el) => {
                    tickRefs.current[i] = el;
                  }}
                  aria-label={`Ir para o slide ${i + 1}: ${title}`}
                  aria-current={i === 0 ? "step" : undefined}
                  title={title}
                  onClick={() => goTo(i)}
                  className="group flex h-12 w-6 cursor-pointer items-center justify-center"
                >
                  <span className="h-3.5 w-px bg-ink/30 transition-all duration-300 group-hover:bg-ink group-aria-[current=step]:h-6 group-aria-[current=step]:bg-accent" />
                </button>
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              data-magnetic
              aria-label="Slide anterior"
              onClick={() => step(-1)}
              className="flex size-12 cursor-pointer items-center justify-center rounded-sm border border-line bg-white text-ink transition-colors duration-300 hover:border-ink"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              data-magnetic
              aria-label="Próximo slide"
              onClick={() => step(1)}
              className="flex size-12 cursor-pointer items-center justify-center rounded-sm border border-ink bg-ink text-white transition-colors duration-300 hover:border-accent hover:bg-accent"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
