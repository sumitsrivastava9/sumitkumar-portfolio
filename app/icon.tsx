import { ImageResponse } from "next/og";

// Generated favicon: dark rounded tile with the "S." wordmark, so the
// browser tab matches the site without shipping a binary asset.

export const size = { width: 64, height: 64 };
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
          backgroundColor: "#0b0b0d",
          borderRadius: 14,
          fontSize: 36,
          fontWeight: 700,
        }}
      >
        <div style={{ display: "flex", color: "#ffffff" }}>S</div>
        <div style={{ display: "flex", color: "#D85A30" }}>.</div>
      </div>
    ),
    size
  );
}
