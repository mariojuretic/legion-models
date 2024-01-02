"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import VideoPlayer from "./VideoPlayer";

export default function VideoSlider({
  videos,
  withPadding = false,
}: {
  videos: VideoType[];
  withPadding?: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<number | null>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const pageParam = searchParams.get("page");

    if (!pageParam) {
      router.push(pathname + "?" + createQueryString("page", "1"));
    } else {
      setCurrentPage(Number(pageParam));
    }
  }, [searchParams, router, pathname, createQueryString]);

  const nextPage = () => {
    if (!currentPage) return;
    router.push(
      pathname + "?" + createQueryString("page", (currentPage + 1).toString()),
    );
  };

  const prevPage = () => {
    if (!currentPage) return;
    router.push(
      pathname + "?" + createQueryString("page", (currentPage - 1).toString()),
    );
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const [videoWidth, setVideoWidth] = useState<number>();
  const [videoHeight, setVideoHeight] = useState<number>();

  const currentVideo = currentPage ? videos[currentPage - 1] : null;

  useEffect(() => {
    if (!containerRef.current || !currentVideo) return;

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
  }, [currentVideo]);

  if (!currentPage || !currentVideo) return null;

  return (
    <>
      <button
        className="shrink-0 p-8 text-white enabled:hover:text-black dark:text-black dark:enabled:hover:text-white"
        onClick={prevPage}
        disabled={currentPage <= 1}
      >
        <ChevronLeftIcon className="h-10 w-10" />
      </button>

      <div className={`flex-1 ${withPadding ? "py-8" : "p-0"}`}>
        <div
          ref={containerRef}
          className="flex h-full w-full items-center justify-center"
        >
          {videoWidth && videoHeight && (
            <VideoPlayer
              playbackId={currentVideo.playbackId}
              width={videoWidth}
              height={videoHeight}
            />
          )}
        </div>
      </div>

      <button
        className="shrink-0 p-8 text-white enabled:hover:text-black dark:text-black dark:enabled:hover:text-white"
        onClick={nextPage}
        disabled={currentPage >= videos.length}
      >
        <ChevronRightIcon className="h-10 w-10" />
      </button>
    </>
  );
}
