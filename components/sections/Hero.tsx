import { home, products, quoteLink } from "@/content/home";
import Container from "../layout/Container";
import ActionLink from "../ActionLink";
import HeroPhotography from "../HeroPhotography";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import styles from "./Hero.module.css";
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div className={styles.orbit} aria-hidden="true" />
        <HeroPhotography />
        <Container className={styles.content}>
          <p className={`eyebrow ${styles.eyebrow}`}>{home.hero.eyebrow}</p>
          <h1 id="hero-title" aria-label={home.hero.title}>
            <span className={styles.line}>{home.hero.lines[0]}</span>{" "}
            <span className={`${styles.line} ${styles.highlight}`}>
              {home.hero.lines[1]}
            </span>
          </h1>
          <p className={styles.description}>{home.hero.description}</p>
          <div className={styles.actions}>
            <ActionLink
              href={quoteLink.href}
              className={styles.primary}
              arrow={<ArrowUpRightIcon size={20} />}
            >
              {quoteLink.label}
            </ActionLink>
            <a className={styles.secondary} href="#capabilities">
              <span>{home.hero.secondary}</span>
              <span className={styles.secondaryArrow} aria-hidden="true">
                <ArrowDownIcon size={20} />
              </span>
            </a>
          </div>
        </Container>
      </div>
      <Container>
        <nav className={styles.suite} aria-label="Explore the Spotter suite">
          <div className={styles.suiteIntro}>
            <div className={styles.suiteHeading}>
              <span className={styles.suiteMark} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className={styles.suiteLabel}>One connected suite</span>
            </div>
            <span className={styles.suiteCaption}>
              Built around your fleet.
            </span>
          </div>
          <ul>
            {products.map((product, index) => (
              <li key={product.id}>
                <a href={product.href}>
                  <span className={styles.number}>0{index + 1}</span>
                  <span className={styles.productName}>{product.name}</span>
                  <span className={styles.productCategory}>
                    {product.category}
                  </span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
