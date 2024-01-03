"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useTabsStore } from "@/store/TabsStore";
import generateSlides from "@/lib/generateSlides";
import urlFor from "@/lib/urlFor";

function ThumbnailsBox({
  thumbnails,
  modelName,
}: {
  thumbnails: ImageType[];
  modelName: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<ImageType[]>();

  useEffect(() => {
    if (!containerRef.current) return;

    const containerHeight = containerRef.current.clientHeight - 32;

    const slides = generateSlides(thumbnails);

    slides.forEach((slide, index) => {
      slide.forEach((image) => {
        image.sliderPage = index + 1;
      });
    });

    const renderedImages = slides.flat();

    renderedImages.forEach((image) => {
      if (!image.dimensions) return;

      let renderedImageWidth = image.dimensions.width;
      let renderedImageHeight = image.dimensions.height;

      // Limit image height...
      if (renderedImageHeight > containerHeight) {
        const resizeFactor = containerHeight / renderedImageHeight;
        renderedImageWidth = Math.floor(renderedImageWidth * resizeFactor);
        renderedImageHeight = Math.floor(renderedImageHeight * resizeFactor);
      }

      image.dimensions.width = renderedImageWidth;
      image.dimensions.height = renderedImageHeight;
    });

    setImages(renderedImages);
  }, [thumbnails]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[77px] left-0 right-0 z-50 hidden h-60 items-center gap-8 overflow-x-scroll bg-white p-8 pb-0 dark:bg-black lg:flex"
    >
      {images &&
        images.map((image) => (
          <Link
            key={image.asset._ref}
            href={
              pathname +
              "?" +
              createQueryString("page", image.sliderPage!.toString())
            }
          >
            <Image
              src={urlFor(image).url()}
              alt={modelName}
              width={image.dimensions?.width}
              height={image.dimensions?.height}
            />
          </Link>
        ))}
    </div>
  );
}

export default function Thumbnails({ modelName }: { modelName: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [thumbnailsActive, thumbnails, hideThumbnails] = useTabsStore(
    (state) => [state.thumbnailsActive, state.thumbnails, state.hideThumbnails],
  );

  useEffect(() => {
    hideThumbnails();
  }, [pathname, searchParams, hideThumbnails]);

  return thumbnailsActive && thumbnails ? (
    <ThumbnailsBox thumbnails={thumbnails} modelName={modelName} />
  ) : null;
}
