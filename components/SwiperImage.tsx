"use client";

import urlFor from "@/lib/urlFor";

type Props = {
  image: ImageType;
  altText: string;
  alignment?: "start" | "center" | "end";
};

export default function SwiperImage({
  image,
  altText,
  alignment = "center",
}: Props) {
  const justifyContent =
    alignment === "start"
      ? "flex-start"
      : alignment === "end"
        ? "flex-end"
        : "center";

  return (
    <div
      className="relative flex h-full w-full items-center"
      style={{ justifyContent }}
    >
      <img
        src={urlFor(image).url()}
        alt={altText}
        className="max-h-full max-w-full"
      />
    </div>
  );
}
