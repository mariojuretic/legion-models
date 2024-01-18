"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import VideoPlayer from "./VideoPlayer";

const VideoSlider = ({
  videos,
  withPadding = false,
}: {
  videos: VideoType[];
  withPadding?: boolean;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<number>();

  const createUrlString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useLayoutEffect(() => {
    const existingPageParam = searchParams.get("page");

    if (!existingPageParam) {
      router.push(pathname + "?" + createUrlString("page", "1"));
    } else {
      setCurrentPage(Number(existingPageParam));
    }
  }, [searchParams, router, pathname, createUrlString]);

  const nextPageHandler = () => {
    if (!currentPage) return;

    const nextPage = currentPage + 1;
    router.push(pathname + "?" + createUrlString("page", nextPage.toString()));
  };

  const prevPageHandler = () => {
    if (!currentPage) return;

    const prevPage = currentPage - 1;
    router.push(pathname + "?" + createUrlString("page", prevPage.toString()));
  };

  if (!currentPage) return null;

  const currentVideo = videos[currentPage - 1];

  return (
    <div className="flex h-full w-full">
      <button
        className="shrink-0 p-8 text-white enabled:hover:text-black dark:text-black dark:enabled:hover:text-white"
        onClick={prevPageHandler}
        disabled={currentPage <= 1}
      >
        <ChevronLeftIcon className="h-10 w-10" />
      </button>

      <div className={`flex-1 ${withPadding ? "py-8" : "p-0"}`}>
        <Video video={currentVideo} />
      </div>

      <button
        className="shrink-0 p-8 text-white enabled:hover:text-black dark:text-black dark:enabled:hover:text-white"
        onClick={nextPageHandler}
        disabled={currentPage >= videos.length}
      >
        <ChevronRightIcon className="h-10 w-10" />
      </button>
    </div>
  );
};

export default VideoSlider;

const Video = ({ video }: { video: VideoType }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState<number>();
  const [containerHeight, setContainerHeight] = useState<number>();

  const [videoWidth, setVideoWidth] = useState<number>();
  const [videoHeight, setVideoHeight] = useState<number>();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    setContainerWidth(containerRef.current.clientWidth);
    setContainerHeight(containerRef.current.clientHeight);
  }, []);

  useLayoutEffect(() => {
    const resizeHandler = () => {
      if (!containerRef.current) return;

      setContainerWidth(containerRef.current.clientWidth);
      setContainerHeight(containerRef.current.clientHeight);
    };

    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useLayoutEffect(() => {
    if (!containerWidth || !containerHeight) return;

    const videoAspectRatio = eval(video.aspectRatio.replace(":", "/"));

    let initWidth = 1000000;
    let initHeight = initWidth / videoAspectRatio;

    // Limit video width...
    if (initWidth > containerWidth) {
      const resizeFactor = containerWidth / initWidth;
      initWidth = Math.floor(initWidth * resizeFactor);
      initHeight = Math.floor(initHeight * resizeFactor);
    }

    // Limit video height...
    if (initHeight > containerHeight) {
      const resizeFactor = containerHeight / initHeight;
      initWidth = Math.floor(initWidth * resizeFactor);
      initHeight = Math.floor(initHeight * resizeFactor);
    }

    setVideoWidth(initWidth);
    setVideoHeight(initHeight);
  }, [containerWidth, containerHeight, video.aspectRatio]);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center"
    >
      {videoWidth && videoHeight && (
        <VideoPlayer
          playbackId={video.playbackId}
          width={videoWidth}
          height={videoHeight}
        />
      )}
    </div>
  );
};
