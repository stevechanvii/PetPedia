import { type Gender } from "@/types";
import { create } from "zustand";
import _ from "lodash";

interface SearchStore {
  ownerName: string;
  setOwnerName: (name: string) => void;
  selectedGenders: Gender[];
  setSelectedGender: (gender: Gender) => void;
  petName: string;
  setPetName: (name: string) => void;
}

export const useSearch = create<SearchStore>((set) => ({
  ownerName: "",
  setOwnerName: (name) => set({ ownerName: name }),
  selectedGenders: [],
  setSelectedGender: (gender) =>
    set((state) => ({
      selectedGenders: _.xor(state.selectedGenders, [gender]),
    })),
  petName: "",
  setPetName: (name) => set({ petName: name }),
}));
