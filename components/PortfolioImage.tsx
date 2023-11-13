"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import urlFor from "@/lib/urlFor";

export default function PortfolioImage({
  image,
  name,
}: {
  image: ImageType;
  name: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [imageWidth, setImageWidth] = useState<number>();
  const [imageHeight, setImageHeight] = useState<number>();

  useEffect(() => {
    if (!containerRef.current || !image.dimensions) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = image.source
      ? containerRef.current.clientHeight - 12
      : containerRef.current.clientHeight;

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

  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col items-center justify-center"
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
