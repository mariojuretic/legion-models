export { metadata } from "next-sanity/studio/metadata";

import Studio from "@/components/Studio";

export const dynamic = "force-static";

export default function Page() {
  return <Studio />;
}
