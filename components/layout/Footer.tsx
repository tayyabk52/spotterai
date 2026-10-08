import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Image from "next/image";
import Link from "next/link";
import { downloads, footerGroups, home, social } from "@/content/home";
import Container from "./Container";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Spotter.ai home">
              <Image
                src="/brand/spotter-logo.png"
                width={640}
                height={158}
                alt="Spotter.ai"
                sizes="200px"
                className={styles.logo}
              />
            </Link>
            <p>{home.footerDescription}</p>
            <div className={styles.downloads}>
              {downloads.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                  <ArrowUpRightIcon size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          {footerGroups.map((group) => (
            <nav key={group.label} aria-label={`${group.label} footer links`}>
              <h2 className={styles.heading}>{group.label}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={styles.bottom}>
          <div>
            <p>© {new Date().getFullYear()} spotter.ai. All rights reserved.</p>
            <p>251 Little Falls Dr., Wilmington, DE 19808</p>
          </div>
          <div className={styles.social}>
            {social.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
