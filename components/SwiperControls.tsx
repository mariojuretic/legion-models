"use client";

import { useSwiper } from "swiper/react";

type Props = {
  numOfSlides: number;
  currentSlide: number;
};

export default function SwiperControls({ numOfSlides, currentSlide }: Props) {
  const swiper = useSwiper();

  return (
    <>
      {currentSlide > 0 && (
        <button
          className="swiper-button-prev"
          onClick={() => swiper.slidePrev()}
        />
      )}

      {currentSlide < numOfSlides - 1 && (
        <button
          className="swiper-button-next"
          onClick={() => swiper.slideNext()}
        />
      )}
    </>
  );
}
