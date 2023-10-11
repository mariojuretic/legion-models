import Link from "next/link";

export default function Footer() {
  return (
    <footer className="brand-text flex flex-wrap items-center gap-x-4 p-4 lg:ml-80 lg:flex-row-reverse lg:justify-center lg:p-8">
      <ul className="flex flex-wrap items-center gap-x-4">
        <li className="flex">
          <Link href="/privacy-policy" className="hover:font-medium">
            Privacy Policy
          </Link>
        </li>
        <li className="flex">
          <Link href="/cookie-polivy" className="hover:font-medium">
            Cookie Policy
          </Link>
        </li>
        <li className="flex">
          <Link href="/terms-of-use" className="hover:font-medium">
            Terms of Use
          </Link>
        </li>
      </ul>
      <p>Copyright by LEGION</p>
    </footer>
  );
}
