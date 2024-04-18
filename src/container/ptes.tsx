"use client";

import React, { useCallback, useMemo } from "react";
import { useQueryOwners } from "@/hooks/query/useQueryPets";
import { Loader } from "lucide-react";
import PetCard from "@/components/pet-card";
import { useSearch } from "@/hooks/useSearch";
import _ from "lodash";
import { Gender, type PetType } from "@/types";
import Fuse from "fuse.js";
import { TypographyPBold } from "@/components/ui/typography";

const NoPet = [
  {
    petName: "No Pets",
    petType: "No Pets",
  },
];

const ownerFuseSettings = {
  threshold: 0.5,
  keys: ["ownerName"],
};

type FlatPetProps = {
  petName: string;
  petType: PetType;
  ownerName: string;
  ownerAge: number;
  ownerGender: Gender;
};

const Pets = () => {
  const { data: owners, isLoading, isError } = useQueryOwners();
  const { ownerName, selectedGenders } = useSearch();

  // Make a flat array of pets with owner details for easier category
  const flatPets = useMemo(() => {
    return owners?.flatMap((owner) =>
      (owner.pets || NoPet).map((pet) => ({
        petName: pet.name,
        petType: pet.type,
        ownerName: owner.name,
        ownerAge: owner.age,
        ownerGender: owner.gender,
      })),
    );
  }, [owners]);

  const searchedByOwnerName = useMemo(() => {
    const fuseOwner = new Fuse(flatPets || [], ownerFuseSettings);
    return ownerName
      ? fuseOwner.search(ownerName).map((result) => result.item)
      : flatPets;
  }, [ownerName, flatPets]);

  const groupByOwnerGender = useCallback(() => {
    const groupedData: Record<Gender, FlatPetProps[]> = {
      [Gender.Male]: [],
      [Gender.Female]: [],
    };
    searchedByOwnerName?.forEach((item) => {
      const { ownerGender } = item;
      if (!groupedData[ownerGender]) {
        groupedData[ownerGender] = [];
      }
      groupedData[ownerGender].push(item);
    });
    return groupedData;
  }, [searchedByOwnerName]);

  if (isLoading) return <Loader className="animate-spin" />;
  if (isError) return <div>Error</div>;
  if (!flatPets) return <div>No Data</div>;

  // No need to group
  if (_.isEmpty(selectedGenders)) {
    return (
      <div className="flex gap-2 flex-wrap px-6">
        {searchedByOwnerName?.map((pet) => (
          <PetCard
            key={pet.ownerName + pet.petName}
            name={pet.petName}
            type={pet.petType}
            ownerName={pet.ownerName}
            ownerAge={pet.ownerAge}
            ownerGender={pet.ownerGender}
          />
        ))}
      </div>
    );
  }

  const groupedData = groupByOwnerGender();
  return selectedGenders.map((gender) => (
    <div key={gender} className="flex gap-2 flex-col px-6">
      <TypographyPBold>{gender}</TypographyPBold>
      <div className="flex gap-2 flex-wrap">
        {groupedData[gender].map((pet) => (
          <PetCard
            key={pet.ownerName + pet.petName}
            name={pet.petName}
            type={pet.petType}
            ownerName={pet.ownerName}
            ownerAge={pet.ownerAge}
            ownerGender={pet.ownerGender}
          />
        ))}
      </div>
    </div>
  ));
};

export default Pets;
