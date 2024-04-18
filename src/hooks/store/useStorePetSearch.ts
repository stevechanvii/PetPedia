import { PetType } from "@/types";
import _ from "lodash";
import { create } from "zustand";

interface PetSearchStore {
  searchedName: string;
  setSearchedName: (name: string) => void;
  selectedTypes: PetType[];
  setSelectedType: (type: PetType) => void;
  reset: () => void;
}

export const useStorePetSearch = create<PetSearchStore>((set) => ({
  searchedName: "",
  setSearchedName: (name) => set({ searchedName: name }),
  selectedTypes: [PetType.Cat],
  setSelectedType: (gender) =>
    set((state) => ({
      selectedTypes: _.xor(state.selectedTypes, [gender]),
    })),
  reset: () => {
    set({ searchedName: "", selectedTypes: [] });
  },
}));
