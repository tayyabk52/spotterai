import { home, products } from "@/content/home";
import Container from "../layout/Container";
import Reveal from "../Reveal";
import CapabilityOverview from "../CapabilityOverview";
import ProductFeatureCopy from "../ProductFeatureCopy";
import styles from "./Capabilities.module.css";
export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className={styles.section}
      aria-labelledby="capabilities-title"
    >
      <Container>
        <header className={styles.introduction}>
          <Reveal className={styles.introLabel}>
            <p className="eyebrow">{home.capabilities.eyebrow}</p>
          </Reveal>
          <Reveal className={styles.introHeadline} delay={0.08}>
            <h2 id="capabilities-title">
              {home.capabilities.title.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </Reveal>
          <Reveal className={styles.introContext} delay={0.16}>
            <div className={styles.suiteMotif} aria-hidden="true">
              {products.map((product) => (
                <span key={product.id} />
              ))}
            </div>
            <p>{home.capabilities.description}</p>
          </Reveal>
        </header>
        {products.map((product, index) => (
          <article
            id={product.id}
            key={product.id}
            className={`${styles.product} ${index % 2 === 0 ? styles.forward : styles.reverse}`}
            aria-labelledby={`${product.id}-title`}
          >
            <div className={styles.row}>
              <div className={styles.copy}>
                <ProductFeatureCopy product={product} index={index + 1} />
              </div>
              <CapabilityOverview product={product} variant={product.id} />
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}
