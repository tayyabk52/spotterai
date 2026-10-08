export const CAREERS_ORIGIN = "https://careers.spotter.ai";

export interface CareerFilters {
  query: string;
  department: string;
  location: string;
  remote_status_id: string;
}

export interface CareerJob {
  slug: string;
  title: string;
  metadata: string;
}

export interface CareerArea {
  north: number;
  west: number;
  south: number;
  east: number;
}

export const CAREER_AREA_FIELDS = [
  ["north", "geobound_coordinates[top_left_lat]"],
  ["west", "geobound_coordinates[top_left_lon]"],
  ["south", "geobound_coordinates[bottom_right_lat]"],
  ["east", "geobound_coordinates[bottom_right_lon]"],
] as const;

export interface CareerLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  count: number;
}

export interface CareerListing {
  jobs: CareerJob[];
  locations: CareerLocation[];
  departments: string[];
  locationOptions: string[];
  total: number;
  hasNextPage: boolean;
}

export const REMOTE_OPTIONS = [
  { value: "none", label: "No Remote Work" },
  { value: "temporary", label: "Temporarily Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "fully", label: "Fully Remote" },
  { value: "onsite", label: "Onsite" },
];

export const EMPTY_CAREER_FILTERS: CareerFilters = {
  query: "",
  department: "",
  location: "",
  remote_status_id: "",
};

export function readCareerFilters(
  params: Record<string, string | string[] | undefined>,
): CareerFilters {
  return Object.fromEntries(
    Object.keys(EMPTY_CAREER_FILTERS).map((key) => [
      key,
      typeof params[key] === "string" ? params[key].slice(0, 200) : "",
    ]),
  ) as unknown as CareerFilters;
}

export function readCareerArea(
  params: Record<string, string | string[] | undefined>,
): CareerArea | undefined {
  const values = CAREER_AREA_FIELDS.map(([, field]) => {
    const value = params[field];
    return typeof value === "string" && value.trim() ? Number(value) : NaN;
  });
  const [north, west, south, east] = values;
  if (
    values.some((value) => !Number.isFinite(value)) ||
    Math.abs(north) > 90 ||
    Math.abs(south) > 90 ||
    Math.abs(west) > 180 ||
    Math.abs(east) > 180 ||
    north <= south ||
    east <= west
  )
    return undefined;
  return { north, west, south, east };
}

export function careerSearchParams(filters: CareerFilters, area?: CareerArea) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters))
    if (value) params.set(key, value);
  if (area)
    for (const [key, field] of CAREER_AREA_FIELDS)
      params.set(field, String(area[key]));
  return params;
}

export function careerHref(
  filters: CareerFilters,
  mapView = false,
  area?: CareerArea,
) {
  const params = careerSearchParams(filters, area);
  if (mapView) params.set("view", "map");
  return `/careers${params.size ? `?${params}` : ""}#open-roles`;
}

export function careerJobHref(slug: string) {
  return `/careers/jobs/${slug}`;
}
