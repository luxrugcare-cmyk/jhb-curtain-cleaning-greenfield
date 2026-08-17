import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio | JHB Curtain Cleaning Content Management",
  description: "Manage case studies, verified reviews, and service content for JHB Curtain Cleaning.",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#111827", overflow: "hidden" }}>
      {children}
    </div>
  );
}
