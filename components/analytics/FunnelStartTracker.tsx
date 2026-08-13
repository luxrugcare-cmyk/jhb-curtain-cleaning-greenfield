"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/integrations/analytics/events";

export function FunnelStartTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/quote") {
      trackEvent("quote_start", { lead_type: "residential" });
      return;
    }

    if (pathname === "/commercial-assessment") {
      trackEvent("commercial_start", { lead_type: "commercial" });
    }
  }, [pathname]);

  return null;
}
