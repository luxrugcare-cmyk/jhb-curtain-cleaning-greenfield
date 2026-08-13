"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RoutePageViews() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  return null;
}
