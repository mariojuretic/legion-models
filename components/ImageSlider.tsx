"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import CustomImage from "./CustomImage";

const ImageSlider = ({
  slides,
  name,
  withPadding = false,
}: {
  slides: ImageType[][];
  name: string;
  withPadding?: boolean;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<number | null>();

  const createUrlString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useLayoutEffect(() => {
    const existingPageParam = searchParams.get("page");

    if (!existingPageParam) {
      router.push(pathname + "?" + createUrlString("page", "1"));
    } else {
      setCurrentPage(Number(existingPageParam));
    }
  }, [searchParams, router, pathname, createUrlString]);

  const nextPageHandler = useCallback(() => {
    if (!currentPage || currentPage >= slides.length) return;

    const nextPage = currentPage + 1;
    router.push(pathname + "?" + createUrlString("page", nextPage.toString()));
  }, [currentPage, slides.length, router, pathname, createUrlString]);

  const prevPageHandler = useCallback(() => {
    if (!currentPage || currentPage <= 1) return;

    const prevPage = currentPage - 1;
    router.push(pathname + "?" + createUrlString("page", prevPage.toString()));
  }, [currentPage, router, pathname, createUrlString]);

  useLayoutEffect(() => {
    const keydownHandler = (ev: KeyboardEvent) => {
      if (ev.code === "ArrowRight") {
        nextPageHandler();
      }

      if (ev.code === "ArrowLeft") {
        prevPageHandler();
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => document.removeEventListener("keydown", keydownHandler);
  }, [nextPageHandler, prevPageHandler]);

  if (!currentPage) return null;

  const currentSlide = slides[currentPage - 1];

  return (
    <div className={`relative h-full w-full ${withPadding ? "p-8" : "px-8"}`}>
      {currentSlide.length === 1 && (
        <div className="h-full w-full pb-[13px]">
          <CustomImage image={currentSlide[0]} name={name} />
        </div>
      )}

      {currentSlide.length === 2 && (
        <>
          <div className="inline-block h-full w-1/2 pb-[13px] pr-2">
            <CustomImage image={currentSlide[0]} name={name} alignment="end" />
          </div>

          <div className="inline-block h-full w-1/2 pb-[13px] pl-2">
            <CustomImage
              image={currentSlide[1]}
              name={name}
              alignment="start"
            />
          </div>
        </>
      )}

      {currentPage > 1 && (
        <div
          className="hover:cursor-chevron-left-black dark:hover:cursor-chevron-left-white absolute left-0 top-0 h-full w-1/2"
          onClick={prevPageHandler}
        />
      )}

      {currentPage < slides.length && (
        <div
          className="hover:cursor-chevron-right-black dark:hover:cursor-chevron-right-white absolute right-0 top-0 h-full w-1/2"
          onClick={nextPageHandler}
        />
      )}
    </div>
  );
};

export default ImageSlider;
