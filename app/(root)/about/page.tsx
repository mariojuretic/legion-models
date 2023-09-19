import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "about"][0]
`;

export default async function Page() {
  const about: AboutSingleton = await client.fetch(query);

  return (
    <div className="flex grow items-center justify-center">
      <p className="max-w-[100ch]">{about.content}</p>
    </div>
  );
}