"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { Map as LeafletMap } from "leaflet";
import type {
  CareerLocation,
  CareerFilters,
  CareerArea,
} from "@/content/careers";
import { addCareerMarkers } from "./map-markers";

export function useCareerMap(
  container: RefObject<HTMLDivElement | null>,
  locations: CareerLocation[],
  filters: CareerFilters,
  retry: number,
  area?: CareerArea,
) {
  const mapRef = useRef<LeafletMap | null>(null);
  const [status, setStatus] = useState("Loading map…");
  const [visibleArea, setVisibleArea] = useState<CareerArea>();
  useEffect(() => {
    if (!container.current || !locations.length) return;
    let disposed = false;
    let resizeObserver: ResizeObserver | undefined;
    let map: LeafletMap | undefined;
    async function initialize() {
      try {
        const L = (await import("leaflet")).default;
        await import("leaflet.markercluster");
        if (disposed || !container.current) return;
        setVisibleArea(undefined);
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        map = L.map(container.current, {
          zoomControl: false,
          scrollWheelZoom: false,
          dragging: false,
          touchZoom: false,
          doubleClickZoom: false,
          zoomAnimation: !reduceMotion,
          fadeAnimation: !reduceMotion,
          markerZoomAnimation: !reduceMotion,
          minZoom: 1,
          maxZoom: 16,
          maxBounds: [
            [-85, -180],
            [85, 180],
          ],
          maxBoundsViscosity: 1,
        });
        mapRef.current = map;
        map.getContainer().setAttribute("role", "region");
        map
          .getContainer()
          .setAttribute(
            "aria-label",
            "Job locations map. Use arrow keys to pan and plus or minus to zoom.",
          );
        const tiles = L.tileLayer(
          "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            noWrap: true,
            bounds: [
              [-85, -180],
              [85, 180],
            ],
          },
        );
        let tileFailed = false;
        tiles.on("load", () => {
          if (!disposed && !tileFailed) setStatus("");
        });
        tiles.on("tileerror", () => {
          tileFailed = true;
          if (!disposed)
            setStatus(
              "Some map tiles could not load. You can still browse roles by location below.",
            );
        });
        tiles.addTo(map);
        map.fitBounds(
          area
            ? [
                [area.south, area.west],
                [area.north, area.east],
              ]
            : locations.map(
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
        addCareerMarkers(L, map, locations, filters, reduceMotion);
        map.on("moveend", () => {
          if (!map || disposed) return;
          const bounds = map.getBounds();
          setVisibleArea({
            north: Math.min(90, bounds.getNorth()),
            west: Math.max(-180, bounds.getWest()),
            south: Math.max(-90, bounds.getSouth()),
            east: Math.min(180, bounds.getEast()),
          });
        });
        resizeObserver = new ResizeObserver(() =>
          map?.invalidateSize({ animate: false }),
        );
        resizeObserver.observe(container.current);
      } catch (error) {
        console.error("Unable to initialize careers map", error);
        if (!disposed)
          setStatus(
            "The map could not load. You can still browse roles by location below.",
          );
      }
    }
    void initialize();
    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      map?.remove();
      mapRef.current = null;
    };
  }, [container, locations, filters, retry, area]);
  return { mapRef, status, visibleArea };
}
