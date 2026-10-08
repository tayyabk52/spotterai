import Reveal from "@/components/Reveal";
import { tms, storyChapters } from "@/content/tms";
import styles from "@/components/story/Story.module.css";
export default function EvidenceChapter() {
  const chapter = storyChapters[1];
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={`${styles.evidence} ${styles.light}`}
    >
      <div className={styles.evidenceHead}>
        <Reveal>
          <p className={styles.chapterLabel}>
            <span>{chapter.number}</span>
            {chapter.label}
          </p>
          <h2 id={`${chapter.id}-title`}>{tms.results.title}</h2>
        </Reveal>
        <p className={styles.lead}>{tms.results.description}</p>
      </div>
      <dl className={styles.metrics}>
        {tms.results.metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.05}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </Reveal>
        ))}
      </dl>
      <div className={styles.attribution}>
        <p>{tms.results.supporting}</p>
        <a href={tms.source.url}>{tms.results.attribution}</a>
      </div>
    </section>
  );
}
