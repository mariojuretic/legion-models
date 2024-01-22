import Link from "next/link";
import { groq } from "next-sanity";

import ModelsList from "@/components/ModelsList";
import { readClient } from "@/lib/sanity.client";

const modelsQuery = groq`
  *[_type == "model" && category == "development" && hidden == false] | order(name asc)
`;

export const dynamic = "force-dynamic";

export default async function Page() {
  const models: ModelDoc[] = await readClient.fetch(modelsQuery);

  if (models && models.length > 0) {
    return (
      <main className="flex-1 self-start p-4 lg:p-8 lg:pl-0">
        <ModelsList models={models} />
      </main>
    );
  }

  const developmentQuery = groq`
    *[_type == "development"][0]
  `;

  const development: DevelopmentPage = await readClient.fetch(developmentQuery);

  return (
    <main className="flex flex-1 items-center justify-center p-4 lg:p-8 lg:pl-0">
      <div className="brand-text max-w-[100ch] whitespace-pre-line text-center">
        <p>
          {development.message}
          <br />
          <br />
          <Link href={`mailto:${process.env.SENDGRID_RECIPIENT}`}>
            {process.env.SENDGRID_RECIPIENT}
          </Link>
        </p>
      </div>
    </main>
  );
}
