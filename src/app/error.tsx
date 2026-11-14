// Hello World
"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Plano B de erro: mensagem clara e botão para recarregar, na identidade do site. */
export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-svh flex-col items-start justify-center gap-5 bg-white px-6 sm:px-16">
      <h1 className="t-display text-[clamp(2rem,7vw,4rem)] text-ink">
        A sessão <span className="text-accent">travou</span>.
      </h1>
      <p className="t-body max-w-[46ch]">
        Algo falhou ao carregar a apresentação. Toque em recarregar para começar de novo.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex h-12 cursor-pointer items-center rounded-sm bg-ink px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent"
      >
        Recarregar
      </button>
    </main>
  );
}
