"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabLink({
  children,
  slug,
  tab,
}: {
  children: React.ReactNode;
  slug: string;
  tab?: string;
}) {
  const pathname = usePathname();

  const segments = pathname.split("/");
  const endSegment = segments[segments.length - 1];

  const isActive = tab ? endSegment === tab : endSegment === slug;

  return (
    <Link
      href={`/models/${slug}/${tab || ""}`}
      className={`${
        isActive ? "text-black" : "text-black/50"
      } hover:text-black ${
        isActive ? "dark:text-white" : "dark:text-white/50"
      } leading-[2.6] dark:hover:text-white lg:leading-[1.3]`}
    >
      {children}
    </Link>
  );
}
