import type { Product } from "@/content/home";
import ActionLink from "./ActionLink";
import Reveal from "./Reveal";
import styles from "./ProductFeatureCopy.module.css";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";

export default function ProductFeatureCopy({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const emphasis = {
    lens: "before",
    crm: "progress",
    "driver-app": "a better fit",
    tms: "together",
    sentinel: "everyday workflow",
    extension: "on the search",
  }[product.id];
  const emphasisStart = product.title.indexOf(emphasis);
  return (
    <div className={styles.copy}>
      <Reveal>
        <p className={styles.index}>
          <span className={styles.number}>
            {String(index).padStart(2, "0")}
          </span>
          <span className={styles.category}>/ {product.category}</span>
        </p>
        <h3 id={`${product.id}-title`}>{product.name}</h3>
      </Reveal>
      <Reveal delay={0.06}>
        <p className={styles.tagline}>
          {emphasisStart >= 0 ? (
            <>
              {product.title.slice(0, emphasisStart)}
              <span>{product.title.slice(emphasisStart)}</span>
            </>
          ) : (
            product.title
          )}
        </p>
      </Reveal>
      <Reveal delay={0.11}>
        <p className={styles.description}>{product.description}</p>
      </Reveal>
      <Reveal delay={0.16}>
        <ActionLink
          href={product.href}
          secondary
          className={styles.action}
          arrow={
            <ArrowUpRightIcon
              size={20}
              weight="regular"
              aria-hidden="true"
              focusable="false"
            />
          }
        >
          {product.id === "crm"
            ? `Ask about ${product.name}`
            : product.id === "extension"
              ? "Explore the extension"
              : `Explore ${product.name}`}
        </ActionLink>
      </Reveal>
    </div>
  );
}
