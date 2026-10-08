import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import Container from "@/components/layout/Container";
import {
  insightsContent as copy,
  type InsightArticle as Article,
} from "@/content/insights";
import { insightArticleHtml } from "@/lib/insights/article-html";
import { InsightMeta } from "./InsightMeta";
import { InsightImage } from "./InsightImage";
import styles from "./Insights.module.css";

export function InsightArticle({ article }: { article: Article }) {
  return (
    <article className={styles.article}>
      <header className={styles.articleHeader}>
        <Container>
          <Link href="/insights" className={styles.backLink}>
            <ArrowLeftIcon size={20} aria-hidden="true" />
            {copy.back}
          </Link>
          <InsightMeta article={article} />
          <h1>{article.title}</h1>
          {article.tags.length > 0 && (
            <ul className={styles.tags}>
              {article.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </Container>
      </header>
      <Container>
        {article.image && (
          <div className={styles.articleCover}>
            <InsightImage
              image={article.image}
              priority
              sizes="(min-width: 1200px) 1100px, 100vw"
            />
          </div>
        )}
        <div
          className={styles.articleBody}
          dangerouslySetInnerHTML={{ __html: insightArticleHtml(article) }}
        />
        {article.cta && (
          <section
            className={styles.articleCta}
            aria-labelledby="article-contact-title"
          >
            <h2 id="article-contact-title">{article.cta.title}</h2>
            <p>{article.cta.description}</p>
            <a className={styles.button} href={article.cta.href}>
              {article.cta.label}
            </a>
          </section>
        )}
      </Container>
    </article>
  );
}
