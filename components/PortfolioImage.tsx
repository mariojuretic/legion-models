"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import urlFor from "@/lib/urlFor";

export default function PortfolioImage({
  image,
  name,
  alignment,
}: {
  image: ImageType;
  name: string;
  alignment: "start" | "center" | "end";
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [imageWidth, setImageWidth] = useState<number>();
  const [imageHeight, setImageHeight] = useState<number>();

  useEffect(() => {
    if (!containerRef.current || !image.dimensions) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight - 12;

    let renderedImageWidth = image.dimensions.width;
    let renderedImageHeight = image.dimensions.height;

    // Limit image width...
    if (renderedImageWidth > containerWidth) {
      const resizeFactor = containerWidth / renderedImageWidth;
      renderedImageWidth = Math.floor(renderedImageWidth * resizeFactor);
      renderedImageHeight = Math.floor(renderedImageHeight * resizeFactor);
    }

    // Limit image height...
    if (renderedImageHeight > containerHeight) {
      const resizeFactor = containerHeight / renderedImageHeight;
      renderedImageWidth = Math.floor(renderedImageWidth * resizeFactor);
      renderedImageHeight = Math.floor(renderedImageHeight * resizeFactor);
    }

    setImageWidth(renderedImageWidth);
    setImageHeight(renderedImageHeight);
  }, [image.dimensions, image.source]);

  const alignItems =
    alignment === "start"
      ? "flex-start"
      : alignment === "center"
      ? "center"
      : "flex-end";

  return (
    <div
      ref={containerRef}
      className={`flex flex-1 flex-col justify-center`}
      style={{ alignItems }}
    >
      {imageWidth && imageHeight && (
        <Image
          src={urlFor(image).url()}
          alt={name}
          width={imageWidth}
          height={imageHeight}
        />
      )}

      {image.source && imageWidth && imageHeight && (
        <p className="brand-text text-right" style={{ width: imageWidth }}>
          {image.source}
        </p>
      )}
    </div>
  );
}
