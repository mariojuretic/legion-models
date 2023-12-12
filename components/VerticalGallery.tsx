"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import urlFor from "@/lib/urlFor";

export default function VerticalGallery({
  slides,
  name,
}: {
  slides: ImageType[][];
  name: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<ImageType[]>();

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth - 32;

    const renderedImages = slides.flat();

    for (const image of renderedImages) {
      if (!image.dimensions) return;

      let renderedImageWidth = image.dimensions.width;
      let renderedImageHeight = image.dimensions.height;

      // Limit image width...
      if (renderedImageWidth > containerWidth) {
        const resizeFactor = containerWidth / renderedImageWidth;
        renderedImageWidth = Math.floor(renderedImageWidth * resizeFactor);
        renderedImageHeight = Math.floor(renderedImageHeight * resizeFactor);
      }

      // Limit image height...
      if (renderedImageHeight > containerWidth) {
        const resizeFactor = containerWidth / renderedImageHeight;
        renderedImageWidth = Math.floor(renderedImageWidth * resizeFactor);
        renderedImageHeight = Math.floor(renderedImageHeight * resizeFactor);
      }

      image.dimensions.width = renderedImageWidth;
      image.dimensions.height = renderedImageHeight;
    }

    setImages(renderedImages);
  }, [slides]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-y-4 p-4">
      {images &&
        images.map((image) => (
          <div key={image.asset._ref}>
            <Image
              src={urlFor(image).url()}
              alt={name}
              width={image.dimensions?.width}
              height={image.dimensions?.width}
            />

            {image.source && (
              <p className="brand-text text-right">{image.source}</p>
            )}
          </div>
        ))}
    </div>
  );
}
