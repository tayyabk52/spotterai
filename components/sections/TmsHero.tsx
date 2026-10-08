import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { tms } from "@/content/tms";
import Container from "../layout/Container";
import ActionLink from "../ActionLink";
import Reveal from "../Reveal";
import ProductPhoto from "./ProductPhoto";
import styles from "./Tms.module.css";

export default function TmsHero() {
  return (
    <section aria-labelledby="tms-title" className={styles.hero}>
      <Container>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <Reveal entrance>
              <p className={`eyebrow ${styles.darkEyebrow}`}>
                {tms.hero.eyebrow}
              </p>
              <h1 id="tms-title">{tms.hero.title}</h1>
            </Reveal>
            <Reveal entrance delay={0.08}>
              <p className={styles.heroDescription}>{tms.hero.description}</p>
            </Reveal>
            <Reveal entrance delay={0.16} className={styles.actions}>
              <ActionLink
                href={tms.action.href}
                className={styles.primary}
                arrow={<ArrowUpRightIcon aria-hidden="true" />}
              >
                {tms.action.label}
              </ActionLink>
              <a href={tms.hero.secondaryHref} className={styles.secondary}>
                {tms.hero.secondary}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </Reveal>
          </div>
          <Reveal entrance delay={0.08}>
            <ProductPhoto asset={tms.hero.image} hero />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
