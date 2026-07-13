import { ImageResponse } from "next/og";

// Apple touch icon (home-screen). Same brand monogram, Apple's recommended 180².
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 94,
            fontWeight: 700,
            letterSpacing: -3,
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
