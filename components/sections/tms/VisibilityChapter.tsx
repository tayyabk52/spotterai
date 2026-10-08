import {
  tmsVisibility,
  tmsStory,
  storyAssets,
  storyChapters,
} from "@/content/tms";
import { ChapterScene } from "@/components/story/ChapterScene";
export default function VisibilityChapter() {
  const chapter = storyChapters[3];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.visibility.eyebrow}
      title={tmsStory.visibility.title}
      description={tmsStory.visibility.description}
      asset={storyAssets.dashboard}
      scrub={false}
      light
      features={tmsVisibility.features}
    />
  );
}
