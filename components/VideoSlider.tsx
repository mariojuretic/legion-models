"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import MuxPlayer from "@mux/mux-player-react";

import "@mux/mux-player-react/themes/minimal";

export default function VideoSlider({ videos }: { videos: VideoType[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);

  const [videoWidth, setVideoWidth] = useState<number>();
  const [videoHeight, setVideoHeight] = useState<number>();

  const currentVideo = videos[page - 1];

  const nextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const prevPage = () => {
    setPage((currentPage) => currentPage - 1);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const videoAspectRatio = eval(currentVideo.aspectRatio.replace(":", "/"));

    let renderWidth = 1000000;
    let renderHeight = Math.floor(renderWidth / videoAspectRatio);

    // Limit video width...
    if (renderWidth > containerWidth) {
      const resizeFactor = containerWidth / renderWidth;
      renderWidth = Math.floor(renderWidth * resizeFactor);
      renderHeight = Math.floor(renderHeight * resizeFactor);
    }

    // Limit video height...
    if (renderHeight > containerHeight) {
      const resizeFactor = containerHeight / renderHeight;
      renderWidth = Math.floor(renderWidth * resizeFactor);
      renderHeight = Math.floor(renderHeight * resizeFactor);
    }

    setVideoWidth(renderWidth);
    setVideoHeight(renderHeight);
  }, [currentVideo.aspectRatio]);

  return (
    <>
      <button
        className="shrink-0 p-8 text-black enabled:hover:text-white"
        onClick={prevPage}
        disabled={page <= 1}
      >
        <ChevronLeftIcon className="h-10 w-10" />
      </button>

      <div className="flex-1 p-8">
        <div
          ref={containerRef}
          className="flex h-full w-full items-center justify-center"
        >
          {videoWidth && videoHeight && (
            <MuxPlayer
              playbackId={currentVideo.playbackId}
              style={{ width: videoWidth, height: videoHeight }}
              theme="minimal"
            />
          )}
        </div>
      </div>

      <button
        className="shrink-0 p-8 text-black enabled:hover:text-white"
        onClick={nextPage}
        disabled={page >= videos.length}
      >
        <ChevronRightIcon className="h-10 w-10" />
      </button>
    </>
  );
}
