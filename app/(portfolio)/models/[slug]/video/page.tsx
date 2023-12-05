import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import VideoStack from "@/components/VideoStack";
import VideoSlider from "@/components/VideoSlider";
import { client } from "@/lib/sanity.client";

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

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const model: ModelDoc = await client.fetch(query, { slug });

  if (!model.videos) {
    return notFound();
  }

  return (
    <>
      <main className="block lg:hidden">
        <VideoStack videos={model.videos} />
      </main>

      <main className="hidden lg:flex lg:flex-1">
        <VideoSlider videos={model.videos} />
      </main>
    </>
  );
}
