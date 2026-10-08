import { about } from "@/content/about";
import styles from "./About.module.css";

export function CompanyFigures() {
  return (
    <div className={styles.metrics}>
      <dl>
        {about.metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.figuresSource}>
        <a href={about.source.url}>{about.ui.figuresSource}</a>
      </p>
    </div>
  );
}
