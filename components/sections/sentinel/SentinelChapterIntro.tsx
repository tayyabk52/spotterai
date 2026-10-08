import Reveal from "@/components/Reveal";
import styles from "./CommercialChapters.module.css";

type ChapterIntroProps = {
  chapter: {
    id: string;
    chapterNumber: string;
    tag: string;
    heading: string;
    description: string;
  };
};

export function SentinelChapterIntro({ chapter }: ChapterIntroProps) {
  return (
    <Reveal className={styles.intro}>
      <div>
        <p className={styles.chapterLabel}>
          <span>{chapter.chapterNumber}</span>
          {chapter.tag}
        </p>
        <h2 className={styles.heading} id={`${chapter.id}-title`}>
          {chapter.heading}
        </h2>
      </div>
      <p className={styles.description}>{chapter.description}</p>
    </Reveal>
  );
}
