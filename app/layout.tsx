import type { Metadata } from "next";
import localFont from "next/font/local";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

import "./globals.css";

const helveticaNeue = localFont({
  src: [
    { path: "../fonts/HelveticaNeue-Roman.otf", weight: "400" },
    { path: "../fonts/HelveticaNeue-Medium.otf", weight: "500" },
  ],
});

const query = groq`
  *[_type == "settings"][0]
`;

export const metadata: Metadata = {
  title: "THE LEGION",
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
        className={`${helveticaNeue.className} bg-white text-black dark:bg-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
