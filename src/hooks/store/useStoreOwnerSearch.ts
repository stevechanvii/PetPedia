import { Gender } from "@/types";
import { create } from "zustand";
import _ from "lodash";

interface OwnerSearchStore {
  searchedName: string;
  setSearchedName: (name: string) => void;
  selectedGenders: Gender[];
  setSelectedGender: (gender: Gender) => void;
  reset: () => void;
}

export const useStoreOwnerSearch = create<OwnerSearchStore>((set) => ({
  searchedName: "",
  setSearchedName: (name) => set({ searchedName: name }),
  selectedGenders: [Gender.Female, Gender.Male],
  setSelectedGender: (gender) =>
    set((state) => ({
      selectedGenders: _.xor(state.selectedGenders, [gender]),
    })),
  reset: () => {
    set({ searchedName: "", selectedGenders: [] });
  },
}));
