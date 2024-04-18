"use client";

import React, { useCallback, useMemo } from "react";
import { useQueryOwners } from "@/hooks/query/useQueryPets";
import { LoaderCircle } from "lucide-react";
import PetCard from "@/components/pet-card";
import _ from "lodash";
import { Gender, SortByOwner, SortByPet, type PetType } from "@/types";
import Fuse from "fuse.js";
import { TypographyPBold } from "@/components/ui/typography";
import { useStoreOwnerSearch } from "@/hooks/store/useStoreOwnerSearch";
import { useStorePetSearch } from "@/hooks/store/useStorePetSearch";
import { useStoreSortBy } from "@/hooks/store/useStoreSortBy";

const NoPet = [
  {
    petName: "No Pets",
    petType: "No Pets",
  },
];

const ownerFuseSettings = {
  threshold: 0.3,
  keys: ["ownerName"],
};

const petFuseSettings = {
  threshold: 0.3,
  keys: ["petName"],
};

type FlatPetProps = {
  petName: string;
  petType: PetType;
  ownerName: string;
  ownerAge: number;
  ownerGender: Gender;
};

const Pets = () => {
  const {
    data: owners,
    isLoading: isQueryOwnersLoading,
    isError: isQueryOwnersError,
  } = useQueryOwners();

  const { searchedName: ownerName, selectedGenders } = useStoreOwnerSearch();
  const { searchedName: petName, selectedTypes } = useStorePetSearch();
  const { sortBy, order } = useStoreSortBy();

  // Make a flat array of filtered (pet types) pets with owner details for easier category
  const filteredFlatPets = useMemo(() => {
    let flatPets = owners?.flatMap((owner) =>
      (owner.pets || NoPet).map((pet) => ({
        petName: pet.name,
        petType: pet.type,
        ownerName: owner.name,
        ownerAge: owner.age,
        ownerGender: owner.gender,
      })),
    );
    // filter by pet type
    if (selectedTypes.length) {
      flatPets = flatPets?.filter((pet) => selectedTypes.includes(pet.petType));
    }
    // Sort by
    if (sortBy === SortByOwner.OwnerName) {
      flatPets = _.orderBy(flatPets, ["ownerName"], [order]);
    }
    if (sortBy === SortByOwner.Age) {
      flatPets = _.orderBy(flatPets, ["ownerAge"], [order]);
    }
    if (sortBy === SortByPet.PetName) {
      flatPets = _.orderBy(flatPets, ["petName"], [order]);
    }
    if (sortBy === SortByPet.Type) {
      flatPets = _.orderBy(flatPets, ["petType"], [order]);
    }

    return flatPets;
  }, [order, owners, selectedTypes, sortBy]);

  // Search by owner name and/or pet name
  const searchedResultsByName = useMemo(() => {
    const fuseOwner = new Fuse(filteredFlatPets || [], ownerFuseSettings);
    const fusePet = new Fuse(filteredFlatPets || [], petFuseSettings);

    if (ownerName && petName) {
      const ownerResults = fuseOwner
        .search(ownerName)
        .map((result) => result.item);
      const petResults = fusePet.search(petName).map((result) => result.item);
      // Return the intersection of results for both owner name and pet name
      return ownerResults.filter((ownerResult) =>
        petResults.some((petResult) => petResult === ownerResult),
      );
    } else if (ownerName) {
      return fuseOwner.search(ownerName).map((result) => result.item);
    } else if (petName) {
      return fusePet.search(petName).map((result) => result.item);
    } else {
      return filteredFlatPets;
    }
  }, [ownerName, petName, filteredFlatPets]);

  const groupByOwnerGender = useCallback(() => {
    const groupedData: Record<Gender, FlatPetProps[]> = {
      [Gender.Male]: [],
      [Gender.Female]: [],
    };
    searchedResultsByName?.forEach((item) => {
      const { ownerGender } = item;
      if (!groupedData[ownerGender]) {
        groupedData[ownerGender] = [];
      }
      groupedData[ownerGender].push(item);
    });
    return groupedData;
  }, [searchedResultsByName]);

  if (isQueryOwnersLoading)
    return (
      <div className="flex justify-center items-center h-[200px]">
        <LoaderCircle size="50px" className="animate-spin text-blue-500" />
      </div>
    );
  if (isQueryOwnersError) return <div>Error</div>;
  if (!filteredFlatPets) return <div>No Data</div>;

  // No need to group
  if (_.isEmpty(selectedGenders)) {
    return (
      <div className="flex gap-6 flex-wrap items-start px-6">
        {_.isEmpty(searchedResultsByName) ? (
          <TypographyPBold>No pet meets your requirements</TypographyPBold>
        ) : (
          searchedResultsByName?.map((pet) => (
            <PetCard
              key={pet.ownerName + pet.petName}
              name={pet.petName}
              type={pet.petType}
              ownerName={pet.ownerName}
              ownerAge={pet.ownerAge}
              ownerGender={pet.ownerGender}
            />
          ))
        )}
      </div>
    );
  }

  const groupedData = groupByOwnerGender();
  return (
    <div className="flex gap-2 flex-col px-6 mb-4">
      {selectedGenders.map((gender) => (
        <div key={gender} className="flex gap-2 flex-col px-6 mb-4">
          <TypographyPBold>{`Owner gender: ${gender}`}</TypographyPBold>
          <div className="flex gap-6 flex-wrap">
            {_.isEmpty(groupedData[gender]) ? (
              <TypographyPBold>No pet meets your requirements</TypographyPBold>
            ) : (
              groupedData[gender].map((pet) => (
                <PetCard
                  key={pet.ownerName + pet.petName}
                  name={pet.petName}
                  type={pet.petType}
                  ownerName={pet.ownerName}
                  ownerAge={pet.ownerAge}
                  ownerGender={pet.ownerGender}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pets;
