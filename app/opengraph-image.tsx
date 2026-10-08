import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const alt =
  "Spotter.ai — A clearer road ahead. Connected trucking automation.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const logo = await readFile(
    path.join(process.cwd(), "public/brand/spotter-logo.png"),
  );
  const tokens = await readFile(path.join(process.cwd(), "tokens.css"), "utf8");
  const color = (name: string) =>
    tokens.match(new RegExp(`--color-${name}:\\s*([^;]+)`))![1];
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "70px 80px",
        background: color("ink"),
        color: color("surface"),
      }}
    >
      {/* next/og requires a native image inside its generated image document. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/png;base64,${logo.toString("base64")}`}
        width={280}
        height={69}
        alt="Spotter.ai"
      />
      <div
        style={{
          display: "flex",
          fontSize: 78,
          lineHeight: 1.08,
          maxWidth: 850,
        }}
      >
        A clearer road ahead.
      </div>
      <div style={{ display: "flex", fontSize: 28, color: color("pale") }}>
        Connected tools for the people who move freight.
      </div>
    </div>,
    size,
  );
}
