import Reveal from "@/components/Reveal";
import ScrollComposition from "@/components/motion/ScrollComposition";
import { lens, lensAssets } from "@/content/lens";
import LensScreenshot from "./LensScreenshot";
import styles from "./Lens.module.css";

export default function LensHistory() {
  const chapter = lens.history;
  return (
    <section
      id={chapter.id}
      className={`${styles.chapter} ${styles.history}`}
      aria-labelledby="lens-history-title"
    >
      <div className={`${styles.chapterLayout} ${styles.historyLayout}`}>
        <Reveal className={styles.chapterCopy}>
          <p className={styles.chapterLabel}>
            {chapter.number} / {chapter.label}
          </p>
          <h2 id="lens-history-title">
            {chapter.title}
            <span>{chapter.emphasis}</span>
          </h2>
          <p className={styles.description}>{chapter.description}</p>
          <ul className={styles.timeRanges} aria-label={chapter.rangesLabel}>
            {chapter.ranges.map((range) => (
              <li key={range}>{range}</li>
            ))}
          </ul>
          <p className={styles.historyDetail}>{chapter.detail}</p>
        </Reveal>
        <ScrollComposition className={styles.historyMedia}>
          <LensScreenshot asset={lensAssets.history} />
        </ScrollComposition>
      </div>
    </section>
  );
}
