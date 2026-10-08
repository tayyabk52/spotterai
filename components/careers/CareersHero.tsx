import Image from "next/image";
import Container from "@/components/layout/Container";
import { CAREERS_ORIGIN } from "@/content/careers";
import styles from "./Careers.module.css";

export function CareersHero() {
  return (
    <section className={styles.hero} aria-labelledby="careers-heading">
      <Container className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Careers at Spotter</p>
          <h1 id="careers-heading">
            Build what
            <br />
            <span>moves freight.</span>
          </h1>
          <p className={styles.heroDescription}>
            Bring your perspective to a team connecting trucking expertise with
            engineering.
          </p>
          <div className={styles.heroActions}>
            <a href="#open-roles" className={styles.primary}>
              Explore open roles <span aria-hidden="true">↓</span>
            </a>
            <a href={`${CAREERS_ORIGIN}/connect`} className={styles.connect}>
              Connect with us <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <figure className={styles.heroPhoto}>
          <Image
            src="/images/hero/terminal-dawn.webp"
            width={900}
            height={600}
            alt="Illustrative freight terminal at dawn, with a teal truck and trailers at the loading bays"
            sizes="(min-width: 1024px) 48vw, 100vw"
            preload
          />
          <figcaption>The industry we build for.</figcaption>
        </figure>
      </Container>
    </section>
  );
}
