"use client";
import { loanCalculatorsContent } from "@/content/loan-calculators";
import styles from "./Calculators.module.css";

export function EquipmentBenchmarksChapter() {
  const content = loanCalculatorsContent.benchmarks;

  return (
    <section
      id={content.id}
      aria-labelledby="benchmarks-heading"
      className={`${styles.chapterWrapper} ${styles.dark}`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.chapterLabel}>{content.eyebrow}</p>
          <h2 id="benchmarks-heading">{content.title}</h2>
          <p className={styles.lead}>{content.description}</p>
        </div>

        <div className={styles.benchmarksGrid}>
          {content.items.map((item) => (
            <div key={item.category} className={styles.benchmarkCard}>
              <h3 className={styles.benchmarkCategory}>{item.category}</h3>
              <div className={styles.benchmarkPrice}>{item.priceRange}</div>
              
              <div className={styles.benchmarkDetails}>
                <div className={styles.benchmarkRow}>
                  <span className={styles.benchmarkRowLabel}>Typical Down Payment</span>
                  <span className={styles.benchmarkRowVal}>{item.typicalDown}</span>
                </div>
                <div className={styles.benchmarkRow}>
                  <span className={styles.benchmarkRowLabel}>Term Horizon</span>
                  <span className={styles.benchmarkRowVal}>{item.termRange}</span>
                </div>
                <div className={styles.benchmarkRow}>
                  <span className={styles.benchmarkRowLabel}>Est. Monthly Debt</span>
                  <span className={styles.benchmarkRowVal}>{item.estMonthly}</span>
                </div>
              </div>

              <div className={styles.benchmarkNotes}>{item.notes}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
