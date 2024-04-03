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
      <button
        className="swiper-button-prev"
        onClick={() => swiper.slidePrev()}
      />

      <button
        className="swiper-button-next"
        onClick={() => swiper.slideNext()}
      />
    </>
  );
}
