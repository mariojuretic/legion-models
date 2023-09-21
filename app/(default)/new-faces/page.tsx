import { groq } from "next-sanity";

import ModelsList from "@/components/ModelsList";
import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && category == "new-faces" && hidden == false] | order(name asc)
`;

export default async function Page() {
  const models: ModelDocument[] = await client.fetch(query);

  return (
    <main className="grow self-start p-8">
      <div className="text-sm font-light uppercase tracking-widest">
        {models.length === 0 && <p>No models found.</p>}

        {models.length > 0 && <ModelsList models={models} />}
      </div>
    </main>
  );
}
