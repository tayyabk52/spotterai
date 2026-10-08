"use client";
import Container from "@/components/layout/Container";
import { insightsContent } from "@/content/insights";
import styles from "@/components/insights/Insights.module.css";

export default function InsightsError({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className={styles.empty}>
      <Container>
        <h1>{insightsContent.eyebrow}</h1>
        <p role="alert">{insightsContent.interface.available}</p>
        <button className={styles.button} onClick={reset}>
          {insightsContent.interface.retry}
        </button>
      </Container>
    </main>
  );
}
