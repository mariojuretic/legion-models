import Link from "next/link";

export default function NavMenu() {
  return (
    <nav className="flex flex-col items-start p-6 text-xs uppercase tracking-widest">
      <Link href="/about">About</Link>
      <Link href="/models">Models</Link>
      <Link href="/new-faces">New Faces</Link>
      <Link href="/get-scouted">Get Scouted</Link>
      <Link href="/news">News</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
