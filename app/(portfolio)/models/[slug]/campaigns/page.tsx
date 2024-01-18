import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import ImageStack from "@/components/ImageStack";
import ImageSlider from "@/components/ImageSlider";
import { client } from "@/lib/sanity.client";
import generateSlides from "@/lib/generateSlides";

const query = groq`
  *[_type == "model" && slug.current == $slug][0] {
    ...,
    campaigns[] {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }
`;

export const dynamic = "force-dynamic";

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const model: ModelDoc = await client.fetch(query, { slug });

  if (!model.campaigns) {
    return notFound();
  }

  const slides = generateSlides(model.campaigns);

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
