"use client";

import { useEffect } from "react";
import { trackEvent } from "@/integrations/analytics/events";

type FunnelStartTrackerProps = {
  event: "quote_start" | "commercial_start";
  leadType: "residential" | "commercial";
};

export function FunnelStartTracker({ event, leadType }: FunnelStartTrackerProps) {
  useEffect(() => {
    trackEvent(event, { lead_type: leadType });
  }, [event, leadType]);

  return null;
}
