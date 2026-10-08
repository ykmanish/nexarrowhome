/**
 * The Nexarrow mark as plain geometry: an 18-sided badge with the curved
 * arrow, vectorised from the brand artwork. The React mark in ui.jsx and
 * every generated image (favicon, app icons, share cards, the logo search
 * engines read) draw from these, so the mark is defined once.
 */

export const MARK_VIEWBOX = "0 0 400 403";

export const MARK_BADGE =
  "395,201.5 383.2,268.2 349.4,326.8 297.5,370.4 233.9,393.5 166.1,393.5 102.5,370.4 50.6,326.8 16.8,268.2 5,201.5 16.8,134.8 50.6,76.2 102.5,32.6 166.1,9.5 233.9,9.5 297.5,32.6 349.4,76.2 383.2,134.8";

export const MARK_ARROW =
  "M264.4 268.1L275.3 257.2L271.1 252.4C252 230.7 252.5 193.7 272.4 154.1L275.9 147.3L265.1 136.6L254.3 125.9L245.4 130.3C207.4 149.4 169.9 149.3 148.7 130.1L144.9 126.6L133.7 137.8L122.6 148.9L125 151.6C139.2 166.8 174.6 179 197.4 176.6L203.5 175.9L163.5 215.9L123.5 256L134.8 267.2L146 278.5L186 238.5L226.1 198.5L225.4 205C223.8 222.3 229.4 245.7 239.4 262.2C243.3 268.8 251.5 279 252.8 279C253.2 279 258.4 274.1 264.4 268.1Z";

/** Brand colours for generated images, which cannot read the CSS tokens. */
export const BRAND = {
  lime: "#cff27f",
  ink: "#0d0d0d",
  inkSoft: "#4a4a4a",
  eu: "#003399",
  paper: "#ffffff",
};

/** The mark as a standalone SVG document. */
export function markSvg({ fill = BRAND.lime, ink = BRAND.ink } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}"><polygon fill="${fill}" points="${MARK_BADGE}"/><path fill="${ink}" d="${MARK_ARROW}"/></svg>`;
}

/** The mark as a data URI, for <img> inside generated images. */
export function markDataUri(colors) {
  return `data:image/svg+xml;base64,${Buffer.from(markSvg(colors)).toString("base64")}`;
}
