import Reveal from "@/components/Reveal";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function ExecutionChapter() {
  const chapter = about.execution;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.chapter} ${styles.light} ${styles.execution}`}
    >
      <div className={`${styles.container} ${styles.split}`}>
        <Reveal className={styles.sectionHead}>
          <p className={styles.label}>
            <span>{chapter.number}</span>
            {chapter.label}
          </p>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        </Reveal>
        <Reveal className={styles.prose} delay={0.08}>
          {chapter.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
