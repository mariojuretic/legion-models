import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";

import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "about"][0]
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "about"][0]{ seo }`;

  const { seo }: AboutPage = await readClient.fetch(q);

  const title = seo?.title || (await parent).title;
  const description = seo?.description || (await parent).description;

  return { title, description };
}

export default async function Page() {
  const about: AboutPage = await readClient.fetch(query);

  return (
    <main className="flex flex-1 items-center justify-center p-4 lg:p-8 lg:pl-0">
      <div className="brand-text max-w-[100ch] whitespace-pre-line">
        <p>{about.description}</p>
      </div>
    </main>
  );
}
