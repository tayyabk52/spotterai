import type { ProductSectionContent } from "@/content/tms";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import Container from "../layout/Container";
import Reveal from "../Reveal";
import ProductPhoto from "./ProductPhoto";
import styles from "./Tms.module.css";

export default function ProductFeatureSection({
  content,
  imagePlacement = "left",
  tone = "canvas",
}: {
  content: ProductSectionContent;
  imagePlacement?: "left" | "right";
  tone?: "canvas" | "surface" | "tint";
}) {
  return (
    <section
      id={content.id}
      aria-labelledby={`${content.id}-title`}
      className={`${styles.section} ${styles[tone]}`}
    >
      <Container>
        <div
          className={`${styles.featureLayout} ${imagePlacement === "right" ? styles.imageRight : ""}`}
        >
          <div className={styles.featureCopy}>
            <Reveal>
              <p className="eyebrow">{content.eyebrow}</p>
              <h2 id={`${content.id}-title`}>{content.title}</h2>
              <p className={styles.description}>{content.description}</p>
            </Reveal>
            <ul className={styles.featureList}>
              {content.features.map((feature, index) => (
                <li key={feature.title}>
                  <Reveal delay={Math.min(index * 0.05, 0.15)}>
                    <h3>
                      <CheckIcon weight="regular" aria-hidden="true" />
                      {feature.title}
                    </h3>
                    <p>{feature.description}</p>
                    {feature.details && (
                      <ul className={styles.details}>
                        {feature.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className={styles.featurePhoto} delay={0.08}>
            <ProductPhoto asset={content.image} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
