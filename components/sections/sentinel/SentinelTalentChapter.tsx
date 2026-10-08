"use client";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { sentinelContent } from "@/content/sentinel";
import { SentinelChapterIntro } from "./SentinelChapterIntro";
import sentinelStyles from "./CommercialChapters.module.css";

export function SentinelTalentChapter() {
  const { talentChapter } = sentinelContent;
  const [filter, setFilter] = useState<"all" | "A" | "B" | "flagged">("all");

  const filteredDrivers = talentChapter.drivers.filter((driver) => {
    if (filter === "all") return true;
    if (filter === "flagged")
      return driver.grade === "D" || driver.grade === "F";
    return driver.grade === filter;
  });

  return (
    <section
      id={talentChapter.id}
      aria-labelledby={`${talentChapter.id}-title`}
      className={`${sentinelStyles.section} ${sentinelStyles.dark}`}
    >
      <div className={sentinelStyles.container}>
        <SentinelChapterIntro chapter={talentChapter} />

        <Reveal>
          <ol className={sentinelStyles.workflow}>
            {talentChapter.steps.map((step) => (
              <li key={step.number}>
                <span className={sentinelStyles.stepNumber} aria-hidden="true">
                  {step.number}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className={sentinelStyles.talentSectionWrap}>
          <div
            className={sentinelStyles.talentFilterBar}
            role="group"
            aria-label="Filter driver talent by safety grade"
          >
            <button
              type="button"
              className={`${sentinelStyles.filterBtn} ${filter === "all" ? sentinelStyles.filterBtnActive : ""}`}
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
            >
              All Drivers ({talentChapter.drivers.length})
            </button>
            <button
              type="button"
              className={`${sentinelStyles.filterBtn} ${filter === "A" ? sentinelStyles.filterBtnActive : ""}`}
              onClick={() => setFilter("A")}
              aria-pressed={filter === "A"}
            >
              Grade A (90–100)
            </button>
            <button
              type="button"
              className={`${sentinelStyles.filterBtn} ${filter === "B" ? sentinelStyles.filterBtnActive : ""}`}
              onClick={() => setFilter("B")}
              aria-pressed={filter === "B"}
            >
              Grade B (80–89)
            </button>
            <button
              type="button"
              className={`${sentinelStyles.filterBtn} ${filter === "flagged" ? sentinelStyles.filterBtnActive : ""}`}
              onClick={() => setFilter("flagged")}
              aria-pressed={filter === "flagged"}
            >
              Flagged (Under 70)
            </button>
          </div>

          <p
            className={sentinelStyles.resultCount}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            Showing {filteredDrivers.length} of {talentChapter.drivers.length}{" "}
            drivers
          </p>
          <div className={sentinelStyles.talentGrid}>
            {filteredDrivers.map((driver) => {
              const gradeClass =
                driver.grade === "D" || driver.grade === "F"
                  ? sentinelStyles.gradeFlagged
                  : sentinelStyles.gradeVerified;

              return (
                <article
                  key={driver.name}
                  data-driver-card
                  className={sentinelStyles.driverCard}
                >
                  <div className={sentinelStyles.driverCardHeader}>
                    <div>
                      <h3 className={sentinelStyles.driverName}>
                        {driver.name}
                      </h3>
                      <p className={sentinelStyles.driverMeta}>
                        {driver.location} · {driver.ageGroup} ·{" "}
                        {driver.experience} exp
                      </p>
                    </div>
                    <div
                      className={`${sentinelStyles.driverScoreBadge} ${gradeClass}`}
                    >
                      <span>Grade {driver.grade}</span>
                      <strong>
                        {driver.score}
                        <small>/100</small>
                      </strong>
                      <span>Safety score</span>
                    </div>
                  </div>
                  <p className={sentinelStyles.driverStatus}>{driver.status}</p>
                  <a
                    href="/request-quote?product=sentinel"
                    className={sentinelStyles.accessDriverBtn}
                    aria-label={`Access verified profile for ${driver.name}`}
                  >
                    Access Verified Profile &rarr;
                  </a>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
