import { Order, SortByOwner, type SortByPet } from "@/types";
import { create } from "zustand";

interface SortByStore {
  sortBy: SortByOwner | SortByPet;
  setSortBy: (sortBy: SortByOwner | SortByPet) => void;
  order: Order;
  setOrder: (order: Order) => void;
}

export const useStoreSortBy = create<SortByStore>((set) => ({
  sortBy: SortByOwner.OwnerName,
  setSortBy: (sortBy) => set({ sortBy }),
  order: Order.Asc,
  setOrder: (order) => set({ order }),
}));
