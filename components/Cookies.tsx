"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getCookie, setCookie } from "cookies-next";

export default function Cookies() {
  const [showCookies, setShowCookies] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname === "/" || pathname.startsWith("/studio")) return;

    const cookie = getCookie("_legionmodels_gdpr");

    if (cookie !== "true") {
      setShowCookies(true);
    }
  }, [pathname]);

  const handleAcceptCookies = () => {
    setCookie("_legionmodels_gdpr", "true", { maxAge: 30 * 24 * 60 * 60 });
    setShowCookies(false);
  };

  if (!showCookies) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/50" />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white text-black dark:bg-black dark:text-white">
        <div className="flex flex-col items-center gap-4 p-4 lg:flex-row lg:justify-between lg:gap-8 lg:p-8">
          <p className="brand-text text-center lg:text-left">
            By clicking &quot;Accept all cookies&quot;, you agree to the storing
            of cookies on your device to enhance site navigation, analyze site
            usage, and assist in our marketing efforts.
          </p>

          <button
            className="brand-text shrink-0 cursor-pointer rounded-none border-0 bg-black px-6 py-2 text-white outline-none dark:bg-white dark:text-black"
            onClick={handleAcceptCookies}
          >
            Accept all cookies
          </button>
        </div>
      </div>
    </>
  );
}
