"use client";

import Link from "next/link";
import Image from "next/image";

import urlFor from "@/lib/urlFor";
import normalizeString from "@/lib/normalizeString";
import { useSearchStore } from "@/store/SearchStore";

function ModelCard({ model }: { model: ModelDoc }) {
  return (
    <li>
      <Link
        href={`/models/${model.slug.current}`}
        className="group flex flex-col gap-y-2"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 transition-colors duration-300 group-hover:bg-neutral-200 dark:bg-neutral-900 dark:group-hover:bg-neutral-800">
          {model.thumbnail?.default && (
            <Image
              src={urlFor(model.thumbnail.default).url()}
              alt={model.name}
              fill
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
              alt={model.name}
              fill
              className="z-10 object-cover object-center"
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
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {filteredModels.map((model) => (
        <ModelCard key={model._id} model={model} />
      ))}
    </ul>
  );
}
