import Image from "next/image";
import { groq } from "next-sanity";

import Redirect from "@/components/Redirect";
import LandingPageVideo from "@/components/LandingPageVideo";
import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";

const settingsQuery = groq`
  *[_type == "settings"][0]
`;

const heroQuery = groq`
  *[_type == "hero" && media in $contentTypes] {
    ...,
    video {
      ...,
      "playbackId": asset->playbackId
    }
  }
`;

export const dynamic = "force-dynamic";

const Page = async () => {
  const settings: SiteSettings = await client.fetch(settingsQuery);

  const contentType = settings.landingPageContentType;
  const redirectTimeout = settings.landingPageRedirectMilliseconds;

  const allHeros: HeroDoc[] = await client.fetch(heroQuery, {
    contentTypes: contentType === "random" ? ["image", "video"] : [contentType],
  });

  const randomHero = allHeros[Math.floor(Math.random() * allHeros.length)];

  return (
    <Redirect redirectTimeout={redirectTimeout}>
      <div className="relative h-[100svh] w-screen overflow-hidden">
        {randomHero.media === "image" && randomHero.image && (
          <Image
            src={urlFor(randomHero.image).url()}
            alt="LEGION MODEL MANAGEMENT"
            className="object-cover object-center"
            fill
            priority
          />
        )}

        {randomHero.media === "video" && randomHero.video && (
          <LandingPageVideo playbackId={randomHero.video.playbackId} />
        )}
      </div>
    </Redirect>
  );
};

export default Page;
