"use client";

import { useId } from "react";
import { ChartBar } from "@phosphor-icons/react/dist/ssr/ChartBar";
import { User } from "@phosphor-icons/react/dist/ssr/User";
import { DeviceMobile } from "@phosphor-icons/react/dist/ssr/DeviceMobile";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
import { Shield } from "@phosphor-icons/react/dist/ssr/Shield";
import { GoogleChromeLogo } from "@phosphor-icons/react/dist/ssr/GoogleChromeLogo";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import styles from "./ProductInterestCards.module.css";

interface ProductOption {
  id: string;
  name: string;
  subtitle: string;
  icon: typeof ChartBar;
}

const PRODUCT_OPTIONS: ProductOption[] = [
  {
    id: "lens",
    name: "Spotter Lens",
    subtitle: "Market data analytics and freight rankings",
    icon: ChartBar,
  },
  {
    id: "crm",
    name: "Spotter CRM",
    subtitle: "Recruiting engine with engagement visibility",
    icon: User,
  },
  {
    id: "driver-app",
    name: "Driver App",
    subtitle: "Load score optimization and matching",
    icon: DeviceMobile,
  },
  {
    id: "tms",
    name: "Spotter TMS + fuelseek",
    subtitle: "Visibility engine with data automation",
    icon: Truck,
  },
  {
    id: "sentinel",
    name: "Spotter Sentinel",
    subtitle: "Driver score and safety automation",
    icon: Shield,
  },
  {
    id: "extension",
    name: "Load Board Extension",
    subtitle: "Browser automation for Chrome & Firefox",
    icon: GoogleChromeLogo,
  },
];

interface ProductInterestCardsProps {
  selectedProducts: string[];
  onChange: (newSelection: string[]) => void;
}

export function ProductInterestCards({
  selectedProducts,
  onChange,
}: ProductInterestCardsProps) {
  const baseId = useId();

  function toggleProduct(productId: string) {
    onChange(
      selectedProducts.includes(productId)
        ? selectedProducts.filter((id) => id !== productId)
        : [...selectedProducts, productId],
    );
  }

  return (
    <div
      className={styles.productGrid}
      role="group"
      aria-labelledby="product-interest-label"
    >
      {PRODUCT_OPTIONS.map((product) => {
        const isChecked = selectedProducts.includes(product.id);
        const Icon = product.icon;
        const titleId = `${baseId}-${product.id}-title`;
        const descriptionId = `${baseId}-${product.id}-description`;
        return (
          <button
            key={product.id}
            type="button"
            role="checkbox"
            aria-checked={isChecked}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            onClick={() => toggleProduct(product.id)}
            className={`${styles.card} ${isChecked ? styles.cardSelected : ""}`}
            data-testid={`product-card-${product.id}`}
          >
            <span className={styles.iconContainer} aria-hidden="true">
              <Icon size={22} weight="duotone" />
            </span>
            <span className={styles.cardContent}>
              <span id={titleId} className={styles.productTitleText}>
                {product.name}
              </span>
              <span id={descriptionId} className={styles.cardSubtitle}>
                {product.subtitle}
              </span>
            </span>
            <span
              className={`${styles.checkbox} ${isChecked ? styles.checkboxChecked : ""}`}
              aria-hidden="true"
            >
              {isChecked && <Check size={14} weight="bold" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
