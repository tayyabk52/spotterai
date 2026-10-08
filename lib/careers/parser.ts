import { load } from "cheerio";
import sanitizeHtml from "sanitize-html";
import {
  CAREERS_ORIGIN,
  type CareerListing,
  type CareerLocation,
} from "@/content/careers";

// IDs and names cross-checked against Teamtailor's coordinates and faceted location counts.
const LOCATION_NAMES: Record<number, string> = {
  11707: "Lemont",
  49438: "Pakistan",
  49439: "India",
  49440: "Colombia",
  49441: "Mexico",
  49442: "Argentina",
};

export function parseCareerListing(
  html: string,
  facets: unknown,
): CareerListing {
  const $ = load(html);
  const block = $('[data-controller="blocks--jobs"]').first();
  const container = $("#jobs_list_container");
  if (
    !block.length ||
    (!container.length && !block.text().includes("No matching jobs"))
  )
    throw new Error("Careers job listing is unavailable");
  const counts = (
    facets as {
      faceted_search_counts?: {
        department?: Record<string, number>;
        location?: Record<string, number>;
      };
    }
  )?.faceted_search_counts;
  const jobs = container
    .find('a[href*="/jobs/"]')
    .map((_, element) => {
      const link = $(element);
      const url = new URL(link.attr("href") || "", CAREERS_ORIGIN);
      const slug = url.pathname.split("/")[2];
      if (url.origin !== CAREERS_ORIGIN || !/^\d+-[a-z0-9-]+$/.test(slug || ""))
        throw new Error("Invalid career job link");
      return {
        slug,
        title: link.text().trim(),
        metadata: link
          .closest("li")
          .find("div.text-md")
          .first()
          .text()
          .replace(/\s+/g, " ")
          .trim(),
      };
    })
    .get();
  const rawLocations: unknown = JSON.parse(
    block.attr("data-blocks--jobs-locations-value") || "[]",
  );
  if (!Array.isArray(rawLocations))
    throw new Error("Invalid careers locations");
  const locations: CareerLocation[] = rawLocations.map((location) => {
    if (!location || typeof location !== "object")
      throw new Error("Invalid careers location");
    const record = location as Record<string, unknown>;
    const id = Number(record.id);
    const latitude = Number(record.lat);
    const longitude = Number(record.long);
    const count = Number(record.count);
    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      Math.abs(latitude) > 90 ||
      Math.abs(longitude) > 180 ||
      !Number.isInteger(count) ||
      count < 0
    )
      throw new Error("Invalid careers coordinates");
    return {
      id,
      name: LOCATION_NAMES[id] || `Location ${id}`,
      latitude,
      longitude,
      count,
    };
  });
  const departments = counts?.department
    ? Object.keys(counts.department)
        .filter((name) => name !== "All")
        .sort()
    : [];
  const locationOptions = counts?.location
    ? Object.keys(counts.location)
        .filter((name) => name !== "All")
        .sort()
    : locations.map((location) => location.name);
  return {
    jobs,
    locations,
    departments,
    locationOptions,
    total: Number(counts?.department?.All) || jobs.length,
    hasNextPage: $('a[rel="next"]').length > 0,
  };
}

interface CareerJobDetail {
  title: string;
  introduction: string;
  metadata: string;
  description: string;
  applicationUrl: string;
  schema: Record<string, unknown>;
}

function parseSourceSchema(value: string): Record<string, unknown> {
  // Teamtailor emits literal line breaks inside some JSON-LD description strings.
  let quoted = false;
  let escaped = false;
  let normalized = "";
  for (const character of value) {
    if (escaped) {
      normalized += character;
      escaped = false;
      continue;
    }
    if (quoted && character === "\\") escaped = true;
    if (character === '"') quoted = !quoted;
    normalized +=
      quoted && character.charCodeAt(0) < 32
        ? JSON.stringify(character).slice(1, -1)
        : character;
  }
  return JSON.parse(normalized) as Record<string, unknown>;
}

export function parseCareerJobDetail(html: string): CareerJobDetail {
  const $ = load(html);
  const rawSchema = $('script[type="application/ld+json"]')
    .map((_, element) => $(element).text())
    .get()
    .map(parseSourceSchema)
    .find((schema) => schema["@type"] === "JobPosting");
  const main = $(
    "main[data-careersite--jobs--form-overlay-job-application-url-value]",
  );
  if (!rawSchema || !main.length || typeof rawSchema.title !== "string")
    throw new Error("Careers job details are unavailable");
  const applicationUrl = new URL(
    main.attr(
      "data-careersite--jobs--form-overlay-job-application-url-value",
    ) || "",
    CAREERS_ORIGIN,
  );
  if (
    applicationUrl.origin !== CAREERS_ORIGIN ||
    !/^\/jobs\/\d+-[a-z0-9-]+\/applications\/new$/.test(applicationUrl.pathname)
  )
    throw new Error("Invalid careers application URL");
  const content = $('[data-controller="careersite--responsive-video"]').first();
  if (!content.length)
    throw new Error("Careers job description is unavailable");
  const description = sanitizeHtml(content.html() || "", {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "strong",
      "b",
      "em",
      "i",
      "a",
      "br",
    ],
    allowedAttributes: { a: ["href", "rel"] },
    allowedSchemes: ["https", "http", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      h1: "h2",
      h3: "h2",
      h4: "h2",
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
  const heading = main.find("h1").first();
  return {
    title: rawSchema.title,
    introduction: heading.next("h2").text().trim(),
    metadata: heading.prev().text().replace(/\s+/g, " ").trim(),
    description,
    applicationUrl: applicationUrl.href,
    schema: { ...rawSchema, description },
  };
}
