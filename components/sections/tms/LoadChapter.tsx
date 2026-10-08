import {
  tmsLoadOperations,
  tmsStory,
  storyAssets,
  storyChapters,
} from "@/content/tms";
import { ChapterScene } from "@/components/story/ChapterScene";
export default function LoadChapter() {
  const chapter = storyChapters[4];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.loads.eyebrow}
      title={tmsStory.loads.title}
      description={tmsStory.loads.description}
      asset={storyAssets.journey}
      features={tmsLoadOperations.features}
    />
  );
}
