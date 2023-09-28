import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const helveticaNeue = localFont({
  src: [
    { path: "../fonts/HelveticaNeue-Roman.otf", weight: "400" },
    { path: "../fonts/HelveticaNeue-Medium.otf", weight: "500" },
  ],
});

export const metadata: Metadata = {
  title: "THE LEGION",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${helveticaNeue.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
