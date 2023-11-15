import { create } from "zustand";

const useLocationStore = create((set) => ({
  latitude: null,
  longitude: null,
  setLocation: (latitude, longitude) => set({ latitude, longitude }),
}));

export default useLocationStore;
