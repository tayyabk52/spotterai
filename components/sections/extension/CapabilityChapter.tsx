import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { ChartLineUpIcon } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { FunnelIcon } from "@phosphor-icons/react/dist/ssr/Funnel";
import Reveal from "@/components/Reveal";
import ScrollComposition from "@/components/motion/ScrollComposition";
import ProductVideo from "@/components/product/ProductVideo";
import {
  extension,
  type ExtensionFeature,
  type ProductDemoAsset,
} from "@/content/extension";
import styles from "./Extension.module.css";
export default function CapabilityChapter({
  chapter,
  asset,
  theme = "email",
}: {
  chapter: {
    id: string;
    number: string;
    label: string;
    title: string;
    features: readonly ExtensionFeature[];
  };
  asset: ProductDemoAsset;
  theme?: "email" | "market" | "filters";
}) {
  const Icon =
    theme === "email"
      ? EnvelopeIcon
      : theme === "market"
        ? ChartLineUpIcon
        : FunnelIcon;
  return (
    <section
      id={chapter.id}
      className={`${styles.chapter} ${styles[theme] ?? ""}`}
      aria-labelledby={`${chapter.id}-title`}
    >
      <div className={styles.chapterLayout}>
        <div className={styles.chapterHeading}>
          <Reveal>
            <p className={styles.number} aria-hidden="true">
              {chapter.number}
            </p>
            <p className={styles.eyebrow}>{extension.hero.label}</p>
            <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
          </Reveal>
        </div>
        <div className={styles.chapterBody}>
          <ScrollComposition>
            <ProductVideo
              asset={asset}
              label={extension.ui.demonstration}
              playLabel={extension.ui.play}
              fallback={extension.ui.fallback}
              unavailable={extension.ui.unavailable}
            />
          </ScrollComposition>
          <ul className={styles.features}>
            {chapter.features.map((feature, index) => (
              <li key={feature.title}>
                <Icon weight="duotone" aria-hidden="true" />
                <Reveal delay={index * 0.05}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
