import Link from "next/link";
import Image from "next/image";

import urlFor from "@/lib/urlFor";

function NewsCard({ newsData }: { newsData: NewsDoc }) {
  return (
    <li>
      <Link
        href={`/news/${newsData.slug.current}`}
        className="group flex flex-col gap-y-2"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 transition-colors duration-300 group-hover:bg-neutral-200 dark:bg-neutral-900 dark:group-hover:bg-neutral-800">
          {newsData.thumbnail?.default && (
            <Image
              src={urlFor(newsData.thumbnail.default).url()}
              alt={newsData.title}
              fill
              className={`z-10 object-cover object-center ${
                !newsData.thumbnail.hover
                  ? "transition-transform duration-300 group-hover:scale-105"
                  : ""
              }`}
            />
          )}

          {newsData.thumbnail?.default && newsData.thumbnail.hover && (
            <Image
              src={urlFor(newsData.thumbnail.hover).url()}
              alt={newsData.title}
              fill
              className="z-20 object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </div>

        <h4 className="brand-text">{newsData.title}</h4>

        {newsData.excerpt && (
          <p className="brand-text whitespace-pre-line text-black/50 dark:text-white/50">
            {newsData.excerpt}
          </p>
        )}
      </Link>
    </li>
  );
}

export default function NewsFeed({ news }: { news: NewsDoc[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {news.map((newsData) => (
        <NewsCard key={newsData._id} newsData={newsData} />
      ))}
    </ul>
  );
}
