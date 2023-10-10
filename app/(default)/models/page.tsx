import { groq } from "next-sanity";

import ModelsList from "@/components/ModelsList";
import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && category == "models" && hidden == false]
`;

export const revalidate = 120;

export default async function Page() {
  const models: ModelDoc[] = await client.fetch(query);

  return (
    <main className="flex-1 self-start p-4 lg:p-8">
      {models.length === 0 && <p className="brand-text">No models found.</p>}

      {models.length > 0 && <ModelsList models={models} />}
    </main>
  );
}
