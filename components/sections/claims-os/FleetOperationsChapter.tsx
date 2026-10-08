import React from "react";
import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { ReceiptIcon } from "@phosphor-icons/react/dist/ssr/Receipt";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { ChartLineUpIcon } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { claimsOs } from "@/content/claims-os";
import Reveal from "@/components/Reveal";
import styles from "./Claims.module.css";

const ROLE_ICONS = [
  <BriefcaseIcon key="claims" size={24} weight="duotone" color="var(--color-primary-strong)" aria-hidden="true" />,
  <ReceiptIcon key="accounting" size={24} weight="duotone" color="var(--color-primary-strong)" aria-hidden="true" />,
  <ShieldCheckIcon key="safety" size={24} weight="duotone" color="var(--color-primary-strong)" aria-hidden="true" />,
  <ChartLineUpIcon key="ops" size={24} weight="duotone" color="var(--color-primary-strong)" aria-hidden="true" />,
];

export function FleetOperationsChapter() {
  const { operations } = claimsOs;

  return (
    <section
      id={operations.id}
      aria-labelledby={`${operations.id}-title`}
      className={`${styles.chapter} ${styles.light} ${styles.scene}`}
    >
      <div className={styles.sceneLayout}>
        <Reveal className={styles.sceneCopy}>
          <div>
            <p className={styles.chapterLabel}>
              <span>{operations.number}</span>
              {operations.label}
            </p>
            <h2 id={`${operations.id}-title`}>{operations.title}</h2>
          </div>
          <p className={styles.lead}>{operations.description}</p>
        </Reveal>

        <div className={styles.roleGrid}>
          {operations.roles.map((item, index) => (
            <Reveal key={item.role} delay={index * 0.05}>
              <div className={styles.roleCard}>
                <h3>
                  {ROLE_ICONS[index]}
                  {item.role}
                </h3>
                <p>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
