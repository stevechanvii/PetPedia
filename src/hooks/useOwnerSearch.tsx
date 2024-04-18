import { type Gender } from "@/types";
import { create } from "zustand";
import _ from "lodash";

interface OwnerSearchStore {
  searchedName: string;
  setSearchedName: (name: string) => void;
  selectedGenders: Gender[];
  setSelectedGender: (gender: Gender) => void;
}

export const useOwnerSearch = create<OwnerSearchStore>((set) => ({
  searchedName: "",
  setSearchedName: (name) => set({ searchedName: name }),
  selectedGenders: [],
  setSelectedGender: (gender) =>
    set((state) => ({
      selectedGenders: _.xor(state.selectedGenders, [gender]),
    })),
}));
