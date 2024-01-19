import { type Transaction, groq } from "next-sanity";

import { writeClient } from "@/lib/sanity.client";

const query = groq`
  *[_type in ["sanity.imageAsset", "sanity.fileAsset"]] {
    _id,
    "refs": count(*[references(^._id)])
  }[refs == 0]._id
`;

writeClient
  .fetch(query)
  .then((ids: string[]) => {
    if (!ids || ids.length === 0) {
      console.log("No assets to delete.");
      return;
    }

    console.log(`Deleting ${ids.length} assets...`);

    return ids
      .reduce(
        (trx: Transaction, id: string) => trx.delete(id),
        writeClient.transaction(),
      )
      .commit();
  })
  .then(() => console.log("Done!"))
  .catch((err: Error) => {
    if (err.message.includes("Insufficient permissions")) {
      console.log(err.message);
      console.log(`Did you forget to pass "--with-user-token"?`);
    } else {
      console.log(err.stack);
    }
  });
