import {
  tmsMaintenance,
  tmsStory,
  storyAssets,
  storyChapters,
} from "@/content/tms";
import { ChapterScene } from "@/components/story/ChapterScene";
export default function MaintenanceChapter() {
  const chapter = storyChapters[5];
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={tmsStory.maintenance.eyebrow}
      title={tmsStory.maintenance.title}
      description={tmsStory.maintenance.description}
      asset={storyAssets.maintenancePhoto}
      pinned
      features={tmsMaintenance.features}
    />
  );
}
