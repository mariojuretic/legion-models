import Link from "next/link";

export default function Footer() {
  return (
    <footer className="brand-text flex flex-wrap items-center gap-x-4 p-4 lg:ml-60 lg:flex-row-reverse lg:justify-between lg:p-8">
      <div className="flex flex-wrap items-center gap-x-4">
        <a
          href="https://instagram.com/legionmodels"
          target="_blank"
          className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
        >
          Instagram
        </a>
        <Link
          href="/newsletter"
          className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
        >
          Newsletter
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 lg:flex-row-reverse">
        <ul className="flex flex-wrap items-center gap-x-4">
          <li className="flex">
            <Link
              href="/privacy-policy"
              className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
            >
              Privacy Policy
            </Link>
          </li>
          <li className="flex">
            <Link
              href="/cookie-policy"
              className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
            >
              Cookie Policy
            </Link>
          </li>
          <li className="flex">
            <Link
              href="/terms-of-use"
              className="leading-[2.6] hover:font-bold lg:leading-[1.3]"
            >
              Terms of Use
            </Link>
          </li>
        </ul>
        <p className="leading-[2.6] lg:leading-[1.3]">Copyright by LEGION</p>
      </div>

      <div className="hidden h-0 w-0 lg:block" />
    </footer>
  );
}
