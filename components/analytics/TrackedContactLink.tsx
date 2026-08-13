"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/integrations/analytics/events";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  event: "call_click" | "whatsapp_click";
  placement: string;
  children: ReactNode;
};

export function TrackedContactLink({ event, placement, children, ...props }: Props) {
  return <a {...props} onClick={() => trackEvent(event, { placement })}>{children}</a>;
}
