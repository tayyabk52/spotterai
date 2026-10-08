"use client";

import { useSearchParams } from "next/navigation";
import { QuoteForm } from "@/components/quote/QuoteForm";

/**
 * Client Component that extracts product query parameter and passes it to QuoteForm.
 * Enables pre-selection when linking from product pages (e.g. /request-quote?product=sentinel).
 */
export function QuoteFormWrapper() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product");

  return <QuoteForm initialProduct={initialProduct} />;
}
