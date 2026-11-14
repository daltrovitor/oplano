// Hello World
"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { useFullscreen } from "@/lib/useFullscreen";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Quanto de rolagem vertical (em múltiplos da distância lateral) cada percurso consome. */
const SCROLL_LENGTH = 1.25;
/** Quantos px a fita de película corre para cada px de percurso do palco. */
const STRIP_SPEED = 1.35;
/** Zoom inicial das imagens (1.22 → 1 enquanto o slide entra na tela). */
const ZOOM_FROM = 0.22;

type SceneItem = {
  /** Índice do slide a que o elemento pertence. */
  slide: number;
  /** Para paralaxe: fração da largura da tela; para zoom e giro: ignorado. */
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
 * deslocamento lateral.
 *
 * Revelações (palavras, imagens, textos, linhas) são feitas por CSS: o motor só marca
 * `.is-in` no slide que entra na tela. O conteúdo é visível por padrão; ele só é escondido
 * enquanto `html[data-motion="on"]` existir, ou seja, se o motor falhar em qualquer ponto,
 * nada fica preso invisível.
 *
 * Marcações data-* lidas nos slides:
 *   data-speed  paralaxe entre planos      data-zoom   zoom suave da imagem
 *   data-tilt   inclina o cartaz           data-count  contador numérico
 *   data-magnetic botão magnético (ponteiro fino)
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
  const activeRef = useRef(0);
  const targetRef = useRef(0);
  const lastJumpRef = useRef(0);
  const [ready, setReady] = useState(false);

  const lenis = useLenis();
  const fullscreen = useFullscreen();
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

  /* Teclado: setas, Page Up/Down, Home, End navegam; F alterna a tela cheia. */
  const toggleFullscreen = fullscreen.toggle;
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
        case "f":
        case "F":
          event.preventDefault();
          void toggleFullscreen();
          break;
        default:
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, step, total, toggleFullscreen]);

  /* O palco sempre começa no primeiro slide. */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  /* O motor sobe quando o navegador está ocioso: a capa (CSS puro) aparece primeiro. */
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

      const html = document.documentElement;
      const touched: HTMLElement[] = [];
      const counterTweens = new Map<HTMLElement, gsap.core.Tween>();
      let mm: gsap.MatchMedia | undefined;

      /* Qualquer falha cai no plano B (rolagem lateral nativa, tudo visível) em vez de
         derrubar a página ou deixar conteúdo escondido. */
      const bail = (error: unknown) => {
        console.error("Stage: animações desativadas, usando rolagem nativa.", error);
        html.removeAttribute("data-motion");
        counterTweens.forEach((tween) => tween.kill());
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        touched.forEach((el) => gsap.set(el, { clearProps: "transform" }));
        gsap.set(track, { clearProps: "transform" });
        root.classList.add("stage-fallback");
      };

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

        /* "Reduzir movimento" só vale com ponteiro fino (desktop); no celular tudo anima. */
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const fine = window.matchMedia("(pointer: fine)").matches;
        const motionAllowed = !(reduced && fine);
        const touchOnly = window.matchMedia("(pointer: coarse)").matches;

        /* --- Paralaxe, zoom e giro dos cartazes (calculados em um único passo por quadro) --- */
        const parallax: SceneItem[] = [];
        const zooms: SceneItem[] = [];
        const tilts: SceneItem[] = [];
        const counters: HTMLElement[][] = slides.map(() => []);

        slides.forEach((slide, index) => {
          const q = gsap.utils.selector(slide);

          /* Escalonamento (atraso) de cada revelação, lido pelo CSS via --d (ms). */
          q<HTMLElement>("[data-clip]").forEach((el, k) => el.style.setProperty("--d", String(60 + k * 160)));
          q<HTMLElement>("[data-rise]").forEach((el, k) => el.style.setProperty("--d", String(450 + k * 90)));
          q<HTMLElement>("[data-hline]").forEach((el, k) => el.style.setProperty("--d", String(300 + k * 100)));
          q<HTMLElement>("[data-line]").forEach((el, k) => el.style.setProperty("--d", String(k * 120)));

          q<HTMLElement>("[data-count]").forEach((el) => {
            counters[index].push(el);
            el.textContent = "0";
          });

          if (!motionAllowed) return;
          q<HTMLElement>("[data-speed]").forEach((el) => {
            const speed = Number(el.dataset.speed ?? 0);
            if (!speed) return;
            touched.push(el);
            parallax.push({ slide: index, speed, set: gsap.quickSetter(el, "x", "px") as SceneItem["set"] });
          });
          q<HTMLElement>("[data-zoom]").forEach((el) => {
            touched.push(el);
            zooms.push({ slide: index, speed: 0, set: gsap.quickSetter(el, "scale") as SceneItem["set"] });
          });
          if (touchOnly) {
            q<HTMLElement>("[data-tilt]").forEach((el) => {
              gsap.set(el, { transformPerspective: 900 });
              touched.push(el);
              tilts.push({ slide: index, speed: 0, set: gsap.quickSetter(el, "rotationY", "deg") as SceneItem["set"] });
            });
          }
        });

        const slideIn: boolean[] = slides.map(() => false);

        const runCounters = (index: number, on: boolean) => {
          counters[index].forEach((el) => {
            counterTweens.get(el)?.kill();
            el.textContent = "0";
            if (!on) return;
            const target = Number(el.dataset.count ?? 0);
            const state = { value: 0 };
            counterTweens.set(
              el,
              gsap.to(state, {
                value: target,
                duration: 2.2,
                delay: 0.4,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = String(Math.round(state.value));
                },
              }),
            );
          });
        };

        const applyScene = (stageX: number) => {
          const W = window.innerWidth;

          /* Revelação: o slide ganha .is-in ao cruzar 62% da tela; ao sair por completo, reinicia. */
          slides.forEach((slide, i) => {
            const left = offsetsRef.current[i] - stageX;
            const width = widthsRef.current[i];
            const entering = left < W * 0.62 && left + width > W * 0.05;
            const leaving = left > W * 1.08 || left + width < -W * 0.08;
            if (!slideIn[i] && entering) {
              slideIn[i] = true;
              slide.classList.add("is-in");
              runCounters(i, true);
            } else if (slideIn[i] && leaving) {
              slideIn[i] = false;
              slide.classList.remove("is-in");
              runCounters(i, false);
            }
          });

          const place = (item: SceneItem, kind: "parallax" | "zoom" | "tilt") => {
            const left = offsetsRef.current[item.slide] - stageX;
            const width = widthsRef.current[item.slide];
            if (left > 2 * W || left + width < -W) return;
            if (kind === "parallax") {
              const p = clamp01((W - left) / (W + width));
              item.set(item.speed * W * (1 - 2 * p));
            } else if (kind === "tilt") {
              /* No toque não há ponteiro: os cartazes giram conforme o slide cruza a tela. */
              item.set((0.5 - clamp01((W - left) / (W + width))) * 18);
            } else {
              item.set(1 + ZOOM_FROM * (1 - clamp01((W - left) / W)));
            }
          };
          parallax.forEach((item) => place(item, "parallax"));
          zooms.forEach((item) => place(item, "zoom"));
          tilts.forEach((item) => place(item, "tilt"));
        };

        /* Percurso lateral principal: sempre ativo. */
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
              try {
                measure();
                applyScene(self.progress * getDistance());
              } catch (error) {
                bail(error);
              }
            },
            onUpdate: (self) => {
              try {
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
              } catch (error) {
                bail(error);
              }
            },
          },
        });
        stageTriggerRef.current = horizontal.scrollTrigger ?? null;

        /* Os slides já visíveis ganham .is-in ANTES de ligar o modo de movimento (nada pisca). */
        applyScene(getStageX());
        if (motionAllowed) html.dataset.motion = "on";

        /* Interações de ponteiro fino: inclinação dos cartazes e botões magnéticos. */
        mm = gsap.matchMedia();
        mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
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
        });
      } catch (error) {
        bail(error);
        return undefined;
      }

      return () => {
        mm?.revert();
        counterTweens.forEach((tween) => tween.kill());
        html.removeAttribute("data-motion");
      };
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
          className="film-strip absolute inset-x-0 top-0 z-40 h-6 short:h-4"
        />

        <div ref={trackRef} className="relative flex h-full w-max will-change-transform">
          {children}
        </div>

        <nav
          aria-label="Navegação entre os slides"
          className="absolute inset-x-0 bottom-0 z-50 flex h-16 items-center justify-between gap-3 border-t border-line bg-white px-4 sm:px-8 desk:px-[clamp(40px,5vw,96px)] short:h-[52px] short:px-[4vw]"
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
                  className="group flex h-12 w-6 cursor-pointer items-center justify-center short:h-11"
                >
                  <span className="h-3.5 w-px bg-ink/30 transition-all duration-300 group-hover:bg-ink group-aria-[current=step]:h-6 group-aria-[current=step]:bg-accent" />
                </button>
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-1.5">
            {fullscreen.supported ? (
              <button
                type="button"
                onClick={() => void fullscreen.toggle()}
                aria-label={fullscreen.active ? "Sair da tela cheia" : "Tela cheia"}
                aria-pressed={fullscreen.active}
                title={fullscreen.active ? "Sair da tela cheia (F)" : "Tela cheia (F)"}
                className="flex size-12 cursor-pointer items-center justify-center rounded-sm border border-line bg-white text-ink transition-colors duration-300 hover:border-ink active:scale-95 short:size-11"
              >
                {fullscreen.active ? (
                  <Minimize2 className="size-4" aria-hidden="true" />
                ) : (
                  <Maximize2 className="size-4" aria-hidden="true" />
                )}
              </button>
            ) : null}
            <button
              type="button"
              data-magnetic
              aria-label="Slide anterior"
              onClick={() => step(-1)}
              className="flex size-12 cursor-pointer items-center justify-center rounded-sm border border-line bg-white text-ink transition-colors duration-300 hover:border-ink active:scale-95 short:size-11"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              data-magnetic
              aria-label="Próximo slide"
              onClick={() => step(1)}
              className="flex size-12 cursor-pointer items-center justify-center rounded-sm border border-ink bg-ink text-white transition-colors duration-300 hover:border-accent hover:bg-accent active:scale-95 short:size-11"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
