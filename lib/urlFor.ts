import imageUrlBuilder from "@sanity/image-url";

import { client } from "./sanity.client";

const builder = imageUrlBuilder(client);

export default function urlFor(source: ImageType) {
  return builder.image(source);
}
