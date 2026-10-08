import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import { HomeDemo } from "@/components/sections/HomeDemo";
import Results from "@/components/sections/Results";
import CustomerSummary from "@/components/sections/CustomerSummary";
import Awards from "@/components/sections/Awards";
import ClosingCTA from "@/components/sections/ClosingCTA";
export const metadata: Metadata = {
  title: {
    absolute: "Spotter.ai: Trucking Automation & Freight Intelligence",
  },
  description:
    "Explore Spotter's tools for fleet operations, freight market intelligence, recruiting, load selection, and safety. Request a demo or quote for your team.",
  alternates: { canonical: "https://spotter.ai" },
  openGraph: {
    title: "Spotter.ai: Trucking Automation & Freight Intelligence",
    description:
      "Explore Spotter's tools for fleet operations, freight market intelligence, recruiting, load selection, and safety. Request a demo or quote for your team.",
    url: "https://spotter.ai",
    type: "website",
    siteName: "Spotter.ai",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Spotter.ai — Trucking automation and freight intelligence platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spotter.ai: Trucking Automation & Freight Intelligence",
    description:
      "Explore Spotter's tools for fleet operations, freight market intelligence, recruiting, load selection, and safety. Request a demo or quote for your team.",
    images: ["/opengraph-image"],
  },
};
export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://spotter.ai/#website",
        url: "https://spotter.ai",
        name: "Spotter.ai",
        description:
          "Trucking automation and freight intelligence platform for modern carrier operations.",
        publisher: {
          "@id": "https://spotter.ai/#organization",
        },
      },
      {
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
        description:
          "Spotter.ai provides connected trucking automation, fleet operations, and freight intelligence software for carriers and logistics teams.",
        email: "sales@spotter.ai",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "sales@spotter.ai",
            availableLanguage: "en",
          },
        ],
        sameAs: [
          "https://www.linkedin.com/company/spotter-sentinel/about/?viewAsMember=true",
          "https://www.facebook.com/people/Spotter-Sentinel/61577984011373/",
          "https://www.instagram.com/sentinel.safety/",
        ],
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Capabilities />
      <HomeDemo />
      <Results />
      <CustomerSummary />
      <Awards />
      <ClosingCTA />
    </main>
  );
}
