import { renderHook } from "@testing-library/react";
import {
  filterPetsByType,
  flatPets,
  SortByPet,
  sortPets,
  useFilteredSortedPets,
} from "./useFilteredSortedPets";
import { Order, Owner, PetType } from "@/types";
import { sampleOwnerData } from "../../__tests__/data.test";
import _ from "lodash";

describe("Pet Owner Data Management", () => {
  describe("flatPets function", () => {
    it("should flatten owner and pet data correctly", () => {
      const expected = [
        {
          petName: "Garfield",
          petType: "Cat",
          ownerName: "Bob",
          ownerAge: 23,
          ownerGender: "Male",
        },
        {
          petName: "Fido",
          petType: "Dog",
          ownerName: "Bob",
          ownerAge: 23,
          ownerGender: "Male",
        },
        {
          petName: "Garfield",
          petType: "Cat",
          ownerName: "Jennifer",
          ownerAge: 18,
          ownerGender: "Female",
        },
        {
          petName: undefined,
          petType: undefined,
          ownerName: "Steve",
          ownerAge: 45,
          ownerGender: "Male",
        },
        {
          petName: "Tom",
          petType: "Cat",
          ownerName: "Fred",
          ownerAge: 40,
          ownerGender: "Male",
        },
        {
          petName: "Max",
          petType: "Cat",
          ownerName: "Fred",
          ownerAge: 40,
          ownerGender: "Male",
        },
        {
          petName: "Sam",
          petType: "Dog",
          ownerName: "Fred",
          ownerAge: 40,
          ownerGender: "Male",
        },
        {
          petName: "Jim",
          petType: "Cat",
          ownerName: "Fred",
          ownerAge: 40,
          ownerGender: "Male",
        },
        {
          petName: "Tabby",
          petType: "Cat",
          ownerName: "Samantha",
          ownerAge: 40,
          ownerGender: "Female",
        },
        {
          petName: "Simba",
          petType: "Cat",
          ownerName: "Alice",
          ownerAge: 64,
          ownerGender: "Female",
        },
        {
          petName: "Nemo",
          petType: "Fish",
          ownerName: "Alice",
          ownerAge: 64,
          ownerGender: "Female",
        },
      ];
      expect(flatPets(sampleOwnerData)).toEqual(expected);
    });
  });

  describe("filterPetsByType function", () => {
    it("should filter pets by selected types", () => {
      const flatPetData = flatPets(sampleOwnerData);
      const selectedTypes = [PetType.Cat];
      const expected = flatPetData.filter((pet) => pet.petType === "Cat");
      expect(filterPetsByType(flatPetData, selectedTypes)).toEqual(expected);
    });
  });

  describe("sortPets function", () => {
    it("should sort pets by name", () => {
      const flatPetData = flatPets(sampleOwnerData);
      const sortedByName = _.orderBy(flatPetData, ["petName"], ["asc"]);
      expect(sortPets(flatPetData, SortByPet.PetName, Order.Asc)).toEqual(
        sortedByName,
      );
    });
  });

  describe("useFilteredSortedPets hook", () => {
    it("should return filtered and sorted pets", () => {
      const { result } = renderHook(() =>
        useFilteredSortedPets({
          owners: sampleOwnerData,
          selectedTypes: [PetType.Cat],
          sortBy: SortByPet.PetName,
          order: Order.Asc,
        }),
      );
      const filteredAndSorted = sortPets(
        filterPetsByType(flatPets(sampleOwnerData), [PetType.Cat]),
        SortByPet.PetName,
        Order.Asc,
      );
      expect(result.current).toEqual(filteredAndSorted);
    });
  });
});
