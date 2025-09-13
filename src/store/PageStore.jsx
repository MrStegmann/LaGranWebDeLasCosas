import { create } from "zustand";

export const usePageStore = create((set) => ({
  toAppear: false,
  setToAppear: (bool) => set({ toAppear: bool }),
}));

export const useCurrentMenu = create((set) => ({
  currentMenu: "main",
  setCurrentMenu: (currentMenu) => set({ currentMenu }),
}));

export const useLastMenu = create((set) => ({
  lastMenu: [],
  setLastMenu: (lastMenu) => set({ lastMenu }),
}));
