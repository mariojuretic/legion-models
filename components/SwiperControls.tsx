"use client";

import { useSwiper } from "swiper/react";

export default function SwiperControls() {
  const swiper = useSwiper();

  return (
    <>
      <button
        className="swiper-button-prev bg-red-500/25"
        onClick={() => swiper.slidePrev()}
      />

      <button
        className="swiper-button-next bg-green-500/25"
        onClick={() => swiper.slideNext()}
      />
    </>
  );
}
