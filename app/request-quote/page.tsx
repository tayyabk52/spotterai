import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";
import styles from "./RequestQuote.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Request a Demo or Quote | Spotter Freight Operations",
  },
  description:
    "Request pricing, custom platform demos, and operational intelligence for Spotter.ai. Connect with our team to optimize your fleet workflows and load planning.",
  alternates: {
    canonical: "https://spotter.ai/request-quote",
  },
  openGraph: {
    title: "Request a Demo or Quote | Spotter Freight Operations",
    description:
      "Request pricing, custom platform demos, and operational intelligence for Spotter.ai. Connect with our team to optimize your fleet workflows and load planning.",
    url: "https://spotter.ai/request-quote",
    siteName: "Spotter.ai",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Request a Quote — Spotter.ai Freight Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Demo or Quote | Spotter Freight Operations",
    description:
      "Request pricing, custom platform demos, and operational intelligence for Spotter.ai. Connect with our team to optimize your fleet workflows and load planning.",
    images: ["/opengraph-image"],
  },
};

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const initialProduct =
    typeof resolvedParams?.product === "string"
      ? resolvedParams.product
      : undefined;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://spotter.ai/request-quote#webpage",
        url: "https://spotter.ai/request-quote",
        name: "Request a Demo or Quote | Spotter Freight Operations",
        description:
          "Request pricing, custom platform demos, and operational intelligence for Spotter.ai. Connect with our team to optimize your fleet workflows and load planning.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://spotter.ai/#website",
          url: "https://spotter.ai",
          name: "Spotter.ai",
        },
        about: {
          "@id": "https://spotter.ai/#organization",
        },
        mainEntity: {
          "@type": "Organization",
          "@id": "https://spotter.ai/#organization",
          name: "Spotter.ai",
          url: "https://spotter.ai",
          logo: {
            "@type": "ImageObject",
            url: "https://spotter.ai/brand/spotter-logo.png",
            width: 640,
            height: 158,
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              email: "sales@spotter.ai",
              availableLanguage: "en",
            },
          ],
        },
      },
    ],
  };

  return (
    <main id="main-content" className={styles.pageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <div className={styles.contentContainer}>
        <header className={styles.headerSection}>
          <p className={styles.eyebrow}>Let’s talk</p>
          <h1 className={styles.title}>
            Request for <span className={styles.titleAccent}>Information</span>
          </h1>
          <p className={styles.subtitle}>
            Connect with our logistics operations team to explore tailored
            platform solutions.
          </p>
          <div className={styles.brandMark} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={styles.contact}>
            <p>Prefer email?</p>
            <a href="mailto:sales@spotter.ai">
              sales@spotter.ai <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </div>
        </header>

        <section aria-label="Request quote and demonstration form">
          <QuoteForm initialProduct={initialProduct} />
        </section>
      </div>
    </main>
  );
}
