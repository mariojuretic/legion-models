import Image from "next/image";
import { groq } from "next-sanity";

import Redirect from "@/components/Redirect";
import urlFor from "@/lib/urlFor";
import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "hero"]
`;

export const dynamic = "force-dynamic";

export default async function Page() {
  const allHeros: HeroDoc[] = await client.fetch(query);
  const randomHero = allHeros[Math.floor(Math.random() * allHeros.length)];

  return (
    <Redirect>
      <div className="relative h-[100svh] w-full overflow-hidden">
        <Image
          src={urlFor(randomHero.image!).url()}
          alt="LEGION MODEL MANAGEMENT"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
    </Redirect>
  );
}
