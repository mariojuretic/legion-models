import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";

import GetScoutedForm from "@/components/GetScoutedForm";
import { readClient } from "@/lib/sanity.client";

export async function generateMetadata(
  props: {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "settings"][0]{ getScoutedSeo }`;

  const { getScoutedSeo }: SiteSettings = await readClient.fetch(q);

  const title = getScoutedSeo?.title || (await parent).title || undefined;
  const description =
    getScoutedSeo?.description || (await parent).description || undefined;
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

export default function Page() {
  return (
    <main className="flex flex-1 items-center justify-center p-4 lg:p-8 lg:pl-0">
      <GetScoutedForm />
    </main>
  );
}
