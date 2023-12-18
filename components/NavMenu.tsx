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
      } flex-col items-start bg-white p-4 dark:bg-black lg:sticky lg:bottom-auto lg:left-auto lg:right-auto lg:top-[100px] lg:flex lg:w-60 lg:self-start lg:p-8`}
    >
      <Link href="/about" className="hover:font-bold" onClick={closeMenu}>
        About
      </Link>
      <Link href="/main-board" className="hover:font-bold" onClick={closeMenu}>
        Main Board
      </Link>
      <Link href="/development" className="hover:font-bold" onClick={closeMenu}>
        Development
      </Link>
      <Link href="/get-scouted" className="hover:font-bold" onClick={closeMenu}>
        Get Scouted
      </Link>
      <Link href="/news" className="hover:font-bold" onClick={closeMenu}>
        News
      </Link>
      <Link href="/contact" className="hover:font-bold" onClick={closeMenu}>
        Contact
      </Link>
    </nav>
  );
}
