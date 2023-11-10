import TabLink from "./TabLink";

export default function ModelTabs({ model }: { model: ModelDoc }) {
  return (
    <div className="brand-text flex flex-wrap items-center gap-x-4 p-4 lg:p-8">
      <h2 className="mr-4 hidden lg:block">{model.name}</h2>

      <TabLink slug={model.slug.current}>Portfolio</TabLink>

      {model.digitals && model.digitals.length > 0 && (
        <TabLink slug={model.slug.current} tab="digitals">
          Digitals
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

      {model.instagram && (
        <a
          href={`https://instagram.com/${model.instagram}`}
          target="_blank"
          className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
        >
          Instagram
        </a>
      )}
    </div>
  );
}
