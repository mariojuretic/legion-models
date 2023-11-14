import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "privacyPolicy"][0]
`;

export const dynamic = "force-dynamic";

export default async function Page() {
  const privacyPolicy: PrivacyPolicyPage = await client.fetch(query);

  return (
    <main className="flex flex-1 items-center justify-center p-4 lg:p-8">
      <div className="brand-text max-w-[100ch] whitespace-pre-line">
        <p>{privacyPolicy.content}</p>
      </div>
    </main>
  );
}