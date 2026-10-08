"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { insightsContent as copy } from "@/content/insights";
import { insightsQueryHref, type InsightsQuery } from "@/lib/insights/query";
import styles from "./Insights.module.css";

export function InsightsFilters({
  query,
  categories,
}: {
  query: InsightsQuery;
  categories: readonly string[];
}) {
  const router = useRouter();
  return (
    <div className={styles.filters}>
      <div className={styles.tools}>
        <form
          action="/insights#latest-articles"
          method="get"
          className={styles.search}
        >
          <label className={styles.srOnly} htmlFor="insights-search">
            {copy.search}
          </label>
          <MagnifyingGlassIcon size={20} aria-hidden="true" />
          <input
            id="insights-search"
            name="q"
            type="search"
            maxLength={200}
            defaultValue={query.search}
            key={query.search}
            placeholder={copy.searchPlaceholder}
          />
          {query.category !== "All Articles" && (
            <input type="hidden" name="category" value={query.category} />
          )}
          <input type="hidden" name="sort" value={query.sort} />
          <button type="submit">{copy.interface.searchButton}</button>
        </form>
        <div className={styles.sort}>
          <label htmlFor="insights-sort">{copy.sort}</label>
          <select
            id="insights-sort"
            value={query.sort}
            onChange={(event) =>
              router.push(
                insightsQueryHref(query, {
                  sort: event.target.value === "oldest" ? "oldest" : "latest",
                  page: 1,
                }),
              )
            }
          >
            {copy.sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <noscript>
            <a
              href={insightsQueryHref(query, {
                sort: query.sort === "latest" ? "oldest" : "latest",
                page: 1,
              })}
            >
              {query.sort === "latest" ? "Oldest" : "Latest"}
            </a>
          </noscript>
        </div>
      </div>
      <nav
        aria-label={copy.interface.filterLabel}
        className={styles.categories}
      >
        {categories.map((category) => (
          <Link
            key={category}
            href={insightsQueryHref(query, { category, page: 1 })}
            aria-current={query.category === category ? "page" : undefined}
          >
            {category}
          </Link>
        ))}
      </nav>
    </div>
  );
}
