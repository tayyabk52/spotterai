import type { Product } from "@/content/home";
import Reveal from "./Reveal";
import CapabilityIllustration from "./CapabilityIllustration";
import type { CapabilityVariant } from "./CapabilityIllustration";
import { ChartLineUpIcon } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { CurrencyCircleDollarIcon } from "@phosphor-icons/react/dist/ssr/CurrencyCircleDollar";
import { CompassIcon } from "@phosphor-icons/react/dist/ssr/Compass";
import { UsersThreeIcon } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr/ChatsCircle";
import { EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { StackIcon } from "@phosphor-icons/react/dist/ssr/Stack";
import { SlidersHorizontalIcon } from "@phosphor-icons/react/dist/ssr/SlidersHorizontal";
import { PathIcon } from "@phosphor-icons/react/dist/ssr/Path";
import { DatabaseIcon } from "@phosphor-icons/react/dist/ssr/Database";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { TruckIcon } from "@phosphor-icons/react/dist/ssr/Truck";
import { IdentificationCardIcon } from "@phosphor-icons/react/dist/ssr/IdentificationCard";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { ListChecksIcon } from "@phosphor-icons/react/dist/ssr/ListChecks";
import { BrowserIcon } from "@phosphor-icons/react/dist/ssr/Browser";
import { FunnelIcon } from "@phosphor-icons/react/dist/ssr/Funnel";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import styles from "./CapabilityOverview.module.css";

export default function CapabilityOverview({
  product,
  variant,
}: {
  product: Product;
  variant: CapabilityVariant;
}) {
  const icons = {
    lens: [ChartLineUpIcon, CurrencyCircleDollarIcon, CompassIcon],
    crm: [UsersThreeIcon, ChatsCircleIcon, EyeIcon],
    "driver-app": [StackIcon, SlidersHorizontalIcon, PathIcon],
    tms: [DatabaseIcon, ArrowsClockwiseIcon, TruckIcon],
    sentinel: [IdentificationCardIcon, ShieldCheckIcon, ListChecksIcon],
    extension: [BrowserIcon, FunnelIcon, MagnifyingGlassIcon],
  }[variant];
  return (
    <figure
      className={`${styles.overview} ${variant === "crm" || variant === "tms" || variant === "extension" ? styles.recruiting : ""} ${variant === "sentinel" ? styles.safety : ""}`}
    >
      <figcaption className={styles.caption}>
        <span>{product.category}</span>
        <span className={styles.note}>
          {variant === "lens" ? "Capability overview" : "How it connects"}
        </span>
      </figcaption>
      <CapabilityIllustration variant={variant} />
      <ol className={styles.steps}>
        {product.steps.map((step, index) => {
          const Icon = icons[index];
          return (
            <li key={step}>
              <Reveal className={styles.step} delay={index * 0.08}>
                <span className={styles.number} aria-hidden="true">
                  0{index + 1}
                </span>
                <span className={styles.stepLabel}>{step}</span>
                <Icon
                  size={24}
                  weight="duotone"
                  className={styles.icon}
                  aria-hidden="true"
                  focusable="false"
                />
              </Reveal>
            </li>
          );
        })}
      </ol>
      <div className={styles.footer}>
        <span className={styles.signature} aria-hidden="true">
          <span className={styles.mark}>
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>{product.name}</span>
        </span>
        {variant !== "lens" && (
          <span className={styles.note}>Capability overview</span>
        )}
      </div>
    </figure>
  );
}
