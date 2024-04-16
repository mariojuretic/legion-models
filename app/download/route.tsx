import { groq } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

import { readClient } from "@/lib/sanity.client";

const query = groq`
  *[_type == "model" && slug.current == $slug][0]
`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "Model name not provided." },
      { status: 400 },
    );
  }

  const coll = searchParams.get("coll");

  if (!coll) {
    return NextResponse.json(
      { error: "Collection name not provided" },
      { status: 400 },
    );
  }

  if (
    coll !== "campaigns" &&
    coll !== "covers" &&
    coll !== "digitals" &&
    coll !== "portfolio" &&
    coll !== "shows"
  ) {
    return NextResponse.json(
      { error: "Collection not found" },
      { status: 404 },
    );
  }

  const model: ModelDoc = await readClient.fetch(query, { slug: name });

  if (!model) {
    return NextResponse.json({ error: "Model not found." }, { status: 404 });
  }

  const collection = model[coll];

  if (!collection || collection.length === 0) {
    return NextResponse.json(
      { error: "Collection is empty." },
      { status: 404 },
    );
  }

  return NextResponse.json({ message: `Generating ${name}-${coll}.pdf` });
}
