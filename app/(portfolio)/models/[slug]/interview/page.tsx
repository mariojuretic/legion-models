import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && slug.current == $slug][0]
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params: { slug } }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "model" && slug.current == $slug][0]{ interviewSeo }`;

  const { interviewSeo }: ModelDoc = await readClient.fetch(q, { slug });

  const title = interviewSeo?.title || (await parent).title || undefined;
  const description =
    interviewSeo?.description || (await parent).description || undefined;
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

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const model: ModelDoc = await readClient.fetch(query, { slug });

  if (!model.interview) {
    return notFound();
  }

  return (
    <main className="flex flex-1 items-center justify-center p-4 lg:h-full lg:w-full lg:flex-initial lg:p-8">
      <div className="brand-text max-w-[125ch] whitespace-pre-line">
        <p>{model.interview}</p>
      </div>
    </main>
  );
};

export default Page;
