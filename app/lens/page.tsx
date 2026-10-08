import type { Metadata } from "next";
import { lens } from "@/content/lens";
import LensHero from "@/components/sections/lens/LensHero";
import LensRankings from "@/components/sections/lens/LensRankings";
import LensHistory from "@/components/sections/lens/LensHistory";
import LensContact from "@/components/sections/lens/LensContact";
import styles from "@/components/sections/lens/Lens.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Spotter Lens: Freight Market Intelligence & Analytics",
  },
  description: lens.metadata.description,
  alternates: { canonical: "https://spotter.ai/lens" },
  openGraph: {
    title: "Spotter Lens: Freight Market Intelligence & Analytics",
    description: lens.metadata.description,
    url: "https://spotter.ai/lens",
    siteName: "Spotter.ai",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://spotter.ai/lens-assets/social.png",
        width: 1200,
        height: 630,
        alt: "Spotter Lens Freight Market Intelligence and Rate Analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spotter Lens: Freight Market Intelligence & Analytics",
    description: lens.metadata.description,
    images: ["https://spotter.ai/lens-assets/social.png"],
  },
};

export default function LensPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://spotter.ai/lens#software",
        name: "Spotter Lens",
        url: "https://spotter.ai/lens",
        description:
          "Freight market intelligence and rate analytics application delivering market rankings, hourly profitability metrics, US lane maps, and historical rate trends.",
        applicationCategory: "BusinessApplication",
        applicationSubCategory:
          "Freight Market Analytics & Rate Intelligence",
        operatingSystem: "Web browser",
        screenshot: "https://spotter.ai/lens-assets/market-map.webp",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://spotter.ai/request-quote?product=lens",
        },
        featureList: [
          "Interactive US Freight Market Profitability Heat Map",
          "Hourly Spotter Index (SI) Profitability Benchmarks",
          "Equipment Filtering for VAN, REEFER, and FLATBED",
          "Historical Freight Rate Lane Analysis and Trend Tracking",
          "Market Search by City, State, or Postal Code",
        ],
        publisher: {
          "@type": "Organization",
          name: "Spotter.ai",
          url: "https://spotter.ai",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://spotter.ai/lens#webpage",
        url: "https://spotter.ai/lens",
        name: "Spotter Lens: Freight Market Intelligence & Analytics",
        description: lens.metadata.description,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://spotter.ai/#website",
          name: "Spotter.ai",
          url: "https://spotter.ai",
        },
        mainEntity: {
          "@id": "https://spotter.ai/lens#software",
        },
      },
    ],
  };
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <LensHero />
      <LensRankings />
      <LensHistory />
      <LensContact />
    </main>
  );
}
