import { groq } from "next-sanity";

import ModelsList from "@/components/ModelsList";
import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && category == "models" && hidden == false]
`;

export default async function Page() {
  const models: ModelDoc[] = await client.fetch(query);

  return (
    <main className="grow self-start p-4 lg:p-8">
      <div className="text-xs font-light uppercase tracking-widest lg:text-sm">
        {models.length === 0 && <p>No models found.</p>}

        {models.length > 0 && <ModelsList models={models} />}
      </div>
    </main>
  );
}
