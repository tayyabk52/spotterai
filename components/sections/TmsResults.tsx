import { tms } from "@/content/tms";
import Container from "../layout/Container";
import Reveal from "../Reveal";
import styles from "./Tms.module.css";

export default function TmsResults() {
  return (
    <section
      aria-labelledby="tms-results-title"
      className={`${styles.section} ${styles.tint}`}
    >
      <Container>
        <div className={styles.resultsLayout}>
          <Reveal>
            <p className="eyebrow">{tms.results.eyebrow}</p>
            <h2 id="tms-results-title">{tms.results.title}</h2>
            <p className={styles.description}>{tms.results.description}</p>
          </Reveal>
          <dl className={styles.metrics}>
            {tms.results.metrics.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 0.05}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <p className={styles.supporting}>{tms.results.supporting}</p>
        <a href={tms.source.url} className={styles.sourceLink}>
          {tms.results.attribution}
        </a>
      </Container>
    </section>
  );
}
