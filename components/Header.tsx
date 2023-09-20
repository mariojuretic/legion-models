import Link from "next/link";
import localFont from "next/font/local";

const drukWide = localFont({ src: "../fonts/DrukWide-Bold.ttf" });

export default function Header() {
  return (
    <header className="sticky top-0 flex">
      <div className="w-80 p-8">
        <h1 className={`${drukWide.className} text-4xl leading-none`}>
          <Link href="/models" className="inline-block">
            LEGION
          </Link>
        </h1>
      </div>

      {/* SearchBar */}
    </header>
  );
}
