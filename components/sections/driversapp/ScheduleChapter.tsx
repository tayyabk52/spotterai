import { ChapterScene } from "@/components/story/ChapterScene";
import { driversApp, driverStoryAssets } from "@/content/driversapp";

export default function ScheduleChapter() {
  const { schedule } = driversApp;
  return (
    <ChapterScene
      id={schedule.id}
      number={schedule.number}
      label={schedule.label}
      title={schedule.title}
      description={schedule.description}
      asset={driverStoryAssets.schedule}
      features={schedule.features}
      pinned
    />
  );
}
