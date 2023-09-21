"use client";

import Link from "next/link";
import localFont from "next/font/local";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { useMenuStore } from "@/store/MenuStore";

const drukWide = localFont({ src: "../fonts/DrukWide-Bold.ttf" });

export default function Header() {
  const [isOpen, openMenu, closeMenu] = useMenuStore((state) => [
    state.isOpen,
    state.openMenu,
    state.closeMenu,
  ]);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-black lg:bg-transparent">
      <div className="p-4 lg:w-80 lg:p-8">
        <h1
          className={`${drukWide.className} text-3xl leading-none lg:text-4xl lg:leading-none`}
        >
          <Link href="/models" className="inline-block">
            LEGION
          </Link>
        </h1>
      </div>

      <button className="p-4 lg:hidden" onClick={isOpen ? closeMenu : openMenu}>
        {isOpen ? (
          <XMarkIcon className="h-[30px] w-[30px]" />
        ) : (
          <Bars3BottomRightIcon className="h-[30px] w-[30px]" />
        )}
      </button>

      {/* SearchBar */}
    </header>
  );
}
