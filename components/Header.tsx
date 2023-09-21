import Link from "next/link";
import localFont from "next/font/local";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";

const drukWide = localFont({ src: "../fonts/DrukWide-Bold.ttf" });

export default function Header() {
  return (
    <header className="sticky top-0 flex items-center justify-between bg-black lg:bg-transparent">
      <div className="p-4 lg:w-80 lg:p-8">
        <h1
          className={`${drukWide.className} text-3xl leading-none lg:text-4xl`}
        >
          <Link href="/models" className="inline-block">
            LEGION
          </Link>
        </h1>
      </div>

      <button className="p-4 lg:hidden">
        <Bars3BottomRightIcon className="h-[30px] w-[30px]" />
      </button>

      {/* SearchBar */}
    </header>
  );
}
