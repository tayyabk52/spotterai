import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { PortalCard } from "@/components/login/PortalCard";
import { loginContent } from "@/content/login";
import "@/styles/tms-tokens.css";
import styles from "./Login.module.css";

export const metadata: Metadata = {
  title: "Platform Log In",
  description:
    "Sign in to Spotter TMS or Spotter Sentinel. Unified authenticated portals for transportation operations and automated safety management.",
  alternates: {
    canonical: "/login",
  },
};

export default function LoginPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`tmsStory ${styles.pageWrapper}`}
    >
      <div className={styles.contentContainer}>
        {/* Editorial Chapter Header styled identically to TMS */}
        <header className={styles.headerSection}>
          <p className={styles.chapterLabel} data-testid="login-eyebrow">
            <span>00</span>
            {loginContent.eyebrow}
          </p>

          <h1 className={styles.title}>
            {loginContent.heading}{" "}
            <span className={styles.titleAccent}>
              {loginContent.headingAccent}
            </span>
          </h1>

          <p className={styles.lead}>{loginContent.subheading}</p>
        </header>

        {/* 2-Portal Grid: Spotter TMS & Sentinel */}
        <div className={styles.portalGrid}>
          {loginContent.portals.map((portal) => (
            <PortalCard key={portal.id} portal={portal} />
          ))}
        </div>

        {/* Support & Driver App Assistance Row styled like TMS Coverage */}
        <footer className={styles.supportBar}>
          <p className={styles.supportText}>
            <span>{loginContent.support.prompt}</span>{" "}
            <Link
              href={loginContent.support.contactHref}
              className={styles.supportLink}
            >
              {loginContent.support.contactLabel}
            </Link>{" "}
            <span>or email</span>{" "}
            <a
              href={loginContent.support.emailHref}
              className={styles.supportLink}
            >
              {loginContent.support.emailLabel}
            </a>
          </p>

          <p className={styles.driverHint}>
            <span>{loginContent.driverAppPrompt.text}</span>{" "}
            <Link
              href={loginContent.driverAppPrompt.href}
              className={styles.driverLink}
            >
              <span>{loginContent.driverAppPrompt.linkText}</span>
              <ArrowUpRightIcon size={14} aria-hidden="true" />
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
