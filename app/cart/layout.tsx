import type { Metadata } from "next";
export const metadata: Metadata = { title: "Shopping bag | HKFitness", robots: { index: false, follow: true } };
export default function CartLayout({ children }: { children: React.ReactNode }) { return children; }
