import Reveal from "@/components/Reveal";
import { FeatureList } from "@/components/story/FeatureList";
import { about } from "@/content/about";
import styles from "./About.module.css";

export function AutomationChapter() {
  const chapter = about.automation;
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.chapter} ${styles.light} ${styles.automation}`}
    >
      <div className={styles.container}>
        <Reveal className={styles.sectionHead}>
          <p className={styles.label}>
            <span>{chapter.number}</span>
            {chapter.label}
          </p>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <FeatureList features={chapter.features} compact light />
        </Reveal>
      </div>
    </section>
  );
}
