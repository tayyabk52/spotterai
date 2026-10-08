import Reveal from "@/components/Reveal";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function JourneyChapter() {
  const chapter = about.journey;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.chapter} ${styles.light} ${styles.journey}`}
    >
      <div className={styles.container}>
        <Reveal className={styles.sectionHead}>
          <p className={styles.label}>
            <span>{chapter.number}</span>
            {chapter.label}
          </p>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        </Reveal>
        <ol className={styles.timeline}>
          {chapter.entries.map((entry) => (
            <li key={`${entry.date}-${entry.title}`}>
              <span className={styles.date}>{entry.date}</span>
              <Reveal>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
