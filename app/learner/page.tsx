import type { Metadata } from "next";
import LearnerView from "@/components/LearnerView";

export const metadata: Metadata = {
  title: "Learning in public",
  description:
    "A frontend engineer's route to full-stack, documented as it happens: current builds, decisions and mistakes.",
};

export default function LearnerPage() {
  return <LearnerView />;
}
