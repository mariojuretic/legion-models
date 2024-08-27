import Image from "next/image";
import { groq } from "next-sanity";

import Redirect from "@/components/Redirect";
import LandingPageVideo from "@/components/LandingPageVideo";
import { readClient } from "@/lib/sanity.client";
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
  const settings: SiteSettings = await readClient.fetch(settingsQuery);

  const contentType = settings.landingPageContentType;
  const redirectTimeout = settings.landingPageRedirectMilliseconds;

  const allHeros: HeroDoc[] = await readClient.fetch(heroQuery, {
    contentTypes: contentType === "random" ? ["image", "video"] : [contentType],
  });

  const randomHero = allHeros[Math.floor(Math.random() * allHeros.length)];

  return (
    <Redirect redirectTimeout={randomHero ? redirectTimeout : 0}>
      <div className="relative h-svh w-screen overflow-hidden">
        {randomHero && randomHero.media === "image" && randomHero.image && (
          <Image
            src={urlFor(randomHero.image).url()}
            alt={randomHero.image.alt || ""}
            className="object-cover object-center"
            fill
            priority
          />
        )}

        {randomHero && randomHero.media === "video" && randomHero.video && (
          <LandingPageVideo playbackId={randomHero.video.playbackId} />
        )}
      </div>
    </Redirect>
  );
};

export default Page;
