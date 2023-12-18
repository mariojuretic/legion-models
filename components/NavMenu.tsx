"use client";

import Link from "next/link";

import { useMenuStore } from "@/store/MenuStore";

export default function Menu() {
  const [isOpen, closeMenu] = useMenuStore((state) => [
    state.isOpen,
    state.closeMenu,
  ]);

  return (
    <nav
      className={`brand-text fixed bottom-0 left-0 right-0 top-[52px] z-50 ${
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
    </nav>
  );
}
