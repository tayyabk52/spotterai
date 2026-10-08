import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import ScrollComposition from "@/components/motion/ScrollComposition";
import { lens, lensAssets, lensChapters } from "@/content/lens";
import LensScreenshot from "./LensScreenshot";
import styles from "./Lens.module.css";

export default function LensHero() {
  return (
    <section className={styles.hero} aria-labelledby="lens-title">
      <div className={styles.heroTop}>
        <div>
          <p className={styles.eyebrow}>{lens.hero.label}</p>
          <h1 id="lens-title">
            {lens.hero.title}
            <span>{lens.hero.emphasis}</span>
          </h1>
        </div>
        <Reveal className={styles.heroIntro} delay={0.08}>
          <p className={styles.intro}>{lens.hero.description}</p>
          <div className={styles.actions}>
            <ActionLink
              href={lens.actions.demo.href}
              className={styles.primary}
              arrow={<ArrowUpRightIcon aria-hidden="true" />}
            >
              {lens.actions.demo.label}
            </ActionLink>
            <a href="#lens-map" className={styles.explore}>
              {lens.hero.explore}
              <ArrowDownIcon size={20} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
      <div
        id="lens-map"
        className={styles.mapScene}
        role="region"
        aria-labelledby="lens-map-title"
      >
        <Reveal className={styles.mapCopy}>
          <p className={styles.chapterLabel}>{lens.hero.mapLabel}</p>
          <h2 id="lens-map-title">{lens.hero.mapTitle}</h2>
          <p>{lens.hero.mapDescription}</p>
        </Reveal>
        <ScrollComposition className={styles.mapMedia}>
          <LensScreenshot asset={lensAssets.map} priority />
        </ScrollComposition>
      </div>
      <nav aria-label={lens.ui.chapters} className={styles.chapterIndex}>
        {lensChapters.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`}>
            <span>{chapter.number}</span>
            {chapter.label}
            <ArrowDownIcon size={16} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </section>
  );
}
