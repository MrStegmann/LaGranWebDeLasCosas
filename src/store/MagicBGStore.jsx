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

// Beans Rotations
export const LDOWN_RUP = {
  left: [0, 0, Math.PI / -3],
  right: [0, 0, Math.PI / 1.5],
};

export const useMagicBgStore = create((set) => ({
  spherePos: LOGIN_STATE, // estado global
  setSpherePos: (spherePos) => set({ spherePos }), // función para cambiarlo
  sphereRot: { left: LDOWN_RUP.left, right: LDOWN_RUP.right },
  setSphereRot: (sphereRot) => set({ sphereRot }),
}));
