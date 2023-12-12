import { create } from "zustand";

interface SearchState {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: "",
  setSearchTerm: (value) => set({ searchTerm: value }),
}));
