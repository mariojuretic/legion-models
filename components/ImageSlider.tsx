"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import PortfolioImage from "./PortfolioImage";

export default function ImageSlider({
  slides,
  name,
  withPadding = false,
}: {
  slides: ImageType[][];
  name: string;
  withPadding?: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<number | null>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const pageParam = searchParams.get("page");

    if (!pageParam) {
      router.push(pathname + "?" + createQueryString("page", "1"));
    } else {
      setCurrentPage(Number(pageParam));
    }
  }, [searchParams, router, pathname, createQueryString]);

  const nextPage = () => {
    if (!currentPage) return;
    router.push(
      pathname + "?" + createQueryString("page", (currentPage + 1).toString()),
    );
  };

  const prevPage = () => {
    if (!currentPage) return;
    router.push(
      pathname + "?" + createQueryString("page", (currentPage - 1).toString()),
    );
  };

  if (!currentPage) return null;

  const currentSlide = slides[currentPage - 1];

  return (
    <div
      className={`relative grid flex-1 grid-cols-2 gap-x-8 ${
        withPadding ? "p-8" : "px-8"
      }`}
    >
      {currentSlide.length === 1 && (
        <div className="col-span-2 flex">
          <PortfolioImage
            image={currentSlide[0]}
            name={name}
            alignment="center"
          />
        </div>
      )}

      {currentSlide.length === 2 && (
        <>
          <div className="flex">
            <PortfolioImage
              image={currentSlide[0]}
              name={name}
              alignment="end"
            />
          </div>
          <div className="flex">
            <PortfolioImage
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
          onClick={prevPage}
        />
      )}

      {currentPage < slides.length && (
        <div
          className="hover:cursor-chevron-right-black dark:hover:cursor-chevron-right-white absolute right-0 top-0 h-full w-1/2"
          onClick={nextPage}
        />
      )}
    </div>
  );
}
