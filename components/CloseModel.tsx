import Link from "next/link";
import localFont from "next/font/local";
import { XMarkIcon } from "@heroicons/react/24/outline";

const drukWide = localFont({ src: "../fonts/DrukWide-Bold.ttf" });

export default function CloseModel({ category }: { category: string }) {
  return (
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="p-4 lg:p-8">
        <h1
          className={`${drukWide.className} text-xl leading-none lg:text-3xl`}
        >
          <Link href="/models" className="inline-block">
            LEGION
          </Link>
        </h1>
      </div>

      {/* Close Button */}
      <Link href={`/${category}`} className="p-4 lg:hidden">
        <XMarkIcon className="h-5 w-5" />
      </Link>
      <Link href={`/${category}`} className="brand-text mr-8 hidden lg:block">
        Close
      </Link>
    </div>
  );
}
