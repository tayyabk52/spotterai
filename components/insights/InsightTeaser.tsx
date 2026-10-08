import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { insightHref, type InsightSummary } from "@/content/insights";
import { InsightImage } from "./InsightImage";
import { InsightMeta } from "./InsightMeta";
import styles from "./Insights.module.css";

export function InsightTeaser({
  article,
  compact = false,
}: {
  article: InsightSummary;
  compact?: boolean;
}) {
  return (
    <article className={`${styles.teaser} ${compact ? styles.compact : ""}`}>
      <Link href={insightHref(article.slug)} className={styles.teaserLink}>
        {article.image && (
          <div className={styles.teaserImage}>
            <InsightImage
              image={article.image}
              sizes="(min-width: 768px) 30vw, 100vw"
            />
          </div>
        )}
        <div className={styles.teaserCopy}>
          <InsightMeta article={article} />
          <h3>{article.title}</h3>
          {!compact && <p>{article.excerpt}</p>}
          <span className={styles.teaserArrow} aria-hidden="true">
            <ArrowUpRightIcon size={24} />
          </span>
        </div>
      </Link>
    </article>
  );
}
