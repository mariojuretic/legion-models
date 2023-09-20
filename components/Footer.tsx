import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center space-x-8 p-8 text-sm font-light uppercase tracking-widest">
      <p>Copyright by LEGION</p>
      <Link href="/privacy-policy">Privacy Policy</Link>
      <Link href="/cookie-polivy">Cookie Policy</Link>
      <Link href="/terms-of-use">Terms of Use</Link>
    </footer>
  );
}
