import { groq } from "next-sanity";

import ModelsList from "@/components/ModelsList";
import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && category == "main-board" && hidden == false] | order(name asc)
`;

export const dynamic = "force-dynamic";

export default async function Page() {
  const models: ModelDoc[] = await readClient.fetch(query);

  return (
    <main className="flex-1 self-start p-4 lg:p-8 lg:pl-0">
      {models.length === 0 && <p className="brand-text">No models found.</p>}

      {models.length > 0 && <ModelsList models={models} />}
    </main>
  );
}
