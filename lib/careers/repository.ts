import "server-only";
import { cache } from "react";
import {
  CAREERS_ORIGIN,
  careerSearchParams,
  type CareerFilters,
  type CareerArea,
} from "@/content/careers";
import { parseCareerListing, parseCareerJobDetail } from "./parser";

async function fetchCareerSource(path: string) {
  const response = await fetch(`${CAREERS_ORIGIN}${path}`, {
    headers: {
      Accept: "text/html, application/json",
      ...(path.startsWith("/jobs?") ? { "Turbo-Frame": "jobs_list" } : {}),
    },
    next: { revalidate: 300, tags: ["careers"] },
    signal: AbortSignal.timeout(15000),
  });
  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error(`Careers source returned ${response.status}`);
  return response;
}

export const getCareerListing = cache(async function getCareerListing(
  filters: CareerFilters,
  area?: CareerArea,
) {
  const params = careerSearchParams(filters, area);
  params.set("split_view", "true");
  const [jobsResponse, facetsResponse] = await Promise.all([
    fetchCareerSource(`/jobs?${params}`),
    fetchCareerSource("/jobs/faceted_search_data"),
  ]);
  if (!jobsResponse || !facetsResponse)
    throw new Error("Careers listings are unavailable");
  return parseCareerListing(
    await jobsResponse.text(),
    await facetsResponse.json(),
  );
});

export const getCareerJob = cache(async function getCareerJob(slug: string) {
  if (!/^\d+-[a-z0-9-]+$/.test(slug)) return null;
  const response = await fetchCareerSource(`/jobs/${slug}`);
  return response ? parseCareerJobDetail(await response.text()) : null;
});
