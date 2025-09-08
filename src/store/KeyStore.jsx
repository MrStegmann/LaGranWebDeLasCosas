import { create } from "zustand";

export const useKeyStore = create((set) => ({
  keyInstructions: false,
  setKeyInstructions: (keyInstructions) => set({ keyInstructions }),
}));
