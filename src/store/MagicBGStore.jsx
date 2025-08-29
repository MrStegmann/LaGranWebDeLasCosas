import { create } from "zustand";

export const LOGIN_STATE = [-10, 1.9, -23];

// Static positions
export const TOP_LEFT_STATE = [-15, 9, -22];
export const TOP_CENTER_STATE = [0, 9, -22];
export const TOP_RIGHT_STATE = [15, 9, -22];
export const CENTER_LEFT_STATE = [-15, 0, -22];
export const CENTER_CENTER_STATE = [0, 0, -22];
export const CENTER_RIGHT_STATE = [15, 0, -22];
export const BOTTOM_LEFT_STATE = [-15, -9, -22];
export const BOTTOM_CENTER_STATE = [0, -9, -22];
export const BOTTOM_RIGHT_STATE = [15, -9, -22];

export const useMagicBgStore = create((set) => ({
  spherePos: [-6, 1.9, -15], // estado global
  setSpherePos: (spherePos) => set({ spherePos }), // función para cambiarlo
  sphereRot: [0.065, 0.42, 0.5],
  setSphereRot: (sphereRot) => set({ sphereRot }),
  setSphereToLogin: () =>
    set({ spherePos: [-6, 1.9, -15], sphereRot: [0.06, 0.42, 0.5] }),
  setSphereToMainMenu: () =>
    set({ spherePos: [0, 0, -35], sphereRot: [2, 0, 0] }),
  setSphereToCodex: () =>
    set({ spherePos: [0, -6.5, -15], sphereRot: [-0.35, 0, 0] }),
}));
