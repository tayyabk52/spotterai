import { createPricingCsv, readPricingOrder } from "@/lib/mvr-pricing";

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  return new Response(
    `\uFEFF${createPricingCsv(params.get("q") ?? "", readPricingOrder(params.get("sort") ?? undefined))}`,
    {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="spotter-mvr-pricing.csv"',
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
