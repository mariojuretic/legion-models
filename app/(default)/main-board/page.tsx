import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";

import ModelsList from "@/components/ModelsList";
import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && hidden == false] | order(name asc)
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "settings"][0]{ mainBoardSeo }`;

  const { mainBoardSeo }: SiteSettings = await readClient.fetch(q);

  const title = mainBoardSeo?.title || (await parent).title || undefined;
  const description =
    mainBoardSeo?.description || (await parent).description || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Page() {
  const models: ModelDoc[] = await readClient.fetch(query);

  return (
    <main className="flex-1 self-start p-4 lg:p-8 lg:pl-0">
      {models.length === 0 && <p className="brand-text">No models found.</p>}

      {models.length > 0 && <ModelsList models={models} filter="main-board" />}
    </main>
  );
}
