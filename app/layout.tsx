import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "THE LEGION",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
