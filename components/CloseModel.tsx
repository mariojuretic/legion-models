import Link from "next/link";
import localFont from "next/font/local";
import { XMarkIcon } from "@heroicons/react/24/outline";

const drukWide = localFont({ src: "../fonts/DrukWide-Bold.ttf" });

export default function CloseModel({ category }: { category: string }) {
  return (
    <div className="flex items-center justify-end lg:h-[100px]">
      <Link href={`/${category}`} className="p-4 lg:hidden">
        <XMarkIcon className="h-5 w-5" />
      </Link>

      <Link href={`/${category}`} className="brand-text mr-8 hidden lg:block">
        Close
      </Link>
    </div>
  );
}
