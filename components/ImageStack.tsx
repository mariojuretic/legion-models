"use client";

import { useLayoutEffect, useRef, useState } from "react";

import urlFor from "@/lib/urlFor";
import Image from "next/image";

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
    const resizeHandler = () => {
      if (!containerRef.current) return;

      setContainerWidth(containerRef.current.clientWidth);
    };

    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useLayoutEffect(() => {
    if (!containerWidth) return;

    const resizedImages = slides.flat().map((image) => {
      if (!image.dimensions) return image;

      const newDimensions = { ...image.dimensions };

      // Limit image width...
      if (newDimensions.width > containerWidth) {
        const resizeFactor = containerWidth / newDimensions.width;
        newDimensions.width = Math.floor(newDimensions.width * resizeFactor);
        newDimensions.height = Math.floor(newDimensions.height * resizeFactor);
      }

      // Limit image height...
      if (newDimensions.height > containerWidth) {
        const resizeFactor = containerWidth / newDimensions.height;
        newDimensions.width = Math.floor(newDimensions.width * resizeFactor);
        newDimensions.height = Math.floor(newDimensions.height * resizeFactor);
      }

      return { ...image, dimensions: newDimensions };
    });

    setImages(resizedImages);
  }, [containerWidth, slides]);

  return (
    <div className="p-4">
      <div ref={containerRef} className="flex flex-col items-center gap-4">
        {containerWidth &&
          images &&
          images.map((image) => (
            <div key={image.asset._ref}>
              <Image
                src={urlFor(image).url()}
                alt={name}
                width={image.dimensions?.width}
                height={image.dimensions?.height}
                priority
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
