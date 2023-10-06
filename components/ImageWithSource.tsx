"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

import urlFor from "@/lib/urlFor";

export default function ImageWithSource({ image }: { image: ImageType }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState<number>();
  const [containerHeight, setContainerHeight] = useState<number>();
  const [containerAspectRatio, setContainerAspectRatio] = useState<number>();

  const [renderedImageWidth, setRenderedImageWidth] = useState<number>();
  const [renderedImageHeight, setRenderedImageHeight] = useState<number>();

  const [translateX, setTranslateX] = useState<number>();
  const [translateY, setTranslateY] = useState<number>();

  useEffect(() => {
    if (!image.source) return;

    const windowResizeHandler = () => {
      if (!containerRef.current) return;
      setContainerWidth(containerRef.current.clientWidth);
      setContainerHeight(containerRef.current.clientHeight);
      setContainerAspectRatio(
        containerRef.current.clientWidth / containerRef.current.clientHeight,
      );
    };

    windowResizeHandler();
    window.addEventListener("resize", windowResizeHandler);

    return () => {
      window.removeEventListener("resize", windowResizeHandler);
    };
  }, [image.source]);

  useEffect(() => {
    if (!image.source) return;

    if (!containerWidth || !containerHeight || !containerAspectRatio) return;
    if (!image.dimensions) return;

    if (image.dimensions.aspectRatio === containerAspectRatio) {
      setRenderedImageWidth(containerWidth);
      setRenderedImageHeight(containerHeight);
    } else if (image.dimensions.aspectRatio > containerAspectRatio) {
      setRenderedImageWidth(containerWidth);
      setRenderedImageHeight(containerWidth / image.dimensions.aspectRatio);
    } else if (image.dimensions.aspectRatio < containerAspectRatio) {
      setRenderedImageWidth(containerHeight * image.dimensions.aspectRatio);
      setRenderedImageHeight(containerHeight);
    }
  }, [
    image.source,
    containerWidth,
    containerHeight,
    containerAspectRatio,
    image.dimensions,
  ]);

  useEffect(() => {
    if (!image.source) return;

    if (!containerWidth || !containerHeight) return;
    if (!renderedImageWidth || !renderedImageHeight) return;

    setTranslateX(
      renderedImageWidth + (containerWidth - renderedImageWidth) / 2,
    );
    setTranslateY(
      renderedImageHeight + (containerHeight - renderedImageHeight) / 2,
    );
  }, [
    image.source,
    containerWidth,
    containerHeight,
    renderedImageWidth,
    renderedImageHeight,
  ]);

  return (
    <div ref={containerRef} className="relative mb-[15px] flex-1">
      <Image
        src={urlFor(image).url()}
        alt=""
        fill
        className="object-contain object-center"
      />

      {image.source && (
        <p
          className={`brand-text absolute -translate-x-full whitespace-nowrap text-right ${
            translateX && translateY ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: translateX + "px", top: translateY + "px" }}
        >
          {image.source}
        </p>
      )}
    </div>
  );
}
