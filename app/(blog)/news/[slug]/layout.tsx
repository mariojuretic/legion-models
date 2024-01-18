import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

const query = groq`
  *[_type == "news" && slug.current == $slug][0]
`;

export const dynamic = "force-dynamic";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const post: NewsDoc = await client.fetch(query, { slug });

  if (!post) {
    return notFound();
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col lg:block lg:h-screen lg:min-h-0 lg:w-screen lg:pl-60">
      <div className="brand-text flex flex-col lg:fixed lg:bottom-0 lg:left-0 lg:top-0 lg:w-60 lg:justify-between">
        <Link href="/news" className="self-end p-4 lg:hidden">
          <XMarkIcon className="h-5 w-5" />
        </Link>

        <div className="hidden p-8 lg:block">
          <Link href="/news">Close</Link>
        </div>

        {post.details && (
          <div className="whitespace-pre-line p-4 lg:p-8">
            <p className="text-center lg:text-left">{post.details}</p>
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

export default Layout;
