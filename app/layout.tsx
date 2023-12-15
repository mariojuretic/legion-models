import type { Metadata } from "next";
import localFont from "next/font/local";
import { groq } from "next-sanity";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { client } from "@/lib/sanity.client";

import "./globals.css";

const neueHaasGroteskText = localFont({
  src: [
    {
      path: "../fonts/NeueHaasGroteskText-Regular.otf",
      weight: "400",
    },
    {
      path: "../fonts/NeueHaasGroteskText-Bold.otf",
      weight: "700",
    },
  ],
});

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
        className={`${neueHaasGroteskText.className} bg-white text-black dark:bg-black dark:text-white`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
