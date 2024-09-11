import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import Link from "next/link";

import ModelsList from "@/components/ModelsList";
import { readClient } from "@/lib/sanity.client";

const modelsQuery = groq`
  *[_type == "model" && hidden == false] | order(name asc)
`;

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const q = groq`*[_type == "development"][0]{ seo }`;

  const { seo }: DevelopmentPage = await readClient.fetch(q);

  const title = seo?.title || (await parent).title || undefined;
  const description =
    seo?.description || (await parent).description || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Page() {
  const models: ModelDoc[] = await readClient.fetch(modelsQuery);

  if (models.filter((model) => model.category === "development").length > 0) {
    return (
      <main className="flex-1 self-start p-4 lg:p-8 lg:pl-0">
        <ModelsList models={models} filter="development" />
      </main>
    );
  }

  const developmentQuery = groq`
    *[_type == "development"][0]
  `;

  const development: DevelopmentPage = await readClient.fetch(developmentQuery);

  return (
    <main className="flex flex-1 items-center justify-center p-4 lg:p-8 lg:pl-0">
      <div className="brand-text flex max-w-[100ch] flex-col items-center gap-2 whitespace-pre-line text-center">
        <p>{development.message}</p>
        <p>
          <Link href={`mailto:${process.env.SENDGRID_RECIPIENT}`}>
            {process.env.SENDGRID_RECIPIENT}
          </Link>
        </p>
      </div>
    </main>
  );
}
