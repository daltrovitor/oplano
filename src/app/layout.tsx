// Hello World
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, UnifrakturCook } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraktur = UnifrakturCook({
  variable: "--font-fraktur",
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Bastardos Inglórios — o cinema como propaganda e como arma",
  description:
    "Trabalho de Sociologia sobre Bastardos Inglórios, de Quentin Tarantino: indústria cultural, propaganda nazista, metalinguagem e o cinema como instrumento de vingança histórica.",
  applicationName: "Bastardos Inglórios — Sociologia",
  authors: [{ name: "Davi Godoy" }, { name: "Vitor Daltro" }],
  keywords: [
    "Bastardos Inglórios",
    "Quentin Tarantino",
    "indústria cultural",
    "propaganda nazista",
    "Goebbels",
    "sociologia",
    "cinema",
  ],
  openGraph: {
    title: "Bastardos Inglórios — o cinema como propaganda e como arma",
    description:
      "Indústria cultural, propaganda nazista e metalinguagem em Bastardos Inglórios, de Tarantino.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${fraktur.variable}`}
    >
      <body suppressHydrationWarning>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
