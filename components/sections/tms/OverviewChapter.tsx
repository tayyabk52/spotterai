import { tmsStory, storyAssets, storyChapters } from "@/content/tms";
import { ChapterScene } from "@/components/story/ChapterScene";
export default function OverviewChapter() {
  const chapter = storyChapters[2];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.overview.eyebrow}
      title={tmsStory.overview.title}
      description={tmsStory.overview.description}
      asset={storyAssets.fuel}
      scrub={false}
      pinned
      features={tmsStory.overview.features}
    />
  );
}
