import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Sumit · learning in public";

export default function Image() {
  return ogImage({
    eyebrow: "for learners",
    title: "Learning in public.",
    subtitle: "A frontend engineer's route to full-stack, documented as it happens",
    accent: "#7F77DD",
  });
}
