import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import ModelsList from "@/components/ModelsList";
import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "collection" && slug.current == $slug][0] {
    ...,
    models[]-> | order(name asc)
  }
`;

export const dynamic = "force-dynamic";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const collection: CollectionDoc = await client.fetch(query, { slug });

  if (!collection) {
    return notFound();
  }

  return (
    <main className="flex-1 self-start p-4 lg:p-8">
      <h2 className="brand-text mb-4 text-center lg:mb-8">
        {collection.name} package
      </h2>

      {!collection.models && (
        <p className="brand-text text-center">
          No models found in this package.
        </p>
      )}

      {collection.models && collection.models.length > 0 && (
        <ModelsList models={collection.models} />
      )}
    </main>
  );
}
