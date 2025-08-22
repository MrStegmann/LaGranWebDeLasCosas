import { create } from "zustand";

export const useAuthStore = create((set) => ({
  auth: {},
  loged: false,
  setAuth: (auth) => set({ auth }),
  setLoged: (loged) => set({ loged }),
}));
