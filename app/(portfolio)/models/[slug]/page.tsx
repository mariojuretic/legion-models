import { groq } from "next-sanity";

import PortfolioImage from "@/components/PortfolioImage";
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

export const dynamic = "force-dynamic";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const model: ModelDoc = await client.fetch(query, { slug });

  return (
    <main className="flex flex-1 p-4 lg:p-8">
      <PortfolioImage
        image={model.portfolioImage}
        name={model.name}
        alignment="center"
      />
    </main>
  );
}
