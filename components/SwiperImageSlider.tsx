"use client";

import { useState } from "react";
import "swiper/css";
import "swiper/css/keyboard";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperControls from "./SwiperControls";
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
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="relative h-full w-full">
      <div className={`h-full w-full ${addVerticalPadding ? "p-8" : "px-8"}`}>
        <Swiper
          allowTouchMove={false}
          className="h-full w-full"
          keyboard={{ enabled: true }}
          modules={[Keyboard]}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide[0].asset._ref}>
              {slide.length === 1 && (
                <div className="grid h-full w-full grid-cols-1">
                  <div className="h-full w-full overflow-hidden border border-red-500">
                    <SwiperImage image={slide[0]} altText={imagesAltText} />
                  </div>
                </div>
              )}

              {slide.length === 2 && (
                <div className="grid h-full w-full grid-cols-2 gap-x-4">
                  <div className="h-full w-full overflow-hidden border border-green-500">
                    <SwiperImage
                      image={slide[0]}
                      altText={imagesAltText}
                      alignment="end"
                    />
                  </div>

                  <div className="h-full w-full overflow-hidden border border-blue-500">
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

          <SwiperControls
            numOfSlides={slides.length}
            currentSlide={currentSlide}
          />
        </Swiper>
      </div>
    </section>
  );
}
