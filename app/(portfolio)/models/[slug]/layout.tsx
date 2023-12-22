import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import CloseModel from "@/components/CloseModel";
import ModelTabs from "@/components/ModelTabs";
import Measures from "@/components/Measures";
import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && slug.current == $slug && hidden == false][0] {
    ...,
    downloads {
      portfolio {
        ...,
        "downloadUrl": asset->url
      },
      digitals {
        ...,
        "downloadUrl": asset->url
      }
    }
  }
`;

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const model: ModelDoc = await client.fetch(query, { slug });

  if (!model) {
    return notFound();
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <CloseModel category={model.category} />
      <div className="flex flex-1 flex-col">
        <h2 className="brand-text p-4 text-center lg:hidden">{model.name}</h2>
        {children}
      </div>

      {model.measures && model.measures.length > 0 && (
        <Measures measures={model.measures} />
      )}

      <ModelTabs model={model} />
    </div>
  );
}
