import { ChapterScene } from "@/components/story/ChapterScene";
import { about, aboutFilms } from "@/content/about";
import styles from "./About.module.css";

export function PhilosophyChapter() {
  const chapter = about.philosophy;
  return (
    <ChapterScene
      id={chapter.id}
      number={chapter.number}
      label={chapter.label}
      title={chapter.title}
      description={chapter.paragraphs[0]}
      paragraphs={chapter.paragraphs.slice(1)}
      asset={aboutFilms.horizon}
      features={[]}
      pinned
      className={styles.philosophy}
    />
  );
}
