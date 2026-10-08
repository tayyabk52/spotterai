import type { FeatureGroup } from "@/content/story";
import styles from "@/components/story/Story.module.css";
export function FeatureList({
  features,
  compact = false,
  light = false,
}: {
  features: readonly FeatureGroup[];
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <ul
      className={`${styles.features} ${compact ? styles.compact : ""} ${light ? styles.light : ""}`}
    >
      {features.map((feature, index) => (
        <li key={feature.title}>
          <span className={styles.featureNumber} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            {feature.details && (
              <ul className={styles.details}>
                {feature.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
