import type * as Leaflet from "leaflet";
import {
  careerHref,
  type CareerLocation,
  type CareerFilters,
} from "@/content/careers";
import styles from "./CareerMap.module.css";

export function addCareerMarkers(
  L: typeof Leaflet,
  map: Leaflet.Map,
  locations: CareerLocation[],
  filters: CareerFilters,
  reduceMotion: boolean,
) {
  const markers = L.markerClusterGroup({
    maxClusterRadius: 56,
    showCoverageOnHover: false,
    animate: !reduceMotion,
    iconCreateFunction: (cluster) =>
      L.divIcon({
        className: styles.cluster,
        html: `<span>${cluster.getChildCount()}<small>places</small></span>`,
        iconSize: [52, 52],
        iconAnchor: [26, 26],
      }),
  });
  for (const location of locations) {
    const icon = L.divIcon({
      className: styles.marker,
      html: `<span>${location.count}</span>`,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });
    const popup = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = location.name;
    const link = document.createElement("a");
    link.href = careerHref({ ...filters, location: location.name }, true);
    link.textContent = `View ${location.count} ${location.count === 1 ? "role" : "roles"} →`;
    popup.append(name, link);
    markers.addLayer(
      L.marker([location.latitude, location.longitude], {
        icon,
        title: `${location.name}: ${location.count} roles`,
        alt: `${location.name}: ${location.count} roles`,
      }).bindPopup(popup),
    );
  }
  markers.addTo(map);
}
