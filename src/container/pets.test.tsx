import Fuse from "fuse.js";
import { useMemo } from "react";
import { renderHook } from "@testing-library/react";
import { FlatPetProps } from "./pets";
import { sampleOwnerData } from "../../__tests__/data.test";
import { flatPets } from "@/hooks/useFilteredSortedPets";

// Helper function to use useMemo outside of a React component for testing
function useTestableMemo({
  filteredFlatPets,
  ownerName,
  petName,
}: {
  filteredFlatPets: FlatPetProps[];
  ownerName: string;
  petName: string;
}) {
  return useMemo(() => {
    const fuseOwner = new Fuse(filteredFlatPets, {
      keys: ["ownerName"],
      threshold: 0.3,
    });
    const fusePet = new Fuse(filteredFlatPets, {
      keys: ["petName"],
      threshold: 0.3,
    });

    if (ownerName && petName) {
      const ownerResults = fuseOwner
        .search(ownerName)
        .map((result) => result.item);
      const petResults = fusePet.search(petName).map((result) => result.item);
      return ownerResults.filter((ownerResult) =>
        petResults.some((petResult) => petResult === ownerResult),
      );
    } else if (ownerName) {
      return fuseOwner.search(ownerName).map((result) => result.item);
    } else if (petName) {
      return fusePet.search(petName).map((result) => result.item);
    }
    return filteredFlatPets;
  }, [ownerName, petName, filteredFlatPets]);
}

// Test cases
describe("useTestableMemo for searchedResultsByName", () => {
  it("filters correctly by owner name", () => {
    const flatPetData = flatPets(sampleOwnerData);
    const { result } = renderHook(() =>
      useTestableMemo({
        filteredFlatPets: flatPetData,
        ownerName: "Bob",
        petName: "",
      }),
    );
    expect(result.current).toEqual([
      {
        ownerName: "Bob",
        ownerGender: "Male",
        petType: "Cat",
        petName: "Garfield",
        ownerAge: 23,
      },
      {
        ownerName: "Bob",
        ownerGender: "Male",
        petType: "Dog",
        petName: "Fido",
        ownerAge: 23,
      },
    ]);
  });

  it("filters correctly by pet name", () => {
    const flatPetData = flatPets(sampleOwnerData);
    const { result } = renderHook(() =>
      useTestableMemo({
        filteredFlatPets: flatPetData,
        ownerName: "",
        petName: "Fido",
      }),
    );

    expect(result.current).toEqual([
      {
        ownerName: "Bob",
        ownerGender: "Male",
        petType: "Dog",
        petName: "Fido",
        ownerAge: 23,
      },
    ]);
  });

  it("filters correctly by both owner and pet name", () => {
    const flatPetData = flatPets(sampleOwnerData);
    const { result } = renderHook(() =>
      useTestableMemo({
        filteredFlatPets: flatPetData,
        ownerName: "Bob",
        petName: "Garfield",
      }),
    );

    expect(result.current).toEqual([
      {
        ownerName: "Bob",
        ownerGender: "Male",
        petType: "Cat",
        petName: "Garfield",
        ownerAge: 23,
      },
    ]);
  });

  it("returns all items when no names are provided", () => {
    const flatPetData = flatPets(sampleOwnerData);
    const { result } = renderHook(() =>
      useTestableMemo({
        filteredFlatPets: flatPetData,
        ownerName: "",
        petName: "",
      }),
    );

    expect(result.current).toEqual(flatPetData);
  });
});
