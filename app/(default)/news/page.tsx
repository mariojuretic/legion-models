import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";

import NewsFeed from "@/components/NewsFeed";
import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "news"] | order(_createdAt desc)
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "settings"][0]{ newsSeo }`;

  const { newsSeo }: SiteSettings = await readClient.fetch(q);

  const title = newsSeo?.title || (await parent).title || undefined;
  const description =
    newsSeo?.description || (await parent).description || undefined;
  const openGraph = (await parent).openGraph || {};

  return {
    title,
    description,
    openGraph: {
      ...openGraph,
      title,
      description,
    },
  };
}

export default async function Page() {
  const news: NewsDoc[] = await readClient.fetch(query);

  return (
    <main className="flex-1 self-start p-4 lg:p-8 lg:pl-0">
      {news.length === 0 && <p className="brand-text">No news found</p>}

      {news.length > 0 && <NewsFeed news={news} />}
    </main>
  );
}
