import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Sumit · for recruiters";

export default function Image() {
  return ogImage({
    eyebrow: "for recruiters",
    title: "The facts, fast.",
    subtitle:
      "3 years React, Next.js, TypeScript · Gurugram, IN · open to frontend roles",
    accent: "#5DCAA5",
  });
}
