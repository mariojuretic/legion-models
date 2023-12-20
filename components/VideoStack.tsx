"use client";

import { useEffect, useRef, useState } from "react";

import VideoPlayer from "./VideoPlayer";

export default function VideoStack({ videos }: { videos: VideoType[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    setContainerWidth(containerRef.current.clientWidth);
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
}
