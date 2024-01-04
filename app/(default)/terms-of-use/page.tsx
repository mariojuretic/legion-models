import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "termsOfUse"][0]
`;

export const dynamic = "force-dynamic";

export default async function Page() {
  const termsOfUse: TermsOfUsePage = await client.fetch(query);

  return (
    <main className="flex flex-1 items-center justify-center p-4 lg:p-8 lg:pl-0">
      <div className="brand-text max-w-[125ch] whitespace-pre-line">
        <p>{termsOfUse.content}</p>
      </div>
    </main>
  );
}
