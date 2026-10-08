import Image from "next/image";
import { home, partners, quoteLink } from "@/content/home";
import Container from "../layout/Container";
import ActionLink from "../ActionLink";
import Reveal from "../Reveal";
import ClosingMotif from "./ClosingMotif";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import styles from "./ClosingCTA.module.css";
export default function ClosingCTA() {
  return (
    <section className={styles.section} aria-labelledby="closing-title">
      <Container>
        <div className={styles.panel}>
          <div className={styles.header}>
            <div>
              <Reveal>
                <p className={`eyebrow ${styles.eyebrow}`}>
                  {home.closing.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 id="closing-title">
                  <span>
                    {home.closing.title.slice(
                      0,
                      home.closing.title.indexOf("your"),
                    )}
                  </span>
                  <span>
                    {home.closing.title.slice(
                      home.closing.title.indexOf("your"),
                    )}
                  </span>
                </h2>
              </Reveal>
            </div>
            <ClosingMotif />
          </div>
          <div className={styles.bottom}>
            <Reveal delay={0.1}>
              <p className={styles.description}>{home.closing.description}</p>
            </Reveal>
            <Reveal className={styles.action} delay={0.16}>
              <ActionLink
                href={quoteLink.href}
                className={styles.cta}
                arrow={<ArrowUpRightIcon size={24} />}
              >
                {quoteLink.label}
              </ActionLink>
            </Reveal>
          </div>
        </div>
        <div className={styles.partners}>
          <p>{home.closing.partnersTitle}</p>
          <ul>
            {partners.map((partner) => (
              <li key={partner.alt}>
                <Image
                  {...partner}
                  alt={partner.alt}
                  sizes="100px"
                  className={styles.logo}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
