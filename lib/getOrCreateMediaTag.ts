import { groq } from "next-sanity";

import { writeClient } from "./sanity.client";

const query = groq`
  *[_type == "media.tag" && name.current == $slug][0]
`;

async function getOrCreateMediaTag(tagSlug: string): Promise<string> {
  const existing = await writeClient.fetch<MediaTagDoc | null>(query, {
    slug: tagSlug,
  });

  if (existing?._id) return existing._id;

  const newTag: Pick<MediaTagDoc, "_type" | "name"> = {
    _type: "media.tag",
    name: { _type: "slug", current: tagSlug },
  };

  const created = await writeClient.create(newTag);
  return created._id;
}

export default getOrCreateMediaTag;
