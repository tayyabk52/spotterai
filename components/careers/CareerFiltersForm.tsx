import Link from "next/link";
import {
  careerHref,
  careerSearchParams,
  type CareerFilters,
  type CareerListing,
  REMOTE_OPTIONS,
  EMPTY_CAREER_FILTERS,
  CAREER_AREA_FIELDS,
  type CareerArea,
} from "@/content/careers";
import styles from "./Careers.module.css";

interface CareerFiltersProps {
  filters: CareerFilters;
  listing: CareerListing;
  mapView: boolean;
  area?: CareerArea;
}

export function CareerFiltersForm({
  filters,
  listing,
  mapView,
  area,
}: CareerFiltersProps) {
  const active = Object.values(filters).some(Boolean) || Boolean(area);
  return (
    <div className={styles.filterArea}>
      <form
        key={careerSearchParams(filters, area).toString()}
        action="/careers#open-roles"
        method="get"
        className={styles.filters}
        role="search"
        aria-label="Search open roles"
      >
        {mapView && <input type="hidden" name="view" value="map" />}
        {area &&
          CAREER_AREA_FIELDS.map(([key, field]) => (
            <input key={key} type="hidden" name={field} value={area[key]} />
          ))}
        <div className={styles.searchField}>
          <label htmlFor="career-query">Search roles</label>
          <input
            id="career-query"
            name="query"
            type="search"
            placeholder="Title, skill or keyword"
            defaultValue={filters.query}
          />
        </div>
        <div>
          <label htmlFor="career-department">Department</label>
          <select
            id="career-department"
            name="department"
            defaultValue={filters.department}
          >
            <option value="">All departments</option>
            {listing.departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="career-location">Location</label>
          <select
            id="career-location"
            name="location"
            defaultValue={filters.location}
          >
            <option value="">All locations</option>
            {listing.locationOptions.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="career-remote">Remote status</label>
          <select
            id="career-remote"
            name="remote_status_id"
            defaultValue={filters.remote_status_id}
          >
            <option value="">All work styles</option>
            {REMOTE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {active && (
        <div className={styles.activeFilters}>
          <p>
            {area
              ? "Showing roles in the selected map area"
              : "Showing filtered roles"}
          </p>
          <Link href={careerHref(EMPTY_CAREER_FILTERS, mapView)}>
            Clear filters <span aria-hidden="true">×</span>
          </Link>
        </div>
      )}
    </div>
  );
}
