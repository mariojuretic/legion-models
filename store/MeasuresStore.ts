import { create } from "zustand";

interface MeasuresState {
  active: boolean;
  showMeasures: () => void;
  hideMeasures: () => void;
}

export const useMeasuresStore = create<MeasuresState>((set) => ({
  active: false,
  showMeasures: () => set({ active: true }),
  hideMeasures: () => set({ active: false }),
}));
