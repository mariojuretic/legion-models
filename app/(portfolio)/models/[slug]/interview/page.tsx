import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && slug.current == $slug][0]
`;

export const dynamic = "force-dynamic";

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const model: ModelDoc = await client.fetch(query, { slug });

  if (!model.interview) {
    return notFound();
  }

  return (
    <main className="flex flex-1 items-center justify-center p-4 lg:h-full lg:w-full lg:flex-initial lg:p-8">
      <div className="brand-text max-w-[125ch] whitespace-pre-line">
        <p>{model.interview}</p>
      </div>
    </main>
  );
};

export default Page;
