import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-start p-4 text-xs font-light uppercase tracking-widest lg:flex-row lg:items-center lg:justify-center lg:space-x-8 lg:p-8 lg:text-sm">
      <p>Copyright by LEGION</p>
      <Link href="/privacy-policy">Privacy Policy</Link>
      <Link href="/cookie-polivy">Cookie Policy</Link>
      <Link href="/terms-of-use">Terms of Use</Link>
    </footer>
  );
}
