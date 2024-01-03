"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useTabsStore } from "@/store/TabsStore";

function MeasuresBox({ measures }: { measures: MeasureObj[] }) {
  const [units, setUnits] = useState<"eu" | "us">("eu");

  return (
    <div className="brand-text flex flex-col gap-y-2 bg-white p-4 dark:bg-black lg:fixed lg:bottom-[45px] lg:left-0 lg:z-50 lg:p-8">
      <div className="flex items-center gap-x-2 leading-[2.6] text-black/50 dark:text-white/50 lg:leading-[1.5]">
        <span
          className={`cursor-pointer ${
            units === "eu"
              ? "text-black dark:text-white"
              : "hover:text-black dark:hover:text-white"
          }`}
          onClick={() => setUnits("eu")}
        >
          EU
        </span>
        <span>/</span>
        <span
          className={`cursor-pointer ${
            units === "us"
              ? "text-black dark:text-white"
              : "hover:text-black dark:hover:text-white"
          }`}
          onClick={() => setUnits("us")}
        >
          US
        </span>
      </div>
      <ul className="flex flex-wrap gap-x-4 lg:flex-col">
        {measures.map((measure) => (
          <li
            key={measure.label}
            className="flex flex-nowrap items-center gap-x-2 leading-[1.5]"
          >
            <span>{measure.label}</span>
            <span>{units === "eu" ? measure.value_eu : measure.value_us}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Measures({ measures }: { measures: MeasureObj[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [measuresActive, hideMeasures] = useTabsStore((state) => [
    state.measuresActive,
    state.hideMeasures,
  ]);

  useEffect(() => {
    hideMeasures();
  }, [pathname, searchParams, hideMeasures]);

  return measuresActive ? <MeasuresBox measures={measures} /> : null;
}
