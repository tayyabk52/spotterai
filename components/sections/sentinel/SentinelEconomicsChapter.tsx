import Reveal from "@/components/Reveal";
import { sentinelContent } from "@/content/sentinel";
import { SentinelChapterIntro } from "./SentinelChapterIntro";
import sentinelStyles from "./CommercialChapters.module.css";

export function SentinelEconomicsChapter() {
  const { economicsChapter } = sentinelContent;
  const { comparisonTable } = economicsChapter;

  return (
    <section
      id={economicsChapter.id}
      aria-labelledby={`${economicsChapter.id}-title`}
      className={`${sentinelStyles.section} ${sentinelStyles.light}`}
    >
      <div className={sentinelStyles.container}>
        <SentinelChapterIntro chapter={economicsChapter} />

        <Reveal className={sentinelStyles.tableCard}>
          <table
            className={sentinelStyles.comparisonTable}
            aria-label="Commercial Driver Screening Cost Comparison"
            role="table"
          >
            <thead role="rowgroup">
              <tr role="row">
                {comparisonTable.columns.map((col) => (
                  <th key={col} scope="col" role="columnheader">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody role="rowgroup">
              {comparisonTable.providers.map((row) => (
                <tr
                  key={row.name}
                  role="row"
                  className={
                    row.isSentinel ? sentinelStyles.rowSentinel : undefined
                  }
                >
                  <th scope="row" role="rowheader">
                    {row.name}
                    {row.isSentinel && (
                      <span className={sentinelStyles.sentinelBadge}>
                        {row.highlight}
                      </span>
                    )}
                  </th>
                  <td role="cell" data-label={comparisonTable.columns[1]}>
                    {row.mvr}
                  </td>
                  <td role="cell" data-label={comparisonTable.columns[2]}>
                    {row.psp}
                  </td>
                  <td role="cell" data-label={comparisonTable.columns[3]}>
                    {row.cdlis}
                  </td>
                  <td role="cell" data-label={comparisonTable.columns[4]}>
                    {row.reviews}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={sentinelStyles.tableFooter}>
            <p className={sentinelStyles.tableFootnote}>
              {comparisonTable.footnote}
            </p>
            <a
              href="https://spotter.ai/mvr-pricing"
              target="_blank"
              rel="noopener noreferrer"
              className={sentinelStyles.tariffLink}
            >
              View detailed state-by-state tariffs &rarr;
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
