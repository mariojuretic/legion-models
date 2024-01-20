import { groq } from "next-sanity";

import { writeClient } from "@/lib/sanity.client";

type Asset = {
  _type: "sanity.imageAsset" | "sanity.fileAsset" | "mux.videoAsset";
  _id: string;
  assetId: string;
};

const query = groq`
  *[_type in ["sanity.imageAsset", "sanity.fileAsset", "mux.videoAsset"]] {
    _type,
    _id,
    assetId,
    "refs": count(*[references(^._id)])
  }[refs == 0]{
    _type,
    _id,
    assetId
  }
`;

const deleteUnusedAssets = async () => {
  try {
    // Fetch unused assets from database
    const assets: Asset[] = await writeClient.fetch(query);

    if (!assets || assets.length === 0) {
      console.log("No assets to delete.");
      return;
    }

    console.log(`Deleting ${assets.length} assets...`);

    // Delete all assets from Sanity
    await assets
      .reduce((trx, asset) => trx.delete(asset._id), writeClient.transaction())
      .commit();

    // Delete video assets from Mux
    await Promise.all(
      assets
        .filter((asset) => asset._type === "mux.videoAsset")
        .map((asset) =>
          fetch(`https://api.mux.com/video/v1/assets/${asset.assetId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Basic " +
                btoa(
                  `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`,
                ),
            },
          }),
        ),
    );

    console.log("Done!");
  } catch (err) {
    console.log(err);
  }
};

deleteUnusedAssets();
