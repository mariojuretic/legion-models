import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import localFont from "next/font/local";

import Cookies from "@/components/Cookies";
import { readClient } from "@/lib/sanity.client";
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
  const { theme }: SiteSettings = await readClient.fetch(query);

  return (
    <html lang="en" className={theme}>
      <body
        className={`${neueHaasGroteskText.className} bg-white text-black dark:bg-black dark:text-white`}
      >
        {children}
        <Cookies />
        <SpeedInsights />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
    </html>
  );
}
