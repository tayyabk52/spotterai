import { home } from "@/content/home";
import Container from "../layout/Container";
import styles from "./CustomerSummary.module.css";
export default function CustomerSummary() {
  return (
    <section aria-labelledby="customer-title" className={styles.section}>
      <Container className={styles.grid}>
        <div>
          <p className="eyebrow">{home.customer.eyebrow}</p>
          <h2 id="customer-title">{home.customer.title}</h2>
        </div>
        <div>
          <p className={styles.summary}>{home.customer.summary}</p>
          <div className={styles.person}>
            <span aria-hidden="true" className={styles.avatar}>
              MS
            </span>
            <div>
              <p>{home.customer.name}</p>
              <p className={styles.role}>{home.customer.role}</p>
            </div>
          </div>
          <p className={styles.note}>{home.customer.note}</p>
        </div>
      </Container>
    </section>
  );
}
