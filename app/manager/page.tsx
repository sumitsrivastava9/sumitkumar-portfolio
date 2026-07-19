import type { Metadata } from "next";
import ManagerView from "@/components/ManagerView";

export const metadata: Metadata = {
  title: "For hiring managers",
  description:
    "Proof over promises: a flagship case study with real numbers, a 2-minute walkthrough, and the tradeoffs behind the choices.",
  // "/" serves this same view to first-time visitors; point search
  // engines at one URL instead of splitting ranking across two.
  alternates: { canonical: "/" },
};

export default function ManagerPage() {
  return <ManagerView />;
}
