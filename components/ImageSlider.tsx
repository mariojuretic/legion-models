"use client";

import { useState } from "react";

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
  const [page, setPage] = useState(1);

  const currentSlide = slides[page - 1];

  const nextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const prevPage = () => {
    setPage((currentPage) => currentPage - 1);
  };

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

      {page > 1 && (
        <div
          className="hover:cursor-chevron-left-black dark:hover:cursor-chevron-left-white absolute left-0 top-0 h-full w-1/2"
          onClick={prevPage}
        />
      )}

      {page < slides.length && (
        <div
          className="hover:cursor-chevron-right-black dark:hover:cursor-chevron-right-white absolute right-0 top-0 h-full w-1/2"
          onClick={nextPage}
        />
      )}
    </div>
  );
}
