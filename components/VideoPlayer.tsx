"use client";

import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/dist/react";
import MuxVideo from "@mux/mux-video-react";
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
  const src = `https://stream.mux.com/${playbackId}.m3u8`;

  return (
    <MediaController>
      <MuxVideo slot="media" src={src} muted style={{ width, height }} />

      <MediaControlBar>
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
    </MediaController>
  );
}
