import { create } from "zustand";

interface SearchState {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isVisible: boolean;
  showSearch: () => void;
  hideSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: "",
  setSearchTerm: (value) => set({ searchTerm: value }),
  isVisible: false,
  showSearch: () => set({ isVisible: true }),
  hideSearch: () => set({ isVisible: false, searchTerm: "" }),
}));
