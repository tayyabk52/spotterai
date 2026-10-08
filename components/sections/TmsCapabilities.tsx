import { tms } from "@/content/tms";
import Container from "../layout/Container";
import Reveal from "../Reveal";
import styles from "./Tms.module.css";

export default function TmsCapabilities() {
  return (
    <section
      id={tms.capabilities.id}
      aria-labelledby="tms-capabilities-title"
      className={styles.section}
    >
      <Container>
        <Reveal className={styles.introduction}>
          <p className="eyebrow">{tms.capabilities.eyebrow}</p>
          <h2 id="tms-capabilities-title">{tms.capabilities.title}</h2>
          <p className={styles.description}>{tms.capabilities.description}</p>
        </Reveal>
        <ol className={styles.capabilities}>
          {tms.capabilities.items.map((item, index) => (
            <li key={item.title}>
              <Reveal
                delay={Math.min(index * 0.03, 0.15)}
                className={styles.capability}
              >
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
