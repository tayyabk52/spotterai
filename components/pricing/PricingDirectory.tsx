"use client";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowsDownUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowsDownUp";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";

import { useState } from "react";
import { MVR_PRICES } from "@/content/mvr-pricing";
import {
  type PricingOrder,
  formatPrice,
  pricingQuery,
  selectStatePrices,
} from "@/lib/mvr-pricing";
import styles from "./MvrPricing.module.css";

export function PricingDirectory({
  initialQuery,
  initialOrder,
}: {
  initialQuery: string;
  initialOrder: PricingOrder;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [order, setOrder] = useState(initialOrder);
  const rows = selectStatePrices(query, order);

  function sortLink(column: "state" | "price") {
    const nextOrder: PricingOrder =
      order === `${column}-asc` ? `${column}-desc` : `${column}-asc`;
    return (
      <a
        href={`/mvr-pricing?${pricingQuery(query, nextOrder)}`}
        onClick={(event) => {
          if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          event.preventDefault();
          setOrder(nextOrder);
        }}
      >
        {column === "state" ? "State" : "MVR Price"}
        <span aria-hidden="true">
          {order.startsWith(column) ? (order.endsWith("asc") ? <ArrowUpIcon aria-hidden="true" /> : <ArrowDownIcon aria-hidden="true" />) : <ArrowsDownUpIcon aria-hidden="true" />}
        </span>
      </a>
    );
  }

  return (
    <section className={styles.directory} aria-labelledby="state-pricing-title">
      <div className={styles.directoryHeading}>
        <div>
          <h2 id="state-pricing-title">Find your state.</h2>
          <p className={styles.count} role="status">
            Showing {rows.length} of {MVR_PRICES.length} states
          </p>
        </div>
        <div className={styles.exports}>
          <a
            href={`/mvr-pricing/pricing.csv?${pricingQuery(query, order)}`}
            download
          >
            Download CSV<DownloadSimpleIcon aria-hidden="true" />
          </a>
          <button
            className={styles.printButton}
            type="button"
            onClick={() => window.print()}
          >
            Print / save PDF<ArrowUpRightIcon aria-hidden="true" />
          </button>
        </div>
      </div>
      <form
        action="/mvr-pricing"
        method="get"
        className={styles.search}
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="pricing-search">Search by state code or name</label>
        <div>
          <input
            id="pricing-search"
            name="q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. Illinois or IL"
          />
          <input type="hidden" name="sort" value={order} />
          <button type="submit">Search</button>
          {query && (
            <a
              href={`/mvr-pricing?${pricingQuery("", order)}`}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                setQuery("");
              }}
            >
              Clear
            </a>
          )}
        </div>
      </form>
      <table className={styles.table}>
        <caption className={styles.tableCaption}>
          Motor Vehicle Record pricing by state in US dollars
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              aria-sort={
                order.startsWith("state")
                  ? order.endsWith("asc")
                    ? "ascending"
                    : "descending"
                  : undefined
              }
            >
              {sortLink("state")}
            </th>
            <th
              scope="col"
              aria-sort={
                order.startsWith("price")
                  ? order.endsWith("asc")
                    ? "ascending"
                    : "descending"
                  : undefined
              }
            >
              {sortLink("price")}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.code}>
              <th scope="row">
                <span>{row.state}</span>
                <span className={styles.stateCode}>{row.code}</span>
              </th>
              <td>{formatPrice(row.price)}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={2} className={styles.empty}>
                No matching states. Try a state name or two-letter code.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <noscript>
        <style>{`.${styles.printButton}{display:none}`}</style>
      </noscript>
    </section>
  );
}
