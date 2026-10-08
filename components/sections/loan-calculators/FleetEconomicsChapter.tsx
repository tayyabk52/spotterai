"use client";
import { loanCalculatorsContent } from "@/content/loan-calculators";
import styles from "./Calculators.module.css";

export function FleetEconomicsChapter() {
  const content = loanCalculatorsContent.economics;

  return (
    <section
      id={content.id}
      aria-labelledby="economics-heading"
      className={`${styles.chapterWrapper} ${styles.dark}`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.chapterLabel}>{content.eyebrow}</p>
          <h2 id="economics-heading">{content.title}</h2>
          <p className={styles.lead}>{content.description}</p>
        </div>

        <div className={styles.economicsGrid}>
          {content.pillars.map((pillar) => (
            <div key={pillar.title} className={styles.pillarCard}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
