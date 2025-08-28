import { create } from "zustand";

export const usePageStore = create((set) => ({
  toAppear: false,
  setToAppear: (bool) => set({ toAppear: bool }),
}));
