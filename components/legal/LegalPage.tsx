import Link from "next/link";
import Container from "@/components/layout/Container";
import type { LegalDocument, LegalSection } from "@/content/legal/types";
import { LegalBlocks } from "./LegalBlocks";
import styles from "./LegalPage.module.css";

const LEGAL_PAGES = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-services", label: "Terms of Service" },
  { href: "/ccpa", label: "CCPA" },
];

function ContentsLinks({
  sections,
  hasRequest,
}: {
  sections: readonly LegalSection[];
  hasRequest: boolean;
}) {
  return (
    <ol className={styles.contentsLinks}>
      {sections.map((section, index) => (
        <li key={section.id}>
          <a href={`#${section.id}`}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {section.title.replace(/^\d+\.\s*/, "")}
          </a>
        </li>
      ))}
      {hasRequest && (
        <li>
          <a href="#privacy-request">
            <span aria-hidden="true">03</span>Make a privacy request
          </a>
        </li>
      )}
    </ol>
  );
}

export function LegalPage({
  document,
  children,
}: {
  document: LegalDocument;
  children?: React.ReactNode;
}) {
  const hasRequest = Boolean(children);
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={styles.hero}>
        <Container>
          <p className={styles.eyebrow}>Legal & privacy</p>
          <h1>{document.title}</h1>
          {document.effectiveDate && (
            <p className={styles.effective}>{document.effectiveDate}</p>
          )}
        </Container>
      </header>
      <Container>
        <nav className={styles.policyNavigation} aria-label="Legal documents">
          {LEGAL_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              aria-current={page.href === document.path ? "page" : undefined}
            >
              {page.label}
            </Link>
          ))}
        </nav>
        <div className={styles.layout}>
          <aside className={styles.index}>
            <nav className={styles.desktopContents} aria-label="On this page">
              <p>On this page</p>
              <ContentsLinks
                sections={document.sections}
                hasRequest={hasRequest}
              />
            </nav>
            <details className={styles.mobileContents}>
              <summary>
                On this page<span aria-hidden="true">+</span>
              </summary>
              <nav aria-label="On this page">
                <ContentsLinks
                  sections={document.sections}
                  hasRequest={hasRequest}
                />
              </nav>
            </details>
          </aside>
          <article
            className={styles.document}
            aria-label={document.navigationLabel}
          >
            {document.introduction.length > 0 && (
              <div className={styles.introduction}>
                <LegalBlocks blocks={document.introduction} />
              </div>
            )}
            {document.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                <LegalBlocks blocks={section.blocks} />
              </section>
            ))}
            {children}
            <div className={styles.documentEnd}>
              <span>Spotter.ai</span>
              <a href="#main-content">Back to top ↑</a>
            </div>
          </article>
        </div>
      </Container>
    </main>
  );
}
