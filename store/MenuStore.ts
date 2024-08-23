import { create } from "zustand";

interface MenuState {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  openMenu: () => {
    document.body.classList.add("overflow-hidden");
    set({ isOpen: true });
  },
  closeMenu: () => {
    document.body.classList.remove("overflow-hidden");
    set({ isOpen: false });
  },
}));
