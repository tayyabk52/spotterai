import styles from "./ActionLink.module.css";

export default function ActionLink({
  href,
  children,
  secondary = false,
  capsule = false,
  className = "",
  arrow,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  capsule?: boolean;
  className?: string;
  arrow?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`${styles.link} ${secondary ? styles.secondary : ""} ${
        capsule ? styles.capsule : ""
      } ${className}`.trim()}
    >
      <span>{children}</span>
      <span aria-hidden="true" className={styles.arrow}>
        {arrow ?? "↗"}
      </span>
    </a>
  );
}
