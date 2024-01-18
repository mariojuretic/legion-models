"use client";

import { useLayoutEffect, useRef, useState } from "react";

import urlFor from "@/lib/urlFor";

const CustomImage = ({
  image,
  name,
  alignment = "center",
}: {
  image: ImageType;
  name: string;
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

    let updatedImageWidth = image.dimensions.width;
    let updatedImageHeight = image.dimensions.height;

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
          <img
            src={urlFor(image).url()}
            alt={name}
            style={{ width: imageWidth, height: imageHeight }}
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
              }}
            >
              {image.source}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CustomImage;
