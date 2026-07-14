import { ImageResponse } from "next/og";

export const alt = "Welcome Palace — Luxury Hotel, Banquet & Catering in Piplod, Surat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social card for the whole site. Self-contained (no remote fonts/images)
// so it renders identically everywhere. Per-route pages can add their own.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #14100a 0%, #241f16 55%, #14100a 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "#f5f1e8",
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            Welcome Palace
            <span style={{ color: "#c9a84c" }}>*</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 900,
              display: "flex",
            }}
          >
            Your Shadi Wala Ghar in Piplod, Surat
          </div>
          <div style={{ fontSize: 30, color: "#c9a84c", fontWeight: 500, display: "flex" }}>
            15 Luxury Rooms · Banquet Hall for 125–175 · Chaat & Catering
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#d8cfbf",
          }}
        >
          <span style={{ display: "flex" }}>welcomepalace.in</span>
          <span style={{ color: "#7a6f5a", display: "flex" }}>·</span>
          <span style={{ display: "flex" }}>+91 80000 14410</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
