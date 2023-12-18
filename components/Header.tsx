"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import localFont from "next/font/local";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

import SearchBar from "./SearchBar";
import { useMenuStore } from "@/store/MenuStore";
import { useSearchStore } from "@/store/SearchStore";

const drukWide = localFont({ src: "../fonts/DrukWide-Bold.ttf" });

const SEARCHABLE_PAGES = ["main-board", "development"];

export default function Header() {
  const pathname = usePathname();
  const [searchable, setSearchable] = useState<boolean>(false);

  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  const [isOpen, openMenu, closeMenu] = useMenuStore((state) => [
    state.isOpen,
    state.openMenu,
    state.closeMenu,
  ]);

  useEffect(() => {
    setSearchTerm("");
    setSearchable(
      SEARCHABLE_PAGES.some((page) => pathname.split("/").includes(page)),
    );
  }, [pathname, setSearchTerm]);

  return (
    <header className="sticky top-0 z-50 flex flex-col bg-white dark:bg-black lg:flex-row lg:bg-transparent dark:lg:bg-transparent">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="p-4 lg:w-60 lg:p-8">
          <h1
            className={`${drukWide.className} text-xl leading-none lg:text-3xl`}
          >
            <Link href="/main-board" className="inline-block">
              LEGION
            </Link>
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex items-center lg:hidden">
          <button className="p-4" onClick={isOpen ? closeMenu : openMenu}>
            {isOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3BottomRightIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* SearchBar */}
      {searchable && <SearchBar />}
    </header>
  );
}
