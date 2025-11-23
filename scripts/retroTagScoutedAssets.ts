import { groq } from "next-sanity";

import getOrCreateMediaTag from "@/lib/getOrCreateMediaTag";
import { writeClient } from "@/lib/sanity.client";
import slugify from "@/lib/slugify";
import addMediaTagsToAsset from "@/lib/addMediaTagsToAsset";

type ApplicationDoc = BaseType & NewApplicationDoc;

const query = groq`
  *[_type == "application"]
`;

async function retroTagScoutedAssets() {
  const originTagId = await getOrCreateMediaTag("origin:get-scouted");

  // Fetch all applications + image asset refs
  const applications = await writeClient.fetch<ApplicationDoc[]>(query);

  for (const application of applications) {
    const fullNameSlug = slugify(application.fullName);
    const appTagId = await getOrCreateMediaTag(`application:${fullNameSlug}`);

    const assetIds = [
      application.headshot.asset._ref,
      application.profileHeadshot.asset._ref,
      application.halfBodyShot.asset._ref,
      application.fullBodyShot.asset._ref,
    ].filter(Boolean) as string[];

    if (!assetIds.length) continue;

    for (const assetId of assetIds) {
      try {
        await addMediaTagsToAsset(assetId, [originTagId, appTagId]);
        console.log(`Tagged asset ${assetId} for application ${fullNameSlug}`);
      } catch (err) {
        console.error(`Failed to tag asset ${assetId}`, err);
      }
    }
  }
}

retroTagScoutedAssets()
  .then(() => {
    console.log("Done retro-tagging assets");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
