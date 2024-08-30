import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

import ImageStack from "@/components/ImageStack";
import SwiperImageSlider from "@/components/SwiperImageSlider";
import VideoSlider from "@/components/VideoSlider";
import VideoStack from "@/components/VideoStack";
import generateSlides from "@/lib/generateSlides";
import { readClient } from "@/lib/sanity.client";

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

export async function generateMetadata(
  { params: { slug } }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "news" && slug.current == $slug][0]{ seo }`;

  const { seo }: NewsDoc = await readClient.fetch(q, { slug });

  const title = seo?.title || (await parent).title;
  const description = seo?.description || (await parent).description;

  return { title, description };
}

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post: NewsDoc = await readClient.fetch(query, { slug });

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
          <div className="h-svh w-[calc(100vw-240px)]">
            <SwiperImageSlider
              slides={generateSlides(post.images!)}
              imagesAltText={post.title}
              addVerticalPadding
            />
          </div>
        ) : (
          <VideoSlider videos={post.videos!} withPadding />
        )}
      </main>
    </>
  );
};

export default Page;
