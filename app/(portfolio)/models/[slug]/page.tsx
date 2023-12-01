import { groq } from "next-sanity";

import VerticalGallery from "@/components/VerticalGallery";
import ImageSlider from "@/components/ImageSlider";
import { client } from "@/lib/sanity.client";
import generateSlides from "@/lib/generateSlides";

const query = groq`
  *[_type == "model" && slug.current == $slug][0] {
    ...,
    portfolio[] {
      ...,
      "dimensions": asset->metadata.dimensions
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

  const slides = generateSlides(model.portfolio);

  return (
    <>
      <main className="block lg:hidden">
        <VerticalGallery slides={slides} name={model.name} />
      </main>

      <main className="hidden lg:flex lg:flex-1">
        <ImageSlider slides={slides} name={model.name} />
      </main>
    </>
  );
}
