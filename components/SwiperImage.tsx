"use client";

import { useEffect, useRef, useState } from "react";

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
  const imgRef = useRef<HTMLImageElement>(null);

  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    if (!image.source) return;

    const handleResize = () => {
      if (!imgRef.current) return;

      const { offsetTop, offsetHeight, offsetLeft, offsetWidth } =
        imgRef.current;

      setPosition({
        top: offsetTop + offsetHeight,
        left: offsetLeft,
        width: offsetWidth,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [image.source]);

  const justifyContent =
    alignment === "start"
      ? "flex-start"
      : alignment === "end"
        ? "flex-end"
        : "center";

  return (
    <div
      className="relative flex h-full w-full items-center"
      style={{ justifyContent, paddingBottom: image.source ? 13 : 0 }}
    >
      <img
        ref={imgRef}
        src={urlFor(image).url()}
        alt={image.alt || altText}
        className="max-h-full max-w-full"
      />

      {image.source && position && (
        <span
          className="brand-text absolute hidden bg-white text-right dark:bg-black lg:block"
          style={{ ...position }}
        >
          {image.source}
        </span>
      )}
    </div>
  );
}
