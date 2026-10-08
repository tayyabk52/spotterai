import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { sentinelContent } from "@/content/sentinel";
import tmsStyles from "@/components/story/Story.module.css";
import sentinelStyles from "./Sentinel.module.css";

export default function SentinelClosingCta() {
  const { closingCta } = sentinelContent;

  return (
    <section
      id="sentinel-cta"
      aria-labelledby="sentinel-cta-title"
      className={tmsStyles.contact}
    >
      <Reveal>
        <p className={tmsStyles.chapterLabel}>
          <span>06</span>
          {closingCta.eyebrow}
        </p>
        <h2 id="sentinel-cta-title">{closingCta.heading}</h2>
      </Reveal>

      <div className={tmsStyles.contactBottom}>
        <p className={tmsStyles.lead}>{closingCta.description}</p>

        <div className={tmsStyles.actions}>
          <ActionLink
            href={closingCta.primaryHref}
            className={tmsStyles.primary}
            arrow={<ArrowUpRightIcon aria-hidden="true" />}
          >
            {closingCta.primaryCta}
          </ActionLink>
          <a
            href={closingCta.secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className={tmsStyles.secondary}
          >
            {closingCta.secondaryCta}
          </a>
        </div>

        <div className={sentinelStyles.guaranteeGrid}>
          {closingCta.guarantees.map((item) => (
            <div key={item.label} className={sentinelStyles.guaranteeCard}>
              <span className={sentinelStyles.guaranteeLabel}>
                {item.label}
              </span>
              <span className={sentinelStyles.guaranteeDetail}>
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
