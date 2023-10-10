export default function ModelTabs({ name }: { name: string }) {
  return (
    <div className="brand-text flex flex-wrap items-center gap-x-4 p-4 lg:p-8">
      <h2 className="mr-4 hidden lg:block">{name}</h2>

      <p>Portfolio</p>
      <p className="text-black/50 dark:text-white/50">Digitals</p>
      <p className="text-black/50 dark:text-white/50">Video</p>
      <p className="text-black/50 dark:text-white/50">Shows</p>
      <p className="text-black/50 dark:text-white/50">Covers</p>
      <p className="text-black/50 dark:text-white/50">Campaigns</p>
      <p className="text-black/50 dark:text-white/50">Interview</p>
      <p className="text-black/50 dark:text-white/50">Instagram</p>
      <p className="text-black/50 dark:text-white/50">Measures</p>
      <p className="text-black/50 dark:text-white/50">Download</p>
    </div>
  );
}
