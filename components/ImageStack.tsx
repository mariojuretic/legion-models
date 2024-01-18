"use client";

import { useLayoutEffect, useRef, useState } from "react";

import urlFor from "@/lib/urlFor";

const ImageStack = ({
  slides,
  name,
}: {
  slides: ImageType[][];
  name: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState<number>();

  const [images, setImages] = useState<ImageType[]>();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    setContainerWidth(containerRef.current.clientWidth);
  }, []);

  useLayoutEffect(() => {
    if (!containerWidth) return;

    const flattenedImages = slides.flat();

    for (const image of flattenedImages) {
      if (!image.dimensions) return;

      // Limit image width...
      if (image.dimensions.width > containerWidth) {
        const resizeFactor = containerWidth / image.dimensions.width;
        image.dimensions.width = Math.floor(
          image.dimensions.width * resizeFactor,
        );
        image.dimensions.height = Math.floor(
          image.dimensions.height * resizeFactor,
        );
      }

      // Limit image height...
      if (image.dimensions.height > containerWidth) {
        const resizeFactor = containerWidth / image.dimensions.height;
        image.dimensions.width = Math.floor(
          image.dimensions.width * resizeFactor,
        );
        image.dimensions.height = Math.floor(
          image.dimensions.height * resizeFactor,
        );
      }
    }

    setImages(flattenedImages);
  }, [containerWidth, slides]);

  return (
    <div className="p-4">
      <div ref={containerRef} className="flex flex-col items-center gap-4">
        {containerWidth &&
          images &&
          images.map((image) => (
            <div key={image.asset._ref}>
              <img
                src={urlFor(image).url()}
                alt={name}
                width={image.dimensions?.width}
                height={image.dimensions?.height}
              />

              {image.source && (
                <p className="brand-text text-right">{image.source}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageStack;
