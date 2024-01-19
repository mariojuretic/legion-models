"use client";

import MuxVideo from "@mux/mux-video-react";

const LandingPageVideo = ({ playbackId }: { playbackId: string }) => {
  const source = `https://stream.mux.com/${playbackId}.m3u8`;

  return (
    <MuxVideo
      src={source}
      className="h-full w-full object-cover object-center"
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export default LandingPageVideo;
