import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

const query = groq`
  *[_type == "settings"][0]
`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "LEGION MODEL MANAGEMENT",
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme }: SiteSettings = await client.fetch(query);

  return (
    <html lang="en" className={theme}>
      <body
        className={`${roboto.className} bg-white text-black dark:bg-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
