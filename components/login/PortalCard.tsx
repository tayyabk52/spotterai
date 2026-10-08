"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
import { Compass } from "@phosphor-icons/react/dist/ssr/Compass";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { TrendUp } from "@phosphor-icons/react/dist/ssr/TrendUp";
import { WarningOctagon } from "@phosphor-icons/react/dist/ssr/WarningOctagon";
import { type LoginPortal, type PortalFeature } from "@/content/login";
import styles from "./PortalCard.module.css";

interface PortalCardProps {
  portal: LoginPortal;
}

/**
 * Returns the matching Phosphor icon for a portal feature item.
 */
function getFeatureIcon(name: PortalFeature["iconName"]) {
  switch (name) {
    case "analytics":
      return <ChartLineUp size={18} weight="duotone" />;
    case "fleet":
      return <Truck size={18} weight="duotone" />;
    case "routing":
      return <Compass size={18} weight="duotone" />;
    case "safety":
      return <ShieldCheck size={18} weight="duotone" />;
    case "compliance":
      return <TrendUp size={18} weight="duotone" />;
    case "risk":
      return <WarningOctagon size={18} weight="duotone" />;
    default:
      return null;
  }
}

/**
 * Redesigned Authenticated Portal Card following TMS editorial architecture.
 * Features clean typographic hierarchy, hairline capability dividers (no generic chips),
 * and tactile primary action links.
 */
export function PortalCard({ portal }: PortalCardProps) {
  const isTeal = portal.accentColor === "teal";

  return (
    <article
      className={`${styles.card} ${isTeal ? styles.cardTeal : styles.cardCoral}`}
      data-testid={`login-portal-${portal.id}`}
    >
      {/* Brand Dots Signature */}
      <div className={styles.brandDots} aria-hidden="true">
        <svg
          viewBox="0 0 72 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.dotsSvg}
        >
          {isTeal ? (
            <>
              {/* Upper-left dot */}
              <circle cx="12" cy="12" r="10" fill="#008080" />
              {/* Lower-left dot */}
              <circle cx="12" cy="36" r="10" fill="#006d6d" />
              {/* Lower-mid dot */}
              <circle cx="36" cy="36" r="10" fill="#bbddde" />
              {/* Lower-right dot */}
              <circle cx="60" cy="36" r="10" fill="#fafdfd" />
            </>
          ) : (
            <>
              {/* Upper-left dot */}
              <circle cx="12" cy="12" r="10" fill="#f8485f" />
              {/* Lower-left dot */}
              <circle cx="12" cy="36" r="10" fill="#dc2626" />
              {/* Lower-mid dot */}
              <circle cx="36" cy="36" r="10" fill="#fecaca" />
              {/* Lower-right dot */}
              <circle cx="60" cy="36" r="10" fill="#fafdfd" />
            </>
          )}
        </svg>
      </div>

      {/* Header Info */}
      <header className={styles.cardHeader}>
        <p className={styles.systemTag}>{portal.systemType}</p>
        <h2 className={styles.cardTitle}>{portal.title}</h2>
        <p className={styles.cardDesc}>{portal.description}</p>
      </header>

      {/* Architectural Capabilities List (TMS style, no generic chips) */}
      <ul
        className={styles.features}
        aria-label={`${portal.title} core capabilities`}
      >
        {portal.features.map((feat, index) => (
          <li key={feat.label} className={styles.featureRow}>
            <span className={styles.featureNumber} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.featureContent}>
              <span className={styles.featureIcon} aria-hidden="true">
                {getFeatureIcon(feat.iconName)}
              </span>
              <span className={styles.featureLabel}>{feat.label}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Portal Access Action Button */}
      <div className={styles.actionWrap}>
        <a
          href={portal.ctaHref}
          className={`${styles.primary} ${
            isTeal ? styles.primaryTeal : styles.primaryCoral
          }`}
          data-testid={`access-btn-${portal.id}`}
          aria-label={`${portal.ctaLabel} (opens in portal)`}
        >
          <span>{portal.ctaLabel}</span>
          <ArrowUpRightIcon
            size={18}
            className={styles.actionArrow}
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}
