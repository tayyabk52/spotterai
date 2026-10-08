import { ChapterScene } from "@/components/story/ChapterScene";
import { driversApp, driverStoryAssets } from "@/content/driversapp";

export default function NoGoChapter() {
  const { nogo } = driversApp;
  return (
    <ChapterScene
      id={nogo.id}
      number={nogo.number}
      label={nogo.label}
      title={nogo.title}
      description={nogo.description}
      asset={driverStoryAssets.nogo}
      features={nogo.features}
      pinned
    />
  );
}
