import { groq } from "next-sanity";

import { writeClient } from "./sanity.client";

const query = groq`
  *[_id == $id][0] {
    "existingTagIds": opt.media.tags[]._ref
  }
`;

async function addMediaTagsToAsset(assetId: string, tagIds: string[]) {
  // Fetch existing tag refs on this asset
  const result = await writeClient.fetch<{ existingTagIds?: string[] }>(query, {
    id: assetId,
  });

  const existingTagIds = new Set(result.existingTagIds || []);

  // Prepare only the tagIds that are not yet present
  const newTagIds = tagIds.filter((tagId) => !existingTagIds.has(tagId));

  if (!newTagIds.length) {
    // Nothing to add, skip patch entirely
    return null;
  }

  const tagRefs = newTagIds.map((tagId) => ({
    _type: "reference",
    _weak: true,
    _ref: tagId,
  }));

  return writeClient
    .patch(assetId)
    .setIfMissing({ opt: { media: { tags: [] } } })
    .append("opt.media.tags", tagRefs)
    .commit();
}

export default addMediaTagsToAsset;
