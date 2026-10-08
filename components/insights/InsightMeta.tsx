import { formatInsightDate, type InsightSummary } from "@/content/insights";
import styles from "./Insights.module.css";

export function InsightMeta({
  article,
  category = true,
}: {
  article: InsightSummary;
  category?: boolean;
}) {
  return (
    <div className={styles.meta}>
      {category && <span className={styles.category}>{article.category}</span>}
      <time dateTime={article.publishDate}>
        {formatInsightDate(article.publishDate)}
      </time>
      {article.readTime && <span>{article.readTime}</span>}
    </div>
  );
}
