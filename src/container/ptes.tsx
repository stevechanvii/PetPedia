"use client";

import React, { useCallback, useMemo } from "react";
import { useQueryOwners } from "@/hooks/query/useQueryPets";
import { Loader } from "lucide-react";
import PetCard from "@/components/pet-card";
import _ from "lodash";
import { Gender, type PetType } from "@/types";
import Fuse from "fuse.js";
import { TypographyPBold } from "@/components/ui/typography";
import { useOwnerSearch } from "@/hooks/useOwnerSearch";
import { usePetSearch } from "@/hooks/usePetSearch";

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

  const { searchedName: ownerName, selectedGenders } = useOwnerSearch();
  const { searchedName: petName, selectedTypes } = usePetSearch();

  // Make a flat array of filtered (pet types) pets with owner details for easier category
  const filteredFlatPets = useMemo(() => {
    const flatPets = owners?.flatMap((owner) =>
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
      return flatPets?.filter((pet) => selectedTypes.includes(pet.petType));
    }

    return flatPets;
  }, [owners, selectedTypes]);

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

  if (isQueryOwnersLoading) return <Loader className="animate-spin" />;
  if (isQueryOwnersError) return <div>Error</div>;
  if (!filteredFlatPets) return <div>No Data</div>;

  // No need to group
  if (_.isEmpty(selectedGenders)) {
    return (
      <div className="flex gap-2 flex-wrap px-6">
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
  return selectedGenders.map((gender) => (
    <div key={gender} className="flex gap-2 flex-col px-6">
      <TypographyPBold>{gender}</TypographyPBold>
      <div className="flex gap-2 flex-wrap">
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
  ));
};

export default Pets;
