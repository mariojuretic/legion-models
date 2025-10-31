"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function makeKey(pathname: string, search: string) {
  return `scroll:${pathname}${search ? `?${search}` : ""}`;
}

export default function ScrollMemory() {
  const pahtname = usePathname();
  const search = useSearchParams()?.toString() ?? "";
  const key = makeKey(pahtname, search);

  // Restore on mount
  useEffect(() => {
    // Let the browser manage bfcache scroll when possible, but we also restore ourselves
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const saved = sessionStorage.getItem(key);

    if (saved) {
      // Run after paint so it wins over framework's default scrolling
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(saved, 10));
      });
    }
  }, [key]);

  // Save while you scroll and before you leave
  useEffect(() => {
    const save = () => sessionStorage.setItem(key, String(window.scrollY));
    const onScroll = () => save();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", save);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", save);
    };
  }, [key]);

  return null;
}
