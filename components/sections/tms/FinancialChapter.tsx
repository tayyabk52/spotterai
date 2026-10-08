import {
  tmsFinancials,
  tmsStory,
  storyAssets,
  storyChapters,
} from "@/content/tms";
import { ChapterScene } from "@/components/story/ChapterScene";
export default function FinancialChapter() {
  const chapter = storyChapters[6];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.financials.eyebrow}
      title={tmsStory.financials.title}
      description={tmsStory.financials.description}
      asset={storyAssets.resolution}
      light
      features={tmsFinancials.features}
    />
  );
}
