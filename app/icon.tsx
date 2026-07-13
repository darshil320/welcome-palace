import { ImageResponse } from "next/og";

// Branded "WP" monogram — replaces the old room-photo placeholder as the real
// brand mark. Used as the favicon/tab icon AND (via /icon URL) the schema.org
// Organization logo. Self-contained so it renders identically everywhere.
export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #14100a 0%, #241f16 60%, #14100a 100%)",
          borderRadius: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: -4,
            color: "#f5f1e8",
            fontFamily: "serif",
          }}
        >
          W<span style={{ color: "#c9a84c", display: "flex" }}>P</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
