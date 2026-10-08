/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain <img>; next/image does not apply. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { company } from "@/content/company";
import { markets } from "@/content/seo";
import { BRAND, markDataUri } from "./brand";

/**
 * Share cards (Open Graph and X), drawn at build time by each route's
 * opengraph-image file. The site's look in a 1200×630 frame: the sky as a
 * soft gradient (a photograph would push the PNG past what WhatsApp will
 * preview), the frame's hairlines, the logo, the page's label and title, and
 * the markets along the bottom.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

let assets;
function loadAssets() {
  // Literal paths, so the build traces these three files and nothing else.
  assets ??= Promise.all([
    readFile(join(process.cwd(), "src/app/font/regular.otf")),
    readFile(join(process.cwd(), "src/app/font/satre.ttf")),
    readFile(join(process.cwd(), "public/brand/wordmark-ink.png")),
  ]).then(([display, body, wordmark]) => ({
    display,
    body,
    wordmark: `data:image/png;base64,${wordmark.toString("base64")}`,
  }));
  return assets;
}

const HAIRLINE = "rgba(255,255,255,.9)";
const PAD = 104;

export async function ogImage({ eyebrow, title }) {
  const { display, body, wordmark } = await loadAssets();
  const size = title.length > 64 ? 56 : title.length > 40 ? 66 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "linear-gradient(180deg, #f7f9fc 0%, #e6edf6 52%, #c9d8eb 100%)",
          fontFamily: "Manrope",
          color: BRAND.ink,
        }}
      >
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 72, width: 1, background: HAIRLINE }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 72, width: 1, background: HAIRLINE }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 112, height: 1, background: HAIRLINE }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 112, padding: `0 ${PAD}px` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={markDataUri()} width={52} height={52} alt="" />
            <img src={wordmark} width={194} height={27} alt="" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "9px 20px 9px 14px",
              borderRadius: 999,
              border: `1px solid ${HAIRLINE}`,
              background: "rgba(255,255,255,.6)",
              fontSize: 20,
              color: BRAND.inkSoft,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", width: 28, height: 18, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ flex: 1, background: "#0072ce" }} />
              <div style={{ flex: 1, background: "#0d0d0d" }} />
              <div style={{ flex: 1, background: "#ffffff" }} />
            </div>
            EU-registered software company
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: `0 ${PAD}px` }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 19,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: BRAND.inkSoft,
            }}
          >
            <div style={{ width: 10, height: 10, background: BRAND.eu }} />
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 26,
              maxWidth: 960,
              fontFamily: "Aeonik, Manrope",
              fontSize: size,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 92,
            padding: `0 ${PAD}px`,
            borderTop: `1px solid ${HAIRLINE}`,
            background: "rgba(255,255,255,.5)",
            fontSize: 20,
            color: BRAND.inkSoft,
          }}
        >
          <div style={{ display: "flex" }}>{company.url.replace(/^https?:\/\//, "")}</div>
          <div style={{ display: "flex", gap: 26 }}>
            {markets.map((m) => (
              <div key={m.short} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 7, height: 7, background: BRAND.eu }} />
                {m.short}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Aeonik", data: display, weight: 400, style: "normal" },
        { name: "Manrope", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}

/** A square image of the mark: the favicon family and the logo in structured data. */
export function markImage({ size, padding = 0.14, background = BRAND.paper, radius = 0 }) {
  const inner = Math.round(size * (1 - padding * 2));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background,
          borderRadius: radius,
        }}
      >
        <img src={markDataUri()} width={inner} height={inner} alt="" />
      </div>
    ),
    { width: size, height: size },
  );
}
