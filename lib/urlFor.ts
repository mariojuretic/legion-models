import imageUrlBuilder from "@sanity/image-url";

import { readClient } from "./sanity.client";

const builder = imageUrlBuilder(readClient);

export default function urlFor(source: ImageType) {
  return builder.image(source);
}
