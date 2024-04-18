import { type PetType } from "@/types";
import _ from "lodash";
import { create } from "zustand";

interface PetSearchStore {
  searchedName: string;
  setSearchedName: (name: string) => void;
  selectedTypes: PetType[];
  setSelectedType: (type: PetType) => void;
}

export const usePetSearch = create<PetSearchStore>((set) => ({
  searchedName: "",
  setSearchedName: (name) => set({ searchedName: name }),
  selectedTypes: [],
  setSelectedType: (gender) =>
    set((state) => ({
      selectedTypes: _.xor(state.selectedTypes, [gender]),
    })),
}));
