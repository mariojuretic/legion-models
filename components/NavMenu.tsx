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
      className={`flex flex-col text-sm font-light uppercase tracking-widest lg:sticky lg:top-[100px] lg:w-80 lg:items-start lg:self-start lg:p-8 ${
        isOpen
          ? "max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-[62px] max-lg:z-50 max-lg:items-center max-lg:justify-center max-lg:bg-black max-lg:p-4"
          : "max-lg:hidden"
      }`}
      onClick={closeMenu}
    >
      <Link href="/about">About</Link>
      <Link href="/models">Models</Link>
      <Link href="/new-faces">New Faces</Link>
      <Link href="/get-scouted">Get Scouted</Link>
      <Link href="/news">News</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
