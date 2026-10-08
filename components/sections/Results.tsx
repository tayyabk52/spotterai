import { home } from "@/content/home";
import Container from "../layout/Container";
import Reveal from "../Reveal";
import ImpactMetric from "./ImpactMetric";
import { UsersThreeIcon } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { PathIcon } from "@phosphor-icons/react/dist/ssr/Path";
import { CurrencyCircleDollarIcon } from "@phosphor-icons/react/dist/ssr/CurrencyCircleDollar";
import { TargetIcon } from "@phosphor-icons/react/dist/ssr/Target";
import styles from "./Results.module.css";
const metricIcons = [
  UsersThreeIcon,
  PathIcon,
  CurrencyCircleDollarIcon,
  TargetIcon,
];
export default function Results() {
  return (
    <section className={styles.section} aria-labelledby="results-title">
      <Container>
        <div className={styles.layout}>
          <Reveal className={styles.introduction}>
            <p className="eyebrow">{home.results.eyebrow}</p>
            <h2 id="results-title">
              {home.results.title.split("\n").map((line, index) => (
                <span key={line}>
                  {index > 0 && " "}
                  {line}
                </span>
              ))}
            </h2>
            <p className={styles.description}>{home.results.description}</p>
            <div className={styles.mark} aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
          </Reveal>
          <dl className={styles.metrics}>
            {home.metrics.map((metric, index) => {
              const Icon = metricIcons[index];
              return (
                <ImpactMetric key={metric.label} index={index}>
                  <dt>
                    <Icon size={20} weight="duotone" aria-hidden="true" />
                    {metric.label}
                  </dt>
                  <dd>{metric.value}</dd>
                </ImpactMetric>
              );
            })}
          </dl>
        </div>
        <p className={styles.source}>{home.results.source}</p>
      </Container>
    </section>
  );
}
