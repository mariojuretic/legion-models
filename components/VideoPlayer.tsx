"use client";

import { useEffect, useRef, useState } from "react";
import MuxVideo from "@mux/mux-video-react";
import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/dist/react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";

import "@/app/video-player.css";

export default function VideoPlayer({
  playbackId,
  width,
  height,
}: {
  playbackId: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);

  useEffect(() => {
    if (!ref.current) return;

    const mutationObserver = new MutationObserver((mutations) => {
      if (!ref.current) return;

      for (const mutation of mutations) {
        if (mutation.attributeName === "mediaisfullscreen") {
          const isFullscreen = ref.current.hasAttribute("mediaisfullscreen");
          setFullscreen(isFullscreen);
        }

        if (
          mutation.attributeName === "mediahasplayed" ||
          mutation.attributeName === "mediapaused"
        ) {
          const isPaused = ref.current.hasAttribute("mediapaused");
          setPaused(isPaused);
        }
      }
    });

    mutationObserver.observe(ref.current, { attributes: true });

    return () => mutationObserver.disconnect();
  }, []);

  useEffect(() => {
    const mouseMoveHandler = (ev: globalThis.MouseEvent) => {
      if (!ref.current || !cursorRef.current) return;

      // Determine cursor coordinates
      const mouseX = ev.clientX;
      const mouseY = ev.clientY;

      // Get target area boundaries without bottom control bar
      const { left, top } = ref.current.getBoundingClientRect();
      const right = left + width;
      const bottom = top + height - 29;

      // Get custom cursor dimensions
      const cursorWidth = cursorRef.current.clientWidth;
      const cursorHeight = cursorRef.current.clientHeight;

      // Check if video is fullscreen...
      if (fullscreen && mouseY < ref.current.clientHeight - 29) {
        // Show custom cursor and set position
        cursorRef.current.style.display = "block";
        cursorRef.current.style.left = mouseX - cursorWidth / 2 + "px";
        cursorRef.current.style.top = mouseY - cursorHeight / 2 + "px";
      }
      // ...or if the cursor is inside of target area
      else if (
        mouseX > left &&
        mouseX < right &&
        mouseY > top &&
        mouseY < bottom
      ) {
        // Show custom cursor and set position relative to target area
        cursorRef.current.style.display = "block";
        cursorRef.current.style.left = mouseX - left - cursorWidth / 2 + "px";
        cursorRef.current.style.top = mouseY - top - cursorHeight / 2 + "px";
      }
      // ...otherwise
      else {
        // Hide custom cursor
        cursorRef.current.style.display = "none";
        cursorRef.current.style.left = "0px";
        cursorRef.current.style.top = "0px";
      }
    };

    window.addEventListener("mousemove", mouseMoveHandler);

    return () => window.removeEventListener("mousemove", mouseMoveHandler);
  }, [width, height, fullscreen]);

  const src = `https://stream.mux.com/${playbackId}.m3u8`;

  return (
    <MediaController ref={ref} className="group cursor-none">
      <MuxVideo
        slot="media"
        src={src}
        muted
        style={{
          width: fullscreen ? "100%" : width,
          height: fullscreen ? "100%" : height,
        }}
      />

      <MediaControlBar className="cursor-pointer">
        <MediaPlayButton>
          <span slot="play" className="hidden lg:block">
            PLAY
          </span>
          <span slot="pause" className="hidden lg:block">
            PAUSE
          </span>

          <span slot="play" className="lg:hidden">
            <PlayIcon className="h-4 w-4" />
          </span>
          <span slot="pause" className="lg:hidden">
            <PauseIcon className="h-4 w-4" />
          </span>
        </MediaPlayButton>

        <MediaTimeDisplay showDuration noToggle className="hidden lg:flex" />

        <MediaTimeRange>
          <MediaTimeDisplay slot="preview" />
        </MediaTimeRange>

        <MediaMuteButton>
          <span slot="off" className="hidden lg:block">
            Unmute
          </span>
          <span slot="low" className="hidden lg:block">
            Mute
          </span>
          <span slot="medium" className="hidden lg:block">
            Mute
          </span>
          <span slot="high" className="hidden lg:block">
            Mute
          </span>

          <span slot="off" className="lg:hidden">
            <SpeakerXMarkIcon className="h-4 w-4" />
          </span>
          <span slot="low" className="lg:hidden">
            <SpeakerWaveIcon className="h-4 w-4" />
          </span>
          <span slot="medium" className="lg:hidden">
            <SpeakerWaveIcon className="h-4 w-4" />
          </span>
          <span slot="high" className="lg:hidden">
            <SpeakerWaveIcon className="h-4 w-4" />
          </span>
        </MediaMuteButton>

        <MediaFullscreenButton>
          <span slot="enter" className="hidden lg:block">
            Fullscreen
          </span>
          <span slot="exit" className="hidden lg:block">
            Close
          </span>

          <span slot="enter" className="lg:hidden">
            <ArrowsPointingOutIcon className="h-4 w-4" />
          </span>
          <span slot="exit" className="lg:hidden">
            <ArrowsPointingInIcon className="h-4 w-4" />
          </span>
        </MediaFullscreenButton>
      </MediaControlBar>

      <span
        ref={cursorRef}
        className="brand-text pointer-events-none absolute leading-none drop-shadow"
        style={{ display: "none", left: "0px", top: "0px" }}
      >
        {paused ? "PLAY" : "PAUSE"}
      </span>
    </MediaController>
  );
}
