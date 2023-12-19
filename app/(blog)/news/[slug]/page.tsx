import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import VerticalGallery from "@/components/VerticalGallery";
import VideoStack from "@/components/VideoStack";
import ImageSlider from "@/components/ImageSlider";
import VideoSlider from "@/components/VideoSlider";
import { client } from "@/lib/sanity.client";
import generateSlides from "@/lib/generateSlides";

const query = groq`
  *[_type == "news" && slug.current == $slug][0] {
    ...,
    images[] {
      ...,
      "dimensions": asset->metadata.dimensions
    },
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
  const post: NewsDoc = await client.fetch(query, { slug });

  if (post.type === "image" && !post.images) return notFound();
  if (post.type === "video" && !post.videos) return notFound();

  return (
    <>
      <main className="block flex-1 pb-4 lg:hidden lg:pb-0">
        {post.type === "image" ? (
          <VerticalGallery
            slides={generateSlides(post.images!)}
            name={post.title}
          />
        ) : (
          <VideoStack videos={post.videos!} />
        )}
      </main>

      <main className="hidden pb-4 lg:flex lg:flex-1 lg:pb-0">
        {post.type === "image" ? (
          <ImageSlider
            slides={generateSlides(post.images!)}
            name={post.title}
            withPadding
          />
        ) : (
          <VideoSlider videos={post.videos!} withPadding />
        )}
      </main>
    </>
  );
}
