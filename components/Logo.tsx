import localFont from "next/font/local";

const drukWide = localFont({ src: "../fonts/DrukWide-Bold.ttf" });

export default function Logo() {
  return (
    <header className="p-6 text-4xl">
      <h1 className={drukWide.className}>LEGION</h1>
    </header>
  );
}
