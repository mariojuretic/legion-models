"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import urlFor from "@/lib/urlFor";
import normalizeString from "@/lib/normalizeString";
import { useSearchStore } from "@/store/SearchStore";

function ModelCard({ model }: { model: ModelDoc }) {
  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const indexOfPackages = pathSegments.indexOf("packages");

  let href = `/models/${model.slug.current}`;

  if (indexOfPackages >= 0) {
    href = `${href}?source=${pathSegments[indexOfPackages + 1]}`;
  }

  return (
    <li>
      <Link href={href} className="group flex flex-col gap-y-2">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 transition-colors duration-300 group-hover:bg-neutral-200 dark:bg-neutral-900 dark:group-hover:bg-neutral-800">
          {model.thumbnail?.default && (
            <Image
              src={urlFor(model.thumbnail.default).url()}
              alt={model.thumbnail.default.alt || model.name}
              fill
              priority
              sizes="(max-width: 639px) 296px, (max-width: 767px) 360px, (max-width: 1023px) 320px, (max-width: 1279px) 325px, (max-width: 1535px) 304px, 20vw"
              className={`z-20 object-cover object-center ${
                !model.thumbnail.hover
                  ? "scale-100 transition-transform duration-300 group-hover:scale-105"
                  : "opacity-100 transition-opacity duration-300 group-hover:opacity-0"
              }`}
            />
          )}

          {model.thumbnail?.default && model.thumbnail.hover && (
            <Image
              src={urlFor(model.thumbnail.hover).url()}
              alt={model.thumbnail.hover.alt || model.name}
              fill
              priority
              sizes="(max-width: 639px) 296px, (max-width: 767px) 360px, (max-width: 1023px) 320px, (max-width: 1279px) 325px, (max-width: 1535px) 304px, 20vw"
              className="z-10 object-cover object-center opacity-0 group-hover:opacity-100"
            />
          )}
        </div>

        <p className="brand-text text-center">{model.name}</p>
      </Link>
    </li>
  );
}

export default function ModelsList({
  models,
  filter,
}: {
  models: ModelDoc[];
  filter: "main-board" | "development" | null;
}) {
  const searchTerm = useSearchStore((state) => state.searchTerm);

  let filteredModels;

  if (searchTerm === "" && filter !== null) {
    filteredModels = models.filter((model) => model.category === filter);
  } else {
    filteredModels = models.filter((model) =>
      normalizeString(model.name).includes(normalizeString(searchTerm)),
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
      {filteredModels.map((model) => (
        <ModelCard key={model._id} model={model} />
      ))}
    </ul>
  );
}
