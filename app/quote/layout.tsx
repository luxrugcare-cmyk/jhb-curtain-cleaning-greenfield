import type { ReactNode } from "react";
import { FunnelStartTracker } from "@/components/analytics/FunnelStartTracker";

export default function QuoteLayout({ children }: { children: ReactNode }) {
  return <><FunnelStartTracker />{children}</>;
}
