import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

import ImageStack from "@/components/ImageStack";
import SwiperImageSlider from "@/components/SwiperImageSlider";
import generateSlides from "@/lib/generateSlides";
import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && slug.current == $slug][0] {
    ...,
    digitals[] {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params: { slug } }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "model" && slug.current == $slug][0]{ digitalsSeo }`;

  const { digitalsSeo }: ModelDoc = await readClient.fetch(q, { slug });

  const title = digitalsSeo?.title || (await parent).title || undefined;
  const description =
    digitalsSeo?.description || (await parent).description || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const model: ModelDoc = await readClient.fetch(query, { slug });

  if (!model.digitals) {
    return notFound();
  }

  const slides = generateSlides(model.digitals);

  return (
    <>
      <main className="lg:hidden">
        <ImageStack slides={slides} name={model.name} />
      </main>

      <main className="hidden h-full w-full lg:block">
        <div className="h-[calc(100svh-177px)] w-screen">
          <SwiperImageSlider slides={slides} imagesAltText={model.name} />
        </div>
      </main>
    </>
  );
};

export default Page;
