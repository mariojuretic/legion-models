import Link from "next/link";

export default function Menu() {
  return (
    <nav className="sticky top-[100px] flex w-80 flex-col items-start self-start p-8 text-sm font-light uppercase tracking-widest">
      <Link href="/about">About</Link>
      <Link href="/models">Models</Link>
      <Link href="/new-faces">New Faces</Link>
      <Link href="/get-scouted">Get Scouted</Link>
      <Link href="/news">News</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
