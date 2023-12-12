"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import PortfolioImage from "./PortfolioImage";

export default function ImageSlider({
  slides,
  name,
}: {
  slides: ImageType[][];
  name: string;
}) {
  const [page, setPage] = useState(1);

  const currentSlide = slides[page - 1];

  const nextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const prevPage = () => {
    setPage((currentPage) => currentPage - 1);
  };

  return (
    <>
      <button
        className="shrink-0 p-8 text-white enabled:hover:text-black dark:text-black dark:enabled:hover:text-white"
        onClick={prevPage}
        disabled={page <= 1}
      >
        <ChevronLeftIcon className="h-10 w-10" />
      </button>

      <div className="grid flex-1 grid-cols-2 gap-x-8 p-8">
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
      </div>

      <button
        className="shrink-0 p-8 text-white enabled:hover:text-black dark:text-black dark:enabled:hover:text-white"
        onClick={nextPage}
        disabled={page >= slides.length}
      >
        <ChevronRightIcon className="h-10 w-10" />
      </button>
    </>
  );
}
