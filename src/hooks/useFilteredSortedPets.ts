import { useMemo } from "react";
import _ from "lodash";
import { type Order, type Owner, type PetType } from "@/types";
import { type FlatPetProps } from "@/container/pets";

// Enums for sorting
export enum SortByOwner {
  OwnerName = "ownerName",
  Age = "ownerAge",
}

export enum SortByPet {
  PetName = "petName",
  Type = "petType",
}

// Utility to flatten the pet and owner data
const flatPets = (owners: Owner[]): FlatPetProps[] =>
  owners?.flatMap((owner) =>
    (owner.pets || []).map((pet) => ({
      petName: pet.name,
      petType: pet.type,
      ownerName: owner.name,
      ownerAge: owner.age,
      ownerGender: owner.gender,
    })),
  );

// Filter pets by selected pet types
const filterPetsByType = (pets: FlatPetProps[], selectedTypes: PetType[]) =>
  selectedTypes.length
    ? pets.filter((pet) => selectedTypes.includes(pet.petType))
    : pets;

// Sort pets by selected criteria and order
const sortPets = (
  pets: FlatPetProps[],
  sortBy: SortByOwner | SortByPet,
  order: Order,
) => (sortBy ? _.orderBy(pets, [sortBy], [order]) : pets);

type Props = {
  owners: Owner[];
  selectedTypes: PetType[];
  sortBy: SortByOwner | SortByPet;
  order: Order;
};
// Memoized selector to get the filtered and sorted pets
const useFilteredSortedPets = ({
  owners,
  selectedTypes,
  sortBy,
  order,
}: Props) =>
  useMemo(() => {
    let pets = flatPets(owners);
    pets = filterPetsByType(pets, selectedTypes);
    pets = sortPets(pets, sortBy, order);
    return pets;
  }, [owners, selectedTypes, sortBy, order]);

export { useFilteredSortedPets };
