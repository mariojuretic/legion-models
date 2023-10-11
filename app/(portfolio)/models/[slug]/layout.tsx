import { groq } from "next-sanity";

import CloseModel from "@/components/CloseModel";
import ModelTabs from "@/components/ModelTabs";
import { client } from "@/lib/sanity.client";

export const revalidate = 120;
export const dynamicParams = false;

export async function generateStaticParams() {
  const query = groq`
    *[_type == "model" && hidden == false]
  `;

  const models: ModelDoc[] = await client.fetch(query);

  return models.map((model) => ({ slug: model.slug.current }));
}

export default async function Layout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const query = groq`
    *[_type == "model" && slug.current == $slug][0]
  `;

  const model: ModelDoc = await client.fetch(query, { slug });

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <CloseModel category={model.category} />
      <div className="flex flex-1 flex-col">
        <h2 className="brand-text p-4 text-center lg:hidden">{model.name}</h2>
        {children}
      </div>
      <ModelTabs model={model} />
    </div>
  );
}
