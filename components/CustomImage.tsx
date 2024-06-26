"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

import urlFor from "@/lib/urlFor";

const CustomImage = ({
  image,
  name,
  isLoading,
  onImageLoaded,
  alignment = "center",
}: {
  image: ImageType;
  name: string;
  isLoading: boolean;
  onImageLoaded: () => void;
  alignment?: "start" | "center" | "end";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState<number>();
  const [containerHeight, setContainerHeight] = useState<number>();

  const [imageWidth, setImageWidth] = useState<number>();
  const [imageHeight, setImageHeight] = useState<number>();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    setContainerWidth(containerRef.current.clientWidth);
    setContainerHeight(containerRef.current.clientHeight);
  }, []);

  useLayoutEffect(() => {
    const resizeHandler = () => {
      if (!containerRef.current) return;

      setContainerWidth(containerRef.current.clientWidth);
      setContainerHeight(containerRef.current.clientHeight);
    };

    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useLayoutEffect(() => {
    if (!containerWidth || !containerHeight) return;
    if (!image.dimensions) return;

    // Upscale before scaling down to fill container...
    let updatedImageWidth = image.dimensions.width * 1000;
    let updatedImageHeight = image.dimensions.height * 1000;

    // Limit image width...
    if (updatedImageWidth > containerWidth) {
      const resizeFactor = containerWidth / updatedImageWidth;
      updatedImageWidth = Math.floor(updatedImageWidth * resizeFactor);
      updatedImageHeight = Math.floor(updatedImageHeight * resizeFactor);
    }

    // Limit image height...
    if (updatedImageHeight > containerHeight) {
      const resizeFactor = containerHeight / updatedImageHeight;
      updatedImageWidth = Math.floor(updatedImageWidth * resizeFactor);
      updatedImageHeight = Math.floor(updatedImageHeight * resizeFactor);
    }

    setImageWidth(updatedImageWidth);
    setImageHeight(updatedImageHeight);
  }, [containerWidth, containerHeight, image.dimensions]);

  const justifyContent =
    alignment === "start"
      ? "flex-start"
      : alignment === "end"
      ? "flex-end"
      : "center";

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center"
      style={{ justifyContent }}
    >
      {containerWidth && containerHeight && imageWidth && imageHeight && (
        <>
          <Image
            src={urlFor(image).url()}
            alt={name}
            width={imageWidth}
            height={imageHeight}
            priority
            onLoad={onImageLoaded}
            style={{ display: isLoading ? "none" : "block" }}
          />

          {image.source && (
            <p
              className="brand-text absolute"
              style={{
                bottom: (containerHeight - imageHeight) / 2 - 13,
                right:
                  alignment === "start"
                    ? containerWidth - imageWidth
                    : alignment === "end"
                    ? 0
                    : (containerWidth - imageWidth) / 2,
                display: isLoading ? "none" : "block",
              }}
            >
              {image.source}
            </p>
          )}

          {isLoading && (
            <div
              className="animate-pulse bg-neutral-100 dark:bg-neutral-900"
              style={{ width: imageWidth, height: imageHeight }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CustomImage;
