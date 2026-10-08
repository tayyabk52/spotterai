import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { CareersHero } from "@/components/careers/CareersHero";
import { CareersCulture } from "@/components/careers/CareersCulture";
import { CareerFiltersForm } from "@/components/careers/CareerFiltersForm";
import { CareerJobs } from "@/components/careers/CareerJobs";
import { CareerMap } from "@/components/careers/CareerMap";
import {
  CAREERS_ORIGIN,
  careerHref,
  careerJobHref,
  readCareerFilters,
  readCareerArea,
  careerSearchParams,
  type CareerListing,
} from "@/content/careers";
import { getCareerListing } from "@/lib/careers/repository";
import styles from "@/components/careers/Careers.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore current roles at Spotter in engineering, freight operations, sales and more. Find opportunities by department, location and remote status.",
  alternates: { canonical: "/careers" },
  openGraph: {
    type: "website",
    title: "Careers at Spotter",
    description: "Build what moves freight. Explore open roles at Spotter.",
    url: "/careers",
    siteName: "Spotter.ai",
    images: [
      {
        url: "/images/hero/terminal-dawn.webp",
        width: 900,
        height: 600,
        alt: "Illustrative freight terminal at dawn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Spotter",
    description:
      "Explore current roles at Spotter in engineering, freight operations, sales and more.",
    images: ["/images/hero/terminal-dawn.webp"],
  },
};

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = readCareerFilters(params);
  const area = readCareerArea(params);
  const mapView = params.view === "map";
  let listing: CareerListing | null = null;
  try {
    listing = await getCareerListing(filters, area);
  } catch {
    /* Render a useful recovery path without showing stale or fabricated openings. */
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://spotter.ai/careers/#webpage",
    url: "https://spotter.ai/careers",
    name: "Careers at Spotter",
    description:
      "Explore current roles at Spotter in engineering, freight operations, sales and more. Find opportunities by department, location and remote status.",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://spotter.ai/#website",
      name: "Spotter.ai",
      url: "https://spotter.ai",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://spotter.ai/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Careers",
          item: "https://spotter.ai/careers",
        },
      ],
    },
  };

  const itemListSchema = listing?.jobs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Spotter Open Positions",
        numberOfItems: listing.jobs.length,
        itemListElement: listing.jobs.map((job, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://spotter.ai${careerJobHref(job.slug)}`,
          name: job.title,
        })),
      }
    : null;

  const schemas = [
    webPageSchema,
    ...(itemListSchema ? [itemListSchema] : []),
  ];

  return (
    <main id="main-content" className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas).replace(/</g, "\\u003c"),
        }}
      />
      <CareersHero />
      <section
        id="open-roles"
        className={styles.openRoles}
        aria-labelledby="roles-heading"
      >
        <Container>
          <div className={styles.sectionHeading}>
            <div>
              <p className="eyebrow">Find your next role</p>
              <h2 id="roles-heading">Open opportunities.</h2>
            </div>
            <p>
              Find a role that fits your skills,
              <br className={styles.desktopBreak} /> your location and your next
              step.
            </p>
          </div>
          {listing ? (
            <>
              <CareerFiltersForm
                filters={filters}
                listing={listing}
                mapView={mapView}
                area={area}
              />
              <div className={styles.resultsHeading}>
                <p>
                  <strong>{listing.jobs.length}</strong>{" "}
                  {listing.jobs.length === 1 ? "open role" : "open roles"}
                  {(Object.values(filters).some(Boolean) || area) &&
                    ` of ${listing.total}`}
                </p>
                <nav aria-label="Job view" className={styles.viewSwitch}>
                  <Link
                    href={careerHref(filters, false, area)}
                    aria-current={!mapView ? "page" : undefined}
                  >
                    List view
                  </Link>
                  <Link
                    href={careerHref(filters, true, area)}
                    aria-current={mapView ? "page" : undefined}
                  >
                    Map view
                  </Link>
                </nav>
              </div>
              <div className={mapView ? styles.mapLayout : undefined}>
                {mapView && (
                  <CareerMap
                    key={careerSearchParams(filters, area).toString()}
                    locations={listing.locations}
                    filters={filters}
                    area={area}
                  />
                )}
                <CareerJobs jobs={listing.jobs} />
              </div>
              {listing.hasNextPage && (
                <a
                  href={`${CAREERS_ORIGIN}/jobs?${careerSearchParams(filters, area)}`}
                  className={styles.moreJobs}
                >
                  See remaining openings on the careers site{" "}
                  <ArrowUpRightIcon aria-hidden="true" />
                </a>
              )}
              <p className={styles.sourceNote}>
                Openings from{" "}
                <a href={`${CAREERS_ORIGIN}/jobs`}>Spotter’s careers site</a>.
                Applications continue through Teamtailor.
              </p>
            </>
          ) : (
            <div className={styles.unavailable}>
              <h3>Openings are temporarily unavailable.</h3>
              <p>
                Please try again, or browse current roles on our careers site.
              </p>
              <div>
                <a
                  href={careerHref(filters, mapView, area)}
                  className={styles.primary}
                >
                  Try again
                </a>
                <a href={`${CAREERS_ORIGIN}/jobs`} className={styles.textLink}>
                  Visit careers site <ArrowUpRightIcon aria-hidden="true" />
                </a>
              </div>
            </div>
          )}
        </Container>
      </section>
      <CareersCulture />
    </main>
  );
}
