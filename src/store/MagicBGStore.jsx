import { create } from "zustand";

export const useMagicBgStore = create((set) => ({
  spherePos: [-12, 1.9, -25], // estado global
  setSpherePos: (pos) => set({ spherePos: pos }), // función para cambiarlo
}));
