import type { Metadata } from "next";

import { Replica } from "@/components/lab/lab-home";

export const metadata: Metadata = {
  title: "Lab 4 · Aceternity",
};

export default function LabFourPage() {
  return <Replica id="aceternity" />;
}
