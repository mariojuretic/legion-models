import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import ImageStack from "@/components/ImageStack";
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

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post: NewsDoc = await client.fetch(query, { slug });

  if (post.type === "image" && !post.images) return notFound();
  if (post.type === "video" && !post.videos) return notFound();

  return (
    <>
      <main className="mb-4 lg:hidden">
        {post.type === "image" ? (
          <ImageStack slides={generateSlides(post.images!)} name={post.title} />
        ) : (
          <VideoStack videos={post.videos!} />
        )}
      </main>

      <main className="hidden h-full w-full lg:block">
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
};

export default Page;
