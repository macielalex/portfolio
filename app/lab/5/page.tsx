import type { Metadata } from "next";

import { Replica } from "@/components/lab/lab-home";

export const metadata: Metadata = {
  title: "Lab 5 · Deploy",
};

export default function LabFivePage() {
  return <Replica id="deploy" />;
}
