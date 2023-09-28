"use client";

import Link from "next/link";
import localFont from "next/font/local";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

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
      {/* Logo */}
      <div className="p-4 lg:w-80 lg:p-8">
        <h1
          className={`${drukWide.className} text-xl leading-none lg:text-3xl`}
        >
          <Link href="/models" className="inline-block">
            LEGION
          </Link>
        </h1>
      </div>

      {/* Buttons */}
      <div className="flex items-center lg:hidden">
        <button className="p-4">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
        <button className="p-4" onClick={isOpen ? closeMenu : openMenu}>
          {isOpen ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3BottomRightIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* SearchBar */}
    </header>
  );
}
