import type { Metadata } from "next";
import { Quicksand, Source_Sans_3 } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothSectionScroll from "@/components/SmoothSectionScroll";
import "./globals.css";
const display = Quicksand({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-quicksand",
  display: "swap",
});
const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://spotter.ai"),
  title: {
    default: "Spotter.ai — Trucking automation for a clearer road ahead",
    template: "%s | Spotter.ai",
  },
  description:
    "Connected freight operations platform for fleet owners and operations teams. Explore Spotter TMS, Sentinel driver screening, Lens market intelligence, Driver App, ClaimsOS, and Extension.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spotter.ai",
    siteName: "Spotter.ai",
    title: "Spotter.ai — Trucking automation for a clearer road ahead",
    description:
      "Connected freight operations platform for fleet owners and operations teams. Explore Spotter TMS, Sentinel driver screening, Lens market intelligence, Driver App, ClaimsOS, and Extension.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Spotter.ai — A clearer road ahead. Connected trucking automation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spotter.ai — Trucking automation for a clearer road ahead",
    description:
      "Connected freight operations platform for fleet owners and operations teams.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://spotter.ai/#organization",
  name: "Spotter.ai",
  legalName: "Spotter Inc",
  url: "https://spotter.ai",
  logo: {
    "@type": "ImageObject",
    url: "https://spotter.ai/brand/spotter-logo.png",
    width: 640,
    height: 158,
  },
  description:
    "Spotter provides an integrated freight operations platform unifying dispatch TMS, driver screening, market intelligence, claims, and mobile driver tools.",
  email: "sales@spotter.ai",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sales@spotter.ai",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@spotter.ai",
      availableLanguage: ["en"],
    },
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://spotter.ai/#website",
  name: "Spotter.ai",
  url: "https://spotter.ai",
  publisher: {
    "@id": "https://spotter.ai/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://spotter.ai/insights?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      {/* Extensions can add body attributes before React hydrates. Suppression stays on this element only. */}
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, webSiteSchema]).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
        <SmoothSectionScroll />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
