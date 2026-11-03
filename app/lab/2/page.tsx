import type { Metadata } from "next";

import { Replica } from "@/components/lab/lab-home";

export const metadata: Metadata = {
  title: "Lab 2 · Bento",
};

export default function LabTwoPage() {
  return <Replica id="bento" />;
}
