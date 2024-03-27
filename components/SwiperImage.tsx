"use client";

import Image from "next/image";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState<number>();
  const [containerHeight, setContainerHeight] = useState<number>();

  const [imageWidth, setImageWidth] = useState<number>();
  const [imageHeight, setImageHeight] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      setContainerWidth(containerRef.current.clientWidth);
      setContainerHeight(containerRef.current.clientHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerWidth || !containerHeight) return;
    if (!image.dimensions) return;

    // Upscale before scaling down to fill container...
    let newImageWidth = image.dimensions.width * 1000;
    let newImageHeight = image.dimensions.height * 1000;

    // Limit image width to container...
    if (newImageWidth > containerWidth) {
      const resizeFactor = containerWidth / newImageWidth;
      newImageWidth = Math.floor(newImageWidth * resizeFactor);
      newImageHeight = Math.floor(newImageHeight * resizeFactor);
    }

    // Limit image height to container...
    if (newImageHeight > containerHeight) {
      const resizeFactor = containerHeight / newImageHeight;
      newImageWidth = Math.floor(newImageWidth * resizeFactor);
      newImageHeight = Math.floor(newImageHeight * resizeFactor);
    }

    setImageWidth(newImageWidth);
    setImageHeight(newImageHeight);
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
            alt={altText}
            width={imageWidth}
            height={imageHeight}
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
}
