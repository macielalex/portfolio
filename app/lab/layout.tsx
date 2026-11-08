import type { Metadata } from "next";

import "./replica-folds.css";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
