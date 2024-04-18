import { create } from "zustand";

interface PetSearchStore {
  searchedName: string;
  setSearchedName: (name: string) => void;
}

export const usePetSearch = create<PetSearchStore>((set) => ({
  searchedName: "",
  setSearchedName: (name) => set({ searchedName: name }),
}));
