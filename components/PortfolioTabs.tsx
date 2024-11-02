"use client";

import { useParams, usePathname } from "next/navigation";

import { useTabsStore } from "@/store/TabsStore";
import PortfolioTabLink from "./PortfolioTabLink";

const PortfolioTabs = ({ model }: { model: ModelDoc }) => {
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

  const pathSegments = pathname.split("/");
  const endPathSegment = pathSegments[pathSegments.length - 1];

  let thumbnails = model.portfolio;

  if (
    endPathSegment === "digitals" &&
    model.digitals &&
    model.digitals?.length > 0
  ) {
    thumbnails = model.digitals;
  }

  if (endPathSegment === "shows" && model.shows && model.shows.length > 0) {
    thumbnails = model.shows;
  }

  if (endPathSegment === "covers" && model.covers && model.covers.length > 0) {
    thumbnails = model.covers;
  }

  if (
    endPathSegment === "campaigns" &&
    model.campaigns &&
    model.campaigns.length > 0
  ) {
    thumbnails = model.campaigns;
  }

  const tabsWithThumbnails = [slug, "digitals", "shows", "covers", "campaigns"];
  const hasThumbnails = tabsWithThumbnails.includes(endPathSegment);

  return (
    <div className="brand-text flex flex-wrap items-center gap-x-4 p-4 lg:fixed lg:bottom-0 lg:w-full lg:p-8">
      <h2 className="mr-4 hidden lg:block">{model.name}</h2>

      <PortfolioTabLink slug={model.slug.current}>Portfolio</PortfolioTabLink>

      {model.digitals && model.digitals.length > 0 && (
        <PortfolioTabLink slug={model.slug.current} tab="digitals">
          Digitals
        </PortfolioTabLink>
      )}

      {model.videos && model.videos.length > 0 && (
        <PortfolioTabLink slug={model.slug.current} tab="video">
          Video
        </PortfolioTabLink>
      )}

      {model.shows && model.shows.length > 0 && (
        <PortfolioTabLink slug={model.slug.current} tab="shows">
          Shows
        </PortfolioTabLink>
      )}

      {model.covers && model.covers.length > 0 && (
        <PortfolioTabLink slug={model.slug.current} tab="covers">
          Covers
        </PortfolioTabLink>
      )}

      {model.campaigns && model.campaigns.length > 0 && (
        <PortfolioTabLink slug={model.slug.current} tab="campaigns">
          Campaigns
        </PortfolioTabLink>
      )}

      {model.interview && (
        <PortfolioTabLink slug={model.slug.current} tab="interview">
          Interview
        </PortfolioTabLink>
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

      <a
        href={`/models/${model.slug.current}/download`}
        download={`${model.slug.current}-portfolio`}
        target="_blank"
        className="leading-[2.6] text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white lg:leading-[1.3]"
      >
        Download
      </a>

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
};

export default PortfolioTabs;
