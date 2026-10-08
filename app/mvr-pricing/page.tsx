import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { PricingDirectory } from "@/components/pricing/PricingDirectory";
import { NATIONWIDE_SERVICES, PRICING_SOURCE } from "@/content/mvr-pricing";
import { formatPrice, readPricingOrder } from "@/lib/mvr-pricing";
import styles from "@/components/pricing/MvrPricing.module.css";

export const metadata: Metadata = {
  title: "Driver Record (MVR) Pricing by State",
  description:
    "MVR prices for all 50 states and DC with Sentinel, plus fixed nationwide pricing for PSP, CDLIS, driver reviews and drug testing.",
  alternates: { canonical: "/mvr-pricing" },
};

export default async function MvrPricingPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const params = await searchParams;
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={styles.hero}>
        <Container>
          <div className={styles.heroLayout}>
            <div>
              <p className={styles.eyebrow}>Sentinel · Screening costs</p>
              <h1>Driver Record Pricing by State</h1>
              <p>
                MVR pricing varies by state. PSP, CDLIS, Driver Review, and Drug
                Testing pricing are fixed nationwide.
              </p>
            </div>
            <Link href="/sentinel" className={styles.heroLink}>
              Explore Sentinel<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Container>
      </header>
      <Container>
        <section
          className={styles.nationwide}
          aria-labelledby="nationwide-pricing-title"
        >
          <div className={styles.nationwideHeading}>
            <h2 id="nationwide-pricing-title">Nationwide services</h2>
            <p>Fixed pricing for all states</p>
          </div>
          <dl className={styles.services}>
            {NATIONWIDE_SERVICES.map((service) => (
              <div key={service.name}>
                <dt>{service.name}</dt>
                <dd>{formatPrice(service.price)}</dd>
              </div>
            ))}
          </dl>
        </section>
        <PricingDirectory
          key={`${params.q ?? ""}-${params.sort ?? ""}`}
          initialQuery={typeof params.q === "string" ? params.q : ""}
          initialOrder={readPricingOrder(
            typeof params.sort === "string" ? params.sort : undefined,
          )}
        />
        <div className={styles.source}>
          <p>Published prices captured October 8, 2026. All amounts in USD.</p>
          <a href={PRICING_SOURCE}>View source pricing ↗</a>
        </div>
        <address className={styles.contact}>
          <strong>Spotter Sentinel LLC</strong>
          <a href="mailto:Info@spottersentinel.com">Info@spottersentinel.com</a>
          <a href="tel:+12247880134">+1 (224) 788-0134</a>
        </address>
      </Container>
    </main>
  );
}
