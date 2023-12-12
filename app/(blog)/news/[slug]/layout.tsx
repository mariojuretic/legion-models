import Link from "next/link";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "news" && slug.current == $slug][0]
`;

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const post: NewsDoc = await client.fetch(query, { slug });

  if (!post) {
    return notFound();
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col lg:flex-row">
      <div className="brand-text flex flex-col items-end lg:w-60 lg:items-stretch lg:justify-between">
        <Link href="/news" className="p-4 lg:hidden">
          <XMarkIcon className="h-5 w-5" />
        </Link>

        <div className="hidden lg:flex lg:p-8">
          <Link href="/news">Close</Link>
        </div>

        {post.details && (
          <div className="self-stretch whitespace-pre-line p-4 lg:p-8">
            <p className="text-center lg:text-left">{post.details}</p>
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
