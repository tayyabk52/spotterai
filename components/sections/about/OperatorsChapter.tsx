import Reveal from "@/components/Reveal";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function OperatorsChapter() {
  const chapter = about.operators;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.chapter} ${styles.operators}`}
    >
      <div className={styles.container}>
        <div className={styles.split}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.label}>
              <span>{chapter.number}</span>
              {chapter.label}
            </p>
            <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
          </Reveal>
          <Reveal className={styles.intro} delay={0.08}>
            {chapter.introduction}
          </Reveal>
        </div>
        <Reveal>
          <div className={styles.advantage}>
            <p className={styles.label}>{chapter.advantageLabel}</p>
            <p>{chapter.advantage}</p>
          </div>
        </Reveal>
        <Reveal className={styles.prose}>
          <p>{chapter.conclusion}</p>
        </Reveal>
      </div>
    </section>
  );
}
