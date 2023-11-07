import { create } from "zustand";

const useLikedStore = create((set) => ({
  liked: JSON.parse(localStorage.getItem("liked")) || [],
  addLiked: (place) =>
    set((state) => {
      const updatedLiked = [...state.liked, place];
      localStorage.setItem("liked", JSON.stringify(updatedLiked));
      return { liked: updatedLiked };
    }),
  removeLiked: (place) =>
    set((state) => {
      const updatedLiked = state.liked.filter((p) => p.id !== place.id);
      localStorage.setItem("liked", JSON.stringify(updatedLiked));
      return { liked: updatedLiked };
    }),
}));

export default useLikedStore;
