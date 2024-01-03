import { create } from "zustand";

interface TabsState {
  measuresActive: boolean;
  showMeasures: () => void;
  hideMeasures: () => void;

  thumbnailsActive: boolean;
  thumbnails: ImageType[] | null;
  showThumbnails: (thumbnails: ImageType[]) => void;
  hideThumbnails: () => void;
}

export const useTabsStore = create<TabsState>((set) => ({
  measuresActive: false,
  showMeasures: () =>
    set({
      measuresActive: true,
      thumbnailsActive: false,
      thumbnails: null,
    }),
  hideMeasures: () => set({ measuresActive: false }),

  thumbnailsActive: false,
  thumbnails: null,
  showThumbnails: (thumbnails) =>
    set({
      measuresActive: false,
      thumbnailsActive: true,
      thumbnails,
    }),
  hideThumbnails: () => set({ thumbnailsActive: false, thumbnails: null }),
}));
