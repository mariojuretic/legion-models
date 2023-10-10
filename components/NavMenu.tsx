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
      } flex-col items-start bg-white p-4 dark:bg-black lg:sticky lg:bottom-auto lg:left-auto lg:right-auto lg:top-[100px] lg:flex lg:w-80 lg:self-start lg:p-8`}
    >
      <Link href="/about" onClick={closeMenu}>
        About
      </Link>
      <Link href="/models" onClick={closeMenu}>
        Models
      </Link>
      <Link href="/new-faces" onClick={closeMenu}>
        New Faces
      </Link>
      <Link href="/get-scouted" onClick={closeMenu}>
        Get Scouted
      </Link>
      <Link href="/news" onClick={closeMenu}>
        News
      </Link>
      <Link href="/contact" onClick={closeMenu}>
        Contact
      </Link>
    </nav>
  );
}
