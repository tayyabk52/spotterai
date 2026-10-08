import { heroImages } from "@/content/home";

// Illustrative generated scenes, not actual Spotter customers or employees.
export const heroPhotos = [
  {
    ...heroImages[0],
    width: 900,
    height: 1200,
    position: "fleetPhoto",
    direction: "left",
  },
  {
    ...heroImages[1],
    width: 900,
    height: 1200,
    position: "dispatchPhoto",
    direction: "right",
  },
  {
    src: "/images/hero/driver-cab.webp",
    alt: "Freight driver checking a smartphone inside a parked truck cab before a shift",
    caption: "The driver behind the wheel.",
    width: 900,
    height: 600,
    position: "driverPhoto",
    direction: "left",
  },

] as const;
