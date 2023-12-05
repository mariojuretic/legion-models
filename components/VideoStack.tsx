"use client";

import { useEffect, useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

import "@mux/mux-player-react/themes/minimal";

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
              <MuxPlayer
                key={video.playbackId}
                playbackId={video.playbackId}
                style={{
                  width: containerWidth,
                  height: containerWidth / aspectRatio,
                }}
                theme="minimal"
              />
            );
          })}
      </div>
    </div>
  );
}
