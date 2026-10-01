import type { Metadata } from "next";
export const metadata: Metadata = { title: "My account | HKFitness", robots: { index: false, follow: true } };
export default function AccountLayout({ children }: { children: React.ReactNode }) { return children; }
