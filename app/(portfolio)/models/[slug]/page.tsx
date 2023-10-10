import { groq } from "next-sanity";

import ImageWithSource from "@/components/ImageWithSource";
import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && slug.current == $slug][0] {
    ...,
    "portfolioImage": {
      ...portfolioImage,
      "dimensions": portfolioImage.asset->metadata.dimensions
    }
  }
`;

export const revalidate = 120;

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const model: ModelDoc = await client.fetch(query, { slug });

  return (
    <main className="flex flex-1 p-4 lg:p-8">
      <ImageWithSource image={model.portfolioImage} />
    </main>
  );
}
