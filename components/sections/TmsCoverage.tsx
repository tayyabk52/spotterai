import { tms } from "@/content/tms";
import Container from "../layout/Container";
import Reveal from "../Reveal";
import styles from "./Tms.module.css";

export default function TmsCoverage() {
  return (
    <section aria-labelledby="tms-coverage-title" className={styles.coverage}>
      <Container>
        <Reveal>
          <h2 id="tms-coverage-title">{tms.coverage.title}</h2>
          <ul>
            {tms.coverage.publishers.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <a className={styles.sourceLink} href={tms.source.url}>
            {tms.coverage.sourceLabel}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
