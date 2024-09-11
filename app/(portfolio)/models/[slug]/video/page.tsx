import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

import VideoSlider from "@/components/VideoSlider";
import VideoStack from "@/components/VideoStack";
import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && slug.current == $slug][0] {
    ...,
    videos[] {
      ...,
      "playbackId": asset->playbackId,
      "aspectRatio": asset->data.aspect_ratio
    }
  }
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params: { slug } }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "model" && slug.current == $slug][0]{ videosSeo }`;

  const { videosSeo }: ModelDoc = await readClient.fetch(q, { slug });

  const title = videosSeo?.title || (await parent).title || undefined;
  const description =
    videosSeo?.description || (await parent).description || undefined;

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

  if (!model.videos) {
    return notFound();
  }

  return (
    <>
      <main className="lg:hidden">
        <VideoStack videos={model.videos} />
      </main>

      <main className="hidden h-full w-full lg:block">
        <VideoSlider videos={model.videos} />
      </main>
    </>
  );
};

export default Page;
