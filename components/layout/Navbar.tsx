"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { navigation, quoteLink } from "@/content/home";
import { insightHref, insightsContent } from "@/content/insights";
import { useInsightsMenu } from "@/components/insights/useInsightsMenu";
import { SignIn } from "@phosphor-icons/react/dist/ssr/SignIn";
import Container from "./Container";
import styles from "./Navbar.module.css";
import MobileDrawer from "./MobileDrawer";

const featuredCards: Record<
  string,
  {
    image: string;
    tag: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  }
> = {
  Products: {
    image: "/images/menu/products.jpg",
    tag: "Operations Suite",
    title: "Command Center Technology",
    description:
      "Six synchronized tools unifying dispatch, real-time pricing intelligence, and DOT safety compliance.",
    ctaLabel: "Explore the suite",
    ctaHref: "/#capabilities",
  },
  Solutions: {
    image: "/images/menu/solutions.jpg",
    tag: "Fleet Velocity",
    title: "Engineered for Every Mile",
    description:
      "Carriers achieve 40% lower operating overhead and 60% faster load matching on active freight corridors.",
    ctaLabel: "Request a quote",
    ctaHref: quoteLink.href,
  },
  Resources: {
    image: "/images/menu/resources.jpg",
    tag: insightsContent.eyebrow,
    title: `${insightsContent.heading} ${insightsContent.headingAccent}`,
    description: insightsContent.introduction,
    ctaLabel: insightsContent.interface.menuAll,
    ctaHref: "/insights",
  },
  Company: {
    image: "/images/menu/company.jpg",
    tag: "Culture & Team",
    title: "Built by Freight Builders",
    description:
      "Named a 2026 Top Workplace by USA Today. We are engineering the modern operating system for logistics.",
    ctaLabel: "View open roles",
    ctaHref: "/careers",
  },
};

const customDescriptions: Record<string, string> = {
  "Fleet Management": "Automate dispatch, load tracking, and routing.",
  "Safety & Compliance": "Real-time safety scoring, logs, and audit readiness.",
  "Market Intelligence": "Dynamic spot market rates and capacity trends.",
  "Owner-Operators": "AI load matching tailored for independent drivers.",
  Insights: "Logistics research, trends, and market reports.",
  "Watch a Demo": "A full interactive walkthrough of the platform.",
  "Chrome Extension": "Streamline load-board search and booking.",
  "Loan Calculators": "Equipment finance and fleet cost modeling.",
  "About Spotter": "Our mission, leadership, and connected fleet vision.",
  "Contact Sales": "Speak with a freight automation specialist.",
  Careers: "Explore open engineering, product, and ops roles.",
};

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const insightMenu = useInsightsMenu(active === "Resources");
  const [mobileOpen, setMobileOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseEnter = (label: string) => {
    if (typeof window !== "undefined" && window.innerWidth >= 1200) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActive(label);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1200) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setActive(null);
      }, 160);
    }
  };

  const handleTriggerClick = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    function dismiss(event: Event) {
      if (mobileOpen) return;
      if (!header.current?.contains(event.target as Node)) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActive(null);
        setMobileOpen(false);
      }
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (mobileOpen) {
        return;
      } else if (active) {
        const lastActive = active;
        setActive(null);
        triggers.current[lastActive]?.focus();
      }
    }
    function resize() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActive(null);
      if (window.innerWidth >= 1200) setMobileOpen(false);
    }

    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("mousedown", dismiss);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("mousedown", dismiss);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, mobileOpen]);

  const activeGroup = navigation.find((g) => g.label === active);
  const featured = active ? featuredCards[active] : null;

  return (
    <header className={styles.header} ref={header}>
      <Container className={styles.bar}>
        <Link href="/" aria-label="Spotter.ai home" className={styles.logo}>
          <Image
            src="/brand/spotter-logo.png"
            width={640}
            height={158}
            alt="Spotter.ai"
            sizes="176px"
            priority
          />
        </Link>

        <button
          type="button"
          ref={menuButton}
          className={styles.menuButton}
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          aria-controls={mobileOpen ? "mobile-navigation" : undefined}
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setActive(null);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M3 8H21M3 16H21" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={styles.navigation}
        >
          <ul className={styles.groups}>
            {navigation.map((group) => {
              const isCurrent = active === group.label;

              return (
                <li
                  key={group.label}
                  className={styles.group}
                  onMouseEnter={() => handleMouseEnter(group.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    ref={(element) => {
                      triggers.current[group.label] = element;
                    }}
                    className={styles.trigger}
                    aria-expanded={isCurrent}
                    aria-controls={isCurrent ? "desktop-megamenu" : undefined}
                    onClick={() => handleTriggerClick(group.label)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                        e.preventDefault();
                        setActive(group.label);
                      }
                    }}
                  >
                    <span>{group.label}</span>
                    <svg
                      className={`${styles.chevron} ${
                        isCurrent ? styles.rotate : ""
                      }`}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="2.5 4.5 6 7.5 9.5 4.5" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className={styles.cta}>
            <Link
              href="/login"
              className={styles.loginLink}
              aria-label="Log in to platform portals"
              data-testid="nav-login-btn"
            >
              <SignIn size={16} weight="bold" className={styles.loginIcon} aria-hidden="true" />
              <span>Log in</span>
            </Link>
            <a
              href={quoteLink.href}
              className={styles.pillButton}
              aria-label="Request a demo or quote"
            >
              <svg
                className={styles.pillIcon}
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2.5" y="3.5" width="11" height="10" rx="2" />
                <path d="M5.5 1.75V4.25M10.5 1.75V4.25M2.5 7h11" />
                <circle cx="8" cy="10" r="1.1" fill="currentColor" />
              </svg>
              <span>Request a quote</span>
            </a>
          </div>
        </nav>

        {/* Desktop Framer Motion Megamenu Panel */}
        <AnimatePresence>
          {active && activeGroup && (
            <motion.div
              id="desktop-megamenu"
              data-menu={active}
              key="desktop-megamenu"
              className={styles.desktopMegamenu}
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -8, scale: 0.995 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -6, scale: 0.995 }
              }
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.megamenuGrid}>
                {/* Column 1: Primary Section */}
                <div className={styles.menuColumn}>
                  <div className={styles.columnEyebrow}>
                    <span>
                      {active === "Products"
                        ? "Core Platform"
                        : active === "Solutions"
                          ? "By Workflow"
                          : active === "Resources"
                            ? "Hubs & Tools"
                            : "About Spotter"}
                    </span>
                  </div>
                  <ul className={styles.itemsList}>
                    {(active === "Resources"
                      ? activeGroup.items
                      : activeGroup.items.slice(0, 3)
                    ).map((item) => {
                      const desc =
                        item.description || customDescriptions[item.label];
                      return (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            className={styles.itemCard}
                            onClick={() => setActive(null)}
                          >
                            <div className={styles.itemHeader}>
                              <span className={styles.itemTitle}>
                                {item.label}
                              </span>
                              <span
                                className={styles.itemArrow}
                                aria-hidden="true"
                              >
                                {item.href.startsWith("http") &&
                                !item.href.includes("spotter.ai")
                                  ? "↗"
                                  : "→"}
                              </span>
                            </div>
                            {desc && <p className={styles.itemDesc}>{desc}</p>}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Column 2: Secondary Section */}
                <div className={styles.menuColumn}>
                  <div className={styles.columnEyebrow}>
                    <span>
                      {active === "Products"
                        ? "Fleet & Drivers"
                        : active === "Solutions"
                          ? "By Role"
                          : active === "Resources"
                            ? "From Insights"
                            : "Recognition & Trust"}
                    </span>
                  </div>

                  {active === "Resources" ? (
                    <div className={styles.insightsWrapper}>
                      <ul className={styles.insightsList}>
                        {insightMenu.articles.map((item) => (
                          <li key={item.slug}>
                            <a
                              href={insightHref(item.slug)}
                              className={styles.insightItem}
                              onClick={() => setActive(null)}
                            >
                              <div className={styles.insightMeta}>
                                <span className={styles.insightBadge}>
                                  {item.category}
                                </span>
                                <span className={styles.insightTitle}>
                                  {item.title}
                                </span>
                              </div>
                              <span
                                className={styles.insightArrow}
                                aria-hidden="true"
                              >
                                ↗
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                      {insightMenu.error && (
                        <p role="status">
                          {insightsContent.interface.menuUnavailable}
                        </p>
                      )}
                      {insightMenu.loading &&
                        insightMenu.articles.length === 0 && (
                          <p role="status">
                            {insightsContent.interface.menuLoading}
                          </p>
                        )}
                      <Link
                        href="/insights"
                        className={styles.viewAllInsights}
                        onClick={() => setActive(null)}
                      >
                        <span>{insightsContent.interface.menuAll}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  ) : active === "Solutions" ? (
                    <ul className={styles.itemsList}>
                      {[
                        {
                          label: "Owner-Operators",
                          href: "/driversapp",
                          desc: "AI load scoring and matching tailored for independent drivers.",
                        },
                        {
                          label: "Dispatch Teams",
                          href: "/tms",
                          desc: "Streamline daily dispatch operations and communication lag.",
                        },
                        {
                          label: "Safety & Compliance Officers",
                          href: "/sentinel",
                          desc: "Proactive driver scoring, audit logs, and risk automation.",
                        },
                      ].map((sol) => (
                        <li key={sol.label}>
                          <a
                            href={sol.href}
                            className={styles.itemCard}
                            onClick={() => setActive(null)}
                          >
                            <div className={styles.itemHeader}>
                              <span className={styles.itemTitle}>
                                {sol.label}
                              </span>
                              <span
                                className={styles.itemArrow}
                                aria-hidden="true"
                              >
                                →
                              </span>
                            </div>
                            <p className={styles.itemDesc}>{sol.desc}</p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : active === "Company" ? (
                    <div className={styles.companyMetaPanel}>
                      <div className={styles.awardHighlightCard}>
                        <div className={styles.awardBadgeHeader}>
                          <span className={styles.awardTag}>Recognition</span>
                          <span className={styles.awardYear}>2026</span>
                        </div>
                        <h5 className={styles.awardTitle}>
                          USA Today Top Workplaces
                        </h5>
                        <p className={styles.awardDesc}>
                          Honored for employee appreciation, career development,
                          and cutting-edge AI logistics innovation.
                        </p>
                      </div>
                      <div className={styles.trustSnippet}>
                        <div className={styles.trustMetricRow}>
                          <span className={styles.trustMetric}>10,000+</span>
                          <span className={styles.trustSubmetric}>$50M+</span>
                        </div>
                        <span className={styles.trustText}>
                          Active fleet managers & reported customer savings.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <ul className={styles.itemsList}>
                      {activeGroup.items.slice(3).map((item) => {
                        const desc =
                          item.description || customDescriptions[item.label];
                        return (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              className={styles.itemCard}
                              onClick={() => setActive(null)}
                            >
                              <div className={styles.itemHeader}>
                                <span className={styles.itemTitle}>
                                  {item.label}
                                </span>
                                <span
                                  className={styles.itemArrow}
                                  aria-hidden="true"
                                >
                                  {item.href.startsWith("http") &&
                                  !item.href.includes("spotter.ai")
                                    ? "↗"
                                    : "→"}
                                </span>
                              </div>
                              {desc && (
                                <p className={styles.itemDesc}>{desc}</p>
                              )}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {/* Column 3: Featured Editorial Card */}
                {featured && (
                  <div className={styles.featuredColumn}>
                    <div className={styles.featuredCard}>
                      <div className={styles.featuredImageWrapper}>
                        <Image
                          src={featured.image}
                          alt={featured.title}
                          fill
                          sizes="320px"
                          className={styles.featuredImage}
                        />
                        <div
                          className={styles.imageOverlay}
                          aria-hidden="true"
                        />
                      </div>
                      <div className={styles.featuredBody}>
                        <div className={styles.featuredTagRow}>
                          <span className={styles.featuredDot} />
                          <span className={styles.featuredTag}>
                            {featured.tag}
                          </span>
                        </div>
                        <h4 className={styles.featuredTitle}>
                          {featured.title}
                        </h4>
                        <p className={styles.featuredDesc}>
                          {featured.description}
                        </p>
                        <a
                          href={featured.ctaHref}
                          className={styles.featuredCta}
                          onClick={() => setActive(null)}
                        >
                          <span>{featured.ctaLabel}</span>
                          <span aria-hidden="true" className={styles.ctaArrow}>
                            {featured.ctaHref.startsWith("http") ? "↗" : "→"}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <MobileDrawer
              onClose={() => setMobileOpen(false)}
              trigger={menuButton}
              descriptions={customDescriptions}
            />
          )}
        </AnimatePresence>

        <noscript>
          <a className={styles.noScript} href={quoteLink.href}>
            Request a quote ↗
          </a>
        </noscript>
      </Container>
    </header>
  );
}
