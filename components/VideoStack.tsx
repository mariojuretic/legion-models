"use client";

import { useLayoutEffect, useRef, useState } from "react";

import VideoPlayer from "./VideoPlayer";

const VideoStack = ({ videos }: { videos: VideoType[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState<number>();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    setContainerWidth(containerRef.current.clientWidth);
  }, []);

  useLayoutEffect(() => {
    const resizeHandler = () => {
      if (!containerRef.current) return;

      setContainerWidth(containerRef.current.clientWidth);
    };

    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className="p-4">
      <div ref={containerRef} className="flex flex-col items-center gap-4">
        {containerWidth &&
          videos.map((video) => {
            const aspectRatio = eval(video.aspectRatio.replace(":", "/"));

            return (
              <VideoPlayer
                key={video.playbackId}
                playbackId={video.playbackId}
                width={containerWidth}
                height={containerWidth / aspectRatio}
              />
            );
          })}
      </div>
    </div>
  );
};

export default VideoStack;
