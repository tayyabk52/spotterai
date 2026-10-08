"use client";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";

import { useRef, useState } from "react";
import Link from "next/link";
import { useCareerMap } from "./useCareerMap";
import {
  careerHref,
  type CareerLocation,
  type CareerFilters,
  type CareerArea,
} from "@/content/careers";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import styles from "./CareerMap.module.css";

interface CareerMapProps {
  locations: CareerLocation[];
  filters: CareerFilters;
  area?: CareerArea;
}

export function CareerMap({ locations, filters, area }: CareerMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);
  const [locating, setLocating] = useState(false);
  const [retry, setRetry] = useState(0);
  const [locationMessage, setLocationMessage] = useState("");

  const { mapRef, status, visibleArea } = useCareerMap(
    container,
    locations,
    filters,
    retry,
    area,
  );

  function toggleInteraction() {
    const next = !interactive;
    setInteractive(next);
    if (next) {
      mapRef.current?.dragging.enable();
      mapRef.current?.touchZoom.enable();
    } else {
      mapRef.current?.dragging.disable();
      mapRef.current?.touchZoom.disable();
    }
  }

  function resetView() {
    mapRef.current?.fitBounds(
      locations.map(
        (location) =>
          [location.latitude, location.longitude] as [number, number],
      ),
      {
        paddingTopLeft: [32, 32],
        paddingBottomRight: [40, 64],
        maxZoom: 8,
        animate: false,
      },
    );
  }

  function locateUser() {
    if (!navigator.geolocation) {
      setLocationMessage("Location access is unavailable in this browser.");
      return;
    }
    setLocating(true);
    setLocationMessage("Finding your location…");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        setLocationMessage(
          "Map centered on your approximate location. Job locations remain marked.",
        );
        mapRef.current?.setView(
          [position.coords.latitude, position.coords.longitude],
          6,
          { animate: false },
        );
      },
      () => {
        setLocating(false);
        setLocationMessage(
          "Your location is unavailable. Choose a job location below instead.",
        );
      },
      { timeout: 10000, maximumAge: 60000 },
    );
  }

  if (!locations.length)
    return (
      <div className={styles.noLocations}>
        <p>No map locations match these filters.</p>
      </div>
    );

  return (
    <section className={styles.panel} aria-label="Explore roles by location">
      <div className={styles.mapWrapper}>
        <div className={styles.mapToolbar}>
          <h3>Job locations</h3>
          <div
            className={styles.zoomControls}
            role="group"
            aria-label="Map controls"
          >
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => mapRef.current?.zoomIn()}
            >
              +
            </button>
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => mapRef.current?.zoomOut()}
            >
              −
            </button>
            <button
              type="button"
              aria-label="Show all job locations"
              onClick={resetView}
            >
              ↺
            </button>
          </div>
        </div>
        <div ref={container} className={styles.map} />
        <div className={styles.mapFooter}>
          <button
            type="button"
            className={styles.interaction}
            onClick={toggleInteraction}
            aria-pressed={interactive}
          >
            {interactive ? "Lock map scrolling" : "Enable map interaction"}
          </button>
        </div>
      </div>
      {(visibleArea || area) && (
        <div className={styles.areaActions}>
          {visibleArea && (
            <Link href={careerHref(filters, true, visibleArea)}>
              Search this area
            </Link>
          )}
          {area && <Link href={careerHref(filters, true)}>Clear map area</Link>}
        </div>
      )}
      {status && (
        <div className={styles.mapStatus}>
          <p role="status">{status}</p>
          {status.includes("could not") && (
            <button
              type="button"
              onClick={() => {
                setInteractive(false);
                setRetry((value) => value + 1);
              }}
            >
              Retry map
            </button>
          )}
        </div>
      )}
      <noscript>
        <style>{`.${styles.mapWrapper}, div.${styles.mapStatus}, .${styles.locationHeading} button { display: none; }`}</style>
        <p className={styles.mapStatus}>
          Enable JavaScript to use the map, or browse the locations below.
        </p>
      </noscript>
      <div className={styles.locationHeading}>
        <h3>Browse by location</h3>
        <button type="button" onClick={locateUser} disabled={locating}>
          Use my location
        </button>
      </div>
      {locationMessage && (
        <p className={styles.locationMessage} role="status">
          {locationMessage}
        </p>
      )}
      <p className={styles.caption}>
        Markers include remote eligibility regions. A role can appear in more
        than one location.
      </p>
      <ul className={styles.locations}>
        {locations.map((location) => (
          <li key={location.id}>
            <Link
              href={careerHref({ ...filters, location: location.name }, true)}
            >
              <span>{location.name}</span>
              <span>
                {location.count} {location.count === 1 ? "role" : "roles"}{" "}
                <ArrowUpRightIcon aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
