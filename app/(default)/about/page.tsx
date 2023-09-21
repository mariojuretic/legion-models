import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "about"][0]
`;

export default async function Page() {
  const about: AboutSingleton = await client.fetch(query);

  return (
    <main className="flex grow items-center p-4 lg:justify-center lg:p-8">
      <div className="w-full max-w-[100ch] whitespace-pre-line text-xs font-light uppercase tracking-widest lg:text-sm">
        <p>{about.content}</p>
      </div>
    </main>
  );
}
