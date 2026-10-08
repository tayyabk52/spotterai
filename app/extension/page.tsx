import type { Metadata } from "next";
import { extension } from "@/content/extension";
import ExtensionHero from "@/components/sections/extension/ExtensionHero";
import EmailChapter from "@/components/sections/extension/EmailChapter";
import MarketChapter from "@/components/sections/extension/MarketChapter";
import SearchChapter from "@/components/sections/extension/SearchChapter";
import ExtensionContact from "@/components/sections/extension/ExtensionContact";
import styles from "@/components/sections/extension/Extension.module.css";
export const metadata: Metadata = {
  title: {
    absolute: "Load Spotter: Load Board Automation Extension | Spotter.ai",
  },
  description: extension.metadata.description,
  alternates: { canonical: "https://spotter.ai/extension" },
  openGraph: {
    title: "Load Spotter: Load Board Automation Extension | Spotter.ai",
    description: extension.metadata.description,
    url: "https://spotter.ai/extension",
    siteName: "Spotter.ai",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://spotter.ai/extension-assets/social.png",
        width: 1200,
        height: 630,
        alt: "Load Spotter Browser Load Board Automation Extension",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Load Spotter: Load Board Automation Extension | Spotter.ai",
    description: extension.metadata.description,
    images: ["https://spotter.ai/extension-assets/social.png"],
  },
};

export default function ExtensionPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://spotter.ai/extension#webpage",
    name: "Load Spotter: Load Board Automation Extension | Spotter.ai",
    description: extension.metadata.description,
    url: "https://spotter.ai/extension",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://spotter.ai/#website",
      name: "Spotter.ai",
      url: "https://spotter.ai",
    },
    about: {
      "@type": "SoftwareApplication",
      "@id": "https://spotter.ai/extension#software",
      name: "Load Spotter",
      alternateName: "Load Spotter Chrome Extension",
      description:
        "Browser extension for freight dispatchers and brokers providing load board automation, one-click email inquiries, and market pricing insights.",
      url: "https://spotter.ai/extension",
      downloadUrl: extension.install.href,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Google Chrome",
      screenshot: "https://spotter.ai/extension-assets/extension-main.webp",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: extension.install.href,
      },
      featureList: [
        "One-Click Email Inquiries directly from Load Boards",
        "Customizable Email Templates for Dispatchers",
        "Seamless Gmail Integration for Freight Correspondence",
        "Color-Coded Destination Market Profitability Insights",
        "AI-Generated Rate Intelligence and Average Broker Rates",
        "Next Best Load Highlighting and Search Filtering",
      ],
      publisher: {
        "@type": "Organization",
        name: "Spotter.ai",
        url: "https://spotter.ai",
      },
    },
  };
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <ExtensionHero />
      <EmailChapter />
      <MarketChapter />
      <SearchChapter />
      <ExtensionContact />
    </main>
  );
}
