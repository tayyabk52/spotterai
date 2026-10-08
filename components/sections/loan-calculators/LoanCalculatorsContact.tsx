"use client";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import ActionLink from "@/components/ActionLink";
import { loanCalculatorsContent } from "@/content/loan-calculators";
import styles from "./Calculators.module.css";

export function LoanCalculatorsContact() {
  const content = loanCalculatorsContent.contact;

  return (
    <section
      id={content.id}
      aria-labelledby="contact-heading"
      className={`${styles.contactSection} ${styles.dark}`}
    >
      <div className={styles.container}>
        <div className={styles.contactCard}>
          <p className={styles.chapterLabel}>{content.eyebrow}</p>
          <h2 id="contact-heading">{content.title}</h2>
          <p>{content.description}</p>
          <div className={styles.actions}>
            <ActionLink
              href={content.action.href}
              className={styles.primary}
              arrow={<ArrowUpRightIcon aria-hidden="true" />}
            >
              {content.action.label}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
