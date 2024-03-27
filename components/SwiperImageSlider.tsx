"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperImage from "./SwiperImage";

type Props = {
  slides: ImageType[][];
  imagesAltText: string;
  addVerticalPadding?: boolean;
};

export default function SwiperImageSlider({
  slides,
  imagesAltText,
  addVerticalPadding = false,
}: Props) {
  return (
    <section className="relative h-full w-full">
      <div className={`h-full w-full ${addVerticalPadding ? "p-8" : "px-8"}`}>
        <div className="h-full w-full pb-[13px]">
          <Swiper className="h-full w-full">
            {slides.map((slide) => (
              <SwiperSlide key={slide[0].asset._ref}>
                {slide.length === 1 && (
                  <div className="grid h-full w-full grid-cols-1">
                    <div className="h-full w-full border border-red-500">
                      <SwiperImage image={slide[0]} altText={imagesAltText} />
                    </div>
                  </div>
                )}

                {slide.length === 2 && (
                  <div className="grid h-full w-full grid-cols-2 gap-x-4">
                    <div className="h-full w-full border border-green-500">
                      <SwiperImage
                        image={slide[0]}
                        altText={imagesAltText}
                        alignment="end"
                      />
                    </div>

                    <div className="h-full w-full border border-blue-500">
                      <SwiperImage
                        image={slide[1]}
                        altText={imagesAltText}
                        alignment="start"
                      />
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
