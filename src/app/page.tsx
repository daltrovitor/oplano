// Hello World
import { Stage } from "@/components/Stage";
import { SlideCover } from "@/components/slides/SlideCover";
import { SlideDeal } from "@/components/slides/SlideDeal";
import { SlideExecution } from "@/components/slides/SlideExecution";
import { SlideFilm } from "@/components/slides/SlideFilm";
import { SlideIndustry } from "@/components/slides/SlideIndustry";
import { SlideMeta } from "@/components/slides/SlideMeta";
import { SlideNitrate } from "@/components/slides/SlideNitrate";
import { SlidePosters } from "@/components/slides/SlidePosters";
import { SlidePropaganda } from "@/components/slides/SlidePropaganda";
import { SlideRedemption } from "@/components/slides/SlideRedemption";
import { SlideStolz } from "@/components/slides/SlideStolz";
import { CHAPTER_ORDER } from "@/data/chapters";

export default function Home() {
  return (
    <main id="conteudo">
      <Stage titles={CHAPTER_ORDER}>
        <SlideCover />
        <SlideFilm />
        <SlideIndustry />
        <SlidePropaganda />
        <SlideStolz />
        <SlidePosters />
        <SlideMeta />
        <SlideNitrate />
        <SlideExecution />
        <SlideRedemption />
        <SlideDeal />
      </Stage>
    </main>
  );
}
