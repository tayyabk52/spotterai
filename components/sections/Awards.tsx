import Image from "next/image";
import { awards, home } from "@/content/home";
import Container from "../layout/Container";
import styles from "./Awards.module.css";
export default function Awards() {
  return (
    <section className={styles.section} aria-labelledby="awards-title">
      <Container>
        <h2 id="awards-title" className={styles.title}>
          {home.awardsTitle}
        </h2>
        <ul className={styles.awards}>
          {awards.map((award) => (
            <li key={award.src}>
              <Image
                {...award}
                alt={award.alt}
                sizes="(max-width: 767px) 76px, 100px"
                className={styles.image}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
