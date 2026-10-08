import {
  MVR_PRICES,
  NATIONWIDE_SERVICES,
  PRICING_CAPTURE_DATE,
} from "@/content/mvr-pricing";

export type PricingOrder =
  "state-asc" | "state-desc" | "price-asc" | "price-desc";

export function readPricingOrder(value: string | undefined): PricingOrder {
  return value === "state-desc" ||
    value === "price-asc" ||
    value === "price-desc"
    ? value
    : "state-asc";
}

export function selectStatePrices(query: string, order: PricingOrder) {
  const search = query.trim().toLowerCase();
  const rows = MVR_PRICES.filter(
    (row) =>
      row.state.toLowerCase().includes(search) ||
      row.code.toLowerCase().includes(search),
  );
  return rows.sort((a, b) => {
    const comparison = order.startsWith("price")
      ? a.price - b.price
      : a.state.localeCompare(b.state);
    return (
      (order.endsWith("desc") ? -comparison : comparison) ||
      a.state.localeCompare(b.state)
    );
  });
}

export function pricingQuery(query: string, order: PricingOrder) {
  const params = new URLSearchParams({ sort: order });
  if (query) params.set("q", query);
  return params.toString();
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function createPricingCsv(query: string, order: PricingOrder) {
  return [
    ["State", "Code", "MVR Price (USD)", "Source capture date"],
    ...selectStatePrices(query, order).map((row) => [
      row.state,
      row.code,
      row.price.toFixed(2),
      PRICING_CAPTURE_DATE,
    ]),
    [],
    ["Nationwide service", "Price (USD)"],
    ...NATIONWIDE_SERVICES.map((service) => [
      service.name,
      service.price.toFixed(2),
    ]),
  ]
    .map((row) =>
      row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
    )
    .join("\r\n");
}
