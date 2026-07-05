import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared Open Graph card template. Every route's opengraph-image.tsx
// calls ogImage() with its own copy + accent so link previews on
// LinkedIn/WhatsApp/Slack stay on-brand.

export const OG_SIZE = { width: 1200, height: 630 };

// Space Grotesk TTFs live in /assets/fonts (checked into the repo so
// builds never depend on a font CDN). If reading them fails we render
// with the default font rather than failing the build.
async function loadDisplayFonts() {
  try {
    const [medium, bold] = await Promise.all([
      readFile(join(process.cwd(), "assets/fonts/SpaceGrotesk-Medium.ttf")),
      readFile(join(process.cwd(), "assets/fonts/SpaceGrotesk-Bold.ttf")),
    ]);
    return [
      { name: "Space Grotesk", data: medium, weight: 500 as const, style: "normal" as const },
      { name: "Space Grotesk", data: bold, weight: 700 as const, style: "normal" as const },
    ];
  } catch {
    return undefined;
  }
}

export async function ogImage({
  eyebrow,
  title,
  subtitle,
  accent,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent: string;
}) {
  const fonts = await loadDisplayFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          backgroundColor: "#0b0b0d",
          backgroundImage: `radial-gradient(ellipse 62% 55% at 80% 12%, ${accent}40, transparent), radial-gradient(ellipse 45% 40% at 8% 95%, ${accent}21, transparent)`,
          color: "#ffffff",
          fontFamily: '"Space Grotesk", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, fontWeight: 500 }}>
            <span>sumit</span>
            <span style={{ color: accent }}>.</span>
            <span>dev</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 19,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: 5,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.06,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 27,
                color: "rgba(255,255,255,0.62)",
                marginTop: 22,
                maxWidth: 900,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 99,
                backgroundColor: accent,
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Sumit · Frontend Engineer · React, Next.js, TypeScript
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: 130,
              height: 6,
              borderRadius: 99,
              backgroundColor: accent,
            }}
          />
        </div>
      </div>
    ),
    { ...OG_SIZE, ...(fonts ? { fonts } : {}) }
  );
}
