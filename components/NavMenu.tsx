"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMenuStore } from "@/store/MenuStore";
import { useSearchStore } from "@/store/SearchStore";
import { useEffect, useState } from "react";
import Footer from "./Footer";

const SEARCHABLE_PAGES = ["main-board", "development"];

export default function Menu() {
  const pathname = usePathname();
  const [searchable, setSearchable] = useState<boolean>(false);

  const [isOpen, closeMenu] = useMenuStore((state) => [
    state.isOpen,
    state.closeMenu,
  ]);

  const [showSearch, hideSearch] = useSearchStore((state) => [
    state.showSearch,
    state.hideSearch,
  ]);

  useEffect(() => {
    hideSearch();

    setSearchable(
      SEARCHABLE_PAGES.some((page) => pathname.split("/").includes(page)),
    );
  }, [pathname, hideSearch]);

  return (
    <nav
      className={`brand-text fixed bottom-0 left-0 right-0 top-[52px] z-30 ${
        isOpen ? "flex" : "hidden"
      } flex-col bg-white p-4 dark:bg-black lg:sticky lg:bottom-auto lg:left-auto lg:right-auto lg:top-[100px] lg:flex lg:w-60 lg:items-start lg:self-start lg:p-8`}
    >
      <Link
        href="/about"
        className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
        onClick={closeMenu}
      >
        About
      </Link>
      <Link
        href="/main-board"
        className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
        onClick={closeMenu}
      >
        Main Board
      </Link>
      <Link
        href="/development"
        className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
        onClick={closeMenu}
      >
        Development
      </Link>
      <Link
        href="/get-scouted"
        className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
        onClick={closeMenu}
      >
        Get Scouted
      </Link>
      <Link
        href="/news"
        className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
        onClick={closeMenu}
      >
        News
      </Link>
      <Link
        href="/contact"
        className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
        onClick={closeMenu}
      >
        Contact
      </Link>

      <div className="mt-auto lg:hidden">
        <Footer removePadding />
      </div>

      {searchable && (
        <button
          className="brand-text mt-[13px] hidden hover:font-bold lg:block"
          onClick={() => showSearch()}
        >
          Search
        </button>
      )}
    </nav>
  );
}
