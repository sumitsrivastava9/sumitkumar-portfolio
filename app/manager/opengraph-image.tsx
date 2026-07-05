import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Sumit · for hiring managers";

export default function Image() {
  return ogImage({
    eyebrow: "for hiring managers",
    title: "Proof over promises.",
    subtitle:
      "Flagship case study with real numbers, a 2-minute walkthrough, and the tradeoffs behind the choices",
    accent: "#D85A30",
  });
}
