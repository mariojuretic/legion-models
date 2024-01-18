import { groq } from "next-sanity";

import ImageStack from "@/components/ImageStack";
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

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const model: ModelDoc = await client.fetch(query, { slug });

  const slides = generateSlides(model.portfolio);

  return (
    <>
      <main className="lg:hidden">
        <ImageStack slides={slides} name={model.name} />
      </main>

      <main className="hidden h-full w-full lg:block">
        <ImageSlider slides={slides} name={model.name} />
      </main>
    </>
  );
};

export default Page;
