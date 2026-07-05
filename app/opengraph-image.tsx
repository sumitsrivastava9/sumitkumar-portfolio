import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Sumit · Frontend Engineer";

export default function Image() {
  return ogImage({
    eyebrow: "portfolio",
    title: "I build interfaces that ship.",
    subtitle:
      "3 years · 10+ production apps · sole frontend engineer at a product studio",
    accent: "#D85A30",
  });
}
