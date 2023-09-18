import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between p-6 text-xs uppercase tracking-widest">
      <div className="flex items-center space-x-6">
        <Link href="/">Light Mode</Link>
      </div>

      <div className="flex items-center space-x-6">
        <p>Copyright by LEGION</p>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/cookie-policy">Cookie Policy</Link>
        <Link href="/terms-of-use">Terms of Use</Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link href="/">Instagram</Link>
        <Link href="/">Newsletter</Link>
      </div>
    </footer>
  );
}
