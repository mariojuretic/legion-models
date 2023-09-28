import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

export const dynamicParams = false;

export async function generateStaticParams() {
  const query = groq`
    *[_type == "model" && hidden == false]
  `;

  const models: ModelDoc[] = await client.fetch(query);

  return models.map((model) => ({ slug: model.slug.current }));
}

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const query = groq`
    *[_type == "model" && slug.current == $slug][0]
  `;

  const model: ModelDoc = await client.fetch(query, { slug });

  return (
    <div className="p-4 lg:p-8">
      <p className="brand-text">{model.name} details page</p>
    </div>
  );
}
