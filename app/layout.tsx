import type { Metadata } from "next";
import { groq } from "next-sanity";
// import localFont from "next/font/local";
import { Roboto } from "next/font/google";

import { client } from "@/lib/sanity.client";

import "./globals.css";

// const helveticaNeue = localFont({
//   src: [
//     { path: "../fonts/HelveticaNeue-Roman.otf", weight: "400" },
//     { path: "../fonts/HelveticaNeue-Medium.otf", weight: "500" },
//   ],
// });

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

const query = groq`
  *[_type == "settings"][0]
`;

export const revalidate = 120;

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
        className={`${roboto.className} bg-white text-black dark:bg-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
