import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";

import ImageStack from "@/components/ImageStack";
import SwiperImageSlider from "@/components/SwiperImageSlider";
import generateSlides from "@/lib/generateSlides";
import { readClient } from "@/lib/sanity.client";

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

export async function generateMetadata(
  { params: { slug } }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "model" && slug.current == $slug][0]{ portfolioSeo }`;

  const { portfolioSeo }: ModelDoc = await readClient.fetch(q, { slug });

  const title = portfolioSeo?.title || (await parent).title || undefined;
  const description =
    portfolioSeo?.description || (await parent).description || undefined;

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

  const slides = generateSlides(model.portfolio);

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
