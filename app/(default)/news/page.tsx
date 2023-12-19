import { groq } from "next-sanity";

import NewsFeed from "@/components/NewsFeed";
import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "news"] | order(_createdAt desc)
`;

export const dynamic = "force-dynamic";

export default async function Page() {
  const news: NewsDoc[] = await client.fetch(query);

  return (
    <main className="flex-1 self-start p-4 lg:p-8 lg:pl-0">
      {news.length === 0 && <p className="brand-text">No news found</p>}

      {news.length > 0 && <NewsFeed news={news} />}
    </main>
  );
}
