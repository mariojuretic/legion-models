import Link from "next/link";
import Image from "next/image";

import urlFor from "@/lib/urlFor";

function ModelCard({ model }: { model: ModelDocument }) {
  return (
    <li>
      <Link
        href={`/models/${model.slug.current}`}
        className="group flex flex-col space-y-4"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900 transition-colors group-hover:bg-neutral-800">
          {model.thumbnail?.default && (
            <Image
              src={urlFor(model.thumbnail.default).url()}
              alt={model.thumbnail.default.description || model.name}
              fill
              className={`z-10 object-cover object-center ${
                !model.thumbnail.hover
                  ? "transition-transform duration-300 group-hover:scale-105"
                  : ""
              }`}
            />
          )}

          {model.thumbnail?.default && model.thumbnail.hover && (
            <Image
              src={urlFor(model.thumbnail.hover).url()}
              alt={model.thumbnail.hover.description || model.name}
              fill
              className="z-20 object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </div>

        <p className="text-center">{model.name}</p>
      </Link>
    </li>
  );
}

export default function ModelsList({ models }: { models: ModelDocument[] }) {
  return (
    <ul className="grid grid-cols-6 gap-8 pr-16">
      {models.map((model) => (
        <ModelCard key={model._id} model={model} />
      ))}
    </ul>
  );
}
