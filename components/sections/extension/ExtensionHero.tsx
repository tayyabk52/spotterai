import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import ScrollComposition from "@/components/motion/ScrollComposition";
import ProductVideo from "@/components/product/ProductVideo";
import {
  extension,
  extensionAssets,
  extensionChapters,
} from "@/content/extension";
import styles from "./Extension.module.css";
export default function ExtensionHero() {
  return (
    <section className={styles.hero} aria-labelledby="extension-title">
      <div className={styles.heroTop}>
        <div>
          <p className={styles.eyebrow}>{extension.hero.label}</p>
          <h1 id="extension-title">
            {extension.hero.titleStart}{" "}
            <span>{extension.hero.titleEmphasis}</span>
          </h1>
        </div>
        <Reveal className={styles.heroIntro} delay={0.08}>
          <p className={styles.intro}>{extension.hero.description}</p>
          <div className={styles.actions}>
            <ActionLink
              href={extension.install.href}
              className={styles.install}
              arrow={<ArrowUpRightIcon aria-hidden="true" />}
            >
              {extension.install.label}
            </ActionLink>
            <a href="#extension-email" className={styles.secondary}>
              {extension.hero.exploration}
              <ArrowDownIcon size={20} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
      <ScrollComposition className={styles.heroMedia}>
        <ProductVideo
          asset={extensionAssets.main}
          priority
          autoPlay={false}
          label={extension.ui.demonstration}
          playLabel={extension.ui.play}
          fallback={extension.ui.fallback}
          unavailable={extension.ui.unavailable}
        />
      </ScrollComposition>
      <nav aria-label={extension.ui.chapters} className={styles.chapterIndex}>
        {extensionChapters.map((chapter) => (
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
