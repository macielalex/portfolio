import type { Metadata } from "next";

import { Replica } from "@/components/lab/lab-home";

export const metadata: Metadata = {
  title: "Lab 3 · Lapa",
};

export default function LabThreePage() {
  return <Replica id="lapa" />;
}
