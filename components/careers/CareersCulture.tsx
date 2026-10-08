import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Container from "@/components/layout/Container";
import { CAREERS_ORIGIN } from "@/content/careers";
import styles from "./Careers.module.css";

const CULTURE_ROWS = [
  {
    title: "Who we are",
    description:
      "Spotter.Ai is more than a company; it's a dynamic hub of innovation, driven by a passionate team of trucking industry experts, engineers, and visionaries.",
  },
  {
    title: "Team",
    description:
      "Our team is a melting pot of talent from across the globe, bringing together diverse perspectives and expertise. We thrive in a high-energy environment where creativity and collaboration drive our success.",
  },
  {
    title: "Join us",
    description:
      "If you’re excited about working in a high-energy, innovative environment and making a significant impact in the trucking industry, Spotter is the place for you. We’re always looking for talented individuals who are ready to contribute to our mission and grow with us.",
  },
];

export function CareersCulture() {
  return (
    <section className={styles.culture} aria-labelledby="culture-heading">
      <Container>
        <div className={styles.cultureHeading}>
          <p className="eyebrow">About us</p>
          <h2 id="culture-heading">
            Different perspectives.
            <br />
            One connected team.
          </h2>
        </div>
        <div className={styles.cultureRows}>
          {CULTURE_ROWS.map((row) => (
            <div key={row.title}>
              <h3>{row.title}</h3>
              <p>{row.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.cultureClosing}>
          <p>Stay connected with Spotter.</p>
          <a href={`${CAREERS_ORIGIN}/connect`} className={styles.primary}>
            Join our talent network <ArrowUpRightIcon aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
