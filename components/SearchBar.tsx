"use client";

import { useSearchStore } from "@/store/SearchStore";

export default function SearchBar() {
  const [searchTerm, setSearchTerm, hideSearch] = useSearchStore((state) => [
    state.searchTerm,
    state.setSearchTerm,
    state.hideSearch,
  ]);

  return (
    <form className="flex grow items-center gap-4 self-stretch bg-white px-4 pb-4 dark:bg-black lg:gap-8 lg:p-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
        autoComplete="off"
        autoFocus
        className="brand-text flex-1 rounded-none border border-transparent border-b-black/50 bg-transparent p-2 outline-none placeholder:text-black/50 focus:border-b-black dark:border-b-white/50 dark:placeholder:text-white/50 dark:focus:border-b-white"
      />

      <button
        type="button"
        onClick={() => hideSearch()}
        className="brand-text rounded-none border border-transparent bg-transparent p-2 outline-none"
      >
        Clear
      </button>
    </form>
  );
}
