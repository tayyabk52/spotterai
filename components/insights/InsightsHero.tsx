import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Container from "@/components/layout/Container";
import Reveal from "@/components/Reveal";
import {
  insightsContent as copy,
  insightHref,
  type InsightSummary,
} from "@/content/insights";
import { InsightImage } from "./InsightImage";
import { InsightMeta } from "./InsightMeta";
import styles from "./Insights.module.css";

export function InsightsHero({
  featured,
}: {
  featured: InsightSummary | null;
}) {
  return (
    <section className={styles.hero} aria-labelledby="insights-title">
      <Container>
        <Reveal entrance className={styles.heroIntro}>
          <p className={`eyebrow ${styles.darkEyebrow}`}>{copy.eyebrow}</p>
          <h1 id="insights-title">
            {copy.heading} <br />
            <span>{copy.headingAccent}</span>
          </h1>
          <p className={styles.introduction}>{copy.introduction}</p>
        </Reveal>
        {featured && (
          <Reveal delay={0.08}>
            <article className={styles.featured}>
              <div className={styles.featuredCopy}>
                <p className={styles.featuredLabel}>{copy.featured}</p>
                <InsightMeta article={featured} />
                <h2>
                  <Link href={insightHref(featured.slug)}>
                    {featured.title}
                  </Link>
                </h2>
                <p>{featured.excerpt}</p>
                <Link
                  className={styles.readLink}
                  href={insightHref(featured.slug)}
                >
                  {copy.readArticle}
                  <ArrowUpRightIcon size={24} aria-hidden="true" />
                </Link>
              </div>
              {featured.image && (
                <Link
                  href={insightHref(featured.slug)}
                  className={styles.featuredImage}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <InsightImage image={featured.image} priority />
                </Link>
              )}
            </article>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
