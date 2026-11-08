import type { Metadata } from "next";

import { Replica } from "@/components/lab/lab-home";

export const metadata: Metadata = {
  title: "Lab 1 · Godly",
};

export default function LabOnePage() {
  return <Replica id="godly" />;
}
