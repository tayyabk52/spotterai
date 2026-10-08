import Link from "next/link";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import Container from "@/components/layout/Container";
import Reveal from "@/components/Reveal";
import {
  insightsContent as copy,
  type InsightArticle,
} from "@/content/insights";
import {
  selectInsights,
  insightsQueryHref,
  type InsightsQuery,
} from "@/lib/insights/query";
import { InsightsFilters } from "./InsightsFilters";
import { InsightTeaser } from "./InsightTeaser";
import styles from "./Insights.module.css";

export function InsightsListing({
  articles,
  query,
}: {
  articles: InsightArticle[];
  query: InsightsQuery;
}) {
  const selection = selectInsights(articles, query);
  const categories = Array.from(
    new Set([
      ...copy.categories,
      ...articles.map((article) => article.category),
    ]),
  );
  return (
    <section
      id="latest-articles"
      className={styles.listing}
      aria-labelledby="latest-title"
    >
      <Container>
        <h2 id="latest-title">{copy.latest}</h2>
        <InsightsFilters query={query} categories={categories} />
        {selection.total ? (
          <div className={styles.articleList}>
            {selection.visible.map((article, index) => (
              <Reveal
                key={article.slug}
                delay={Math.min((index % 2) * 0.08, 0.16)}
              >
                <InsightTeaser article={article} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className={styles.empty} role="status">
            <h3>{copy.emptyHeading}</h3>
            <p>{copy.emptyBody}</p>
            <Link className={styles.button} href="/insights#latest-articles">
              {copy.interface.clear}
            </Link>
          </div>
        )}
        {selection.hasMore && (
          <Link
            className={`${styles.button} ${styles.loadMore}`}
            href={insightsQueryHref(query, { page: query.page + 1 })}
            scroll={false}
          >
            {copy.loadMore}
            <ArrowDownIcon size={20} aria-hidden="true" />
          </Link>
        )}
      </Container>
    </section>
  );
}
