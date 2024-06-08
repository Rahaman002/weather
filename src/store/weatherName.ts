import { create } from "zustand";

export const useName = create((set) => ({
  name: "vizag",
  updateName: (newName: string) => set({ name: newName }),
}));
