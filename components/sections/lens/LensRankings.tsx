import { ListNumbersIcon } from "@phosphor-icons/react/dist/ssr/ListNumbers";
import { ChartLineUpIcon } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { TrendUpIcon } from "@phosphor-icons/react/dist/ssr/TrendUp";
import Reveal from "@/components/Reveal";
import ScrollComposition from "@/components/motion/ScrollComposition";
import { lens, lensAssets } from "@/content/lens";
import LensScreenshot from "./LensScreenshot";
import styles from "./Lens.module.css";
const icons = [ListNumbersIcon, ChartLineUpIcon, TrendUpIcon];

export default function LensRankings() {
  const chapter = lens.rankings;
  return (
    <section
      id={chapter.id}
      className={styles.chapter}
      aria-labelledby="lens-rankings-title"
    >
      <div className={styles.chapterLayout}>
        <div className={styles.chapterCopy}>
          <Reveal>
            <p className={styles.chapterLabel}>
              {chapter.number} / {chapter.label}
            </p>
            <h2 id="lens-rankings-title">
              {chapter.title}
              <span>{chapter.emphasis}</span>
            </h2>
            <p className={styles.description}>{chapter.description}</p>
          </Reveal>
          <dl className={styles.features}>
            {chapter.features.map((feature, index) => {
              const Icon = icons[index];
              return (
                <div key={feature.label}>
                  <Icon size={24} weight="duotone" aria-hidden="true" />
                  <dt>
                    {feature.title}
                    <small>{feature.label}</small>
                  </dt>
                  <dd>{feature.description}</dd>
                </div>
              );
            })}
          </dl>
        </div>
        <ScrollComposition className={styles.rankMedia}>
          <LensScreenshot asset={lensAssets.rankings} />
        </ScrollComposition>
      </div>
    </section>
  );
}
