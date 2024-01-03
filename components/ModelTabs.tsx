"use client";

import { useParams, usePathname } from "next/navigation";

import TabLink from "./TabLink";
import { useTabsStore } from "@/store/TabsStore";

export default function ModelTabs({ model }: { model: ModelDoc }) {
  const { slug } = useParams();
  const pathname = usePathname();

  const [
    measuresActive,
    showMeasures,
    hideMeasures,
    thumbnailsActive,
    showThumbnails,
    hideThumbnails,
  ] = useTabsStore((state) => [
    state.measuresActive,
    state.showMeasures,
    state.hideMeasures,
    state.thumbnailsActive,
    state.showThumbnails,
    state.hideThumbnails,
  ]);

  const segments = pathname.split("/");
  const endSegment = segments[segments.length - 1];

  let downloadButtonHref;
  let downloadFilename;

  if (endSegment === slug && model.downloads?.portfolio?.downloadUrl) {
    downloadButtonHref = model.downloads.portfolio.downloadUrl;
    downloadFilename = slug + "-portfolio";
  }

  if (endSegment === "digitals" && model.downloads?.digitals?.downloadUrl) {
    downloadButtonHref = model.downloads.digitals.downloadUrl;
    downloadFilename = slug + "-digitals";
  }

  let thumbnails = model.portfolio;

  if (endSegment == "digitals" && model.digitals && model.digitals.length > 0) {
    thumbnails = model.digitals;
  }

  if (endSegment == "shows" && model.shows && model.shows.length > 0) {
    thumbnails = model.shows;
  }

  if (endSegment == "covers" && model.covers && model.covers.length > 0) {
    thumbnails = model.covers;
  }

  if (
    endSegment == "campaigns" &&
    model.campaigns &&
    model.campaigns.length > 0
  ) {
    thumbnails = model.campaigns;
  }

  const tabsWithThumbnails = [slug, "digitals", "shows", "covers", "campaigns"];
  const hasThumbnails = tabsWithThumbnails.includes(endSegment);

  return (
    <div className="brand-text flex flex-wrap items-center gap-x-4 p-4 lg:p-8">
      <h2 className="mr-4 hidden lg:block">{model.name}</h2>

      <TabLink slug={model.slug.current}>Portfolio</TabLink>

      {model.digitals && model.digitals.length > 0 && (
        <TabLink slug={model.slug.current} tab="digitals">
          Digitals
        </TabLink>
      )}

      {model.videos && model.videos.length > 0 && (
        <TabLink slug={model.slug.current} tab="video">
          Video
        </TabLink>
      )}

      {model.shows && model.shows.length > 0 && (
        <TabLink slug={model.slug.current} tab="shows">
          Shows
        </TabLink>
      )}

      {model.covers && model.covers.length > 0 && (
        <TabLink slug={model.slug.current} tab="covers">
          Covers
        </TabLink>
      )}

      {model.campaigns && model.campaigns.length > 0 && (
        <TabLink slug={model.slug.current} tab="campaigns">
          Campaigns
        </TabLink>
      )}

      {model.interview && (
        <TabLink slug={model.slug.current} tab="interview">
          Interview
        </TabLink>
      )}

      {model.instagram && (
        <a
          href={`https://instagram.com/${model.instagram}`}
          target="_blank"
          className="leading-[2.6] text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white lg:leading-[1.3]"
        >
          Instagram
        </a>
      )}

      {model.measures && model.measures.length > 0 && (
        <span
          className="cursor-pointer leading-[2.6] text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white lg:leading-[1.3]"
          onClick={measuresActive ? hideMeasures : showMeasures}
        >
          Measures
        </span>
      )}

      {downloadButtonHref && downloadFilename && (
        <a
          href={`${downloadButtonHref}?dl=${downloadFilename}.pdf`}
          download
          target="_blank"
          className="leading-[2.6] text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white lg:leading-[1.3]"
        >
          Download
        </a>
      )}

      {hasThumbnails && (
        <span
          className="hidden cursor-pointer text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white lg:block"
          onClick={
            thumbnailsActive ? hideThumbnails : () => showThumbnails(thumbnails)
          }
        >
          Thumbnails
        </span>
      )}
    </div>
  );
}
