"use client";

import React, { useMemo } from "react";
import { useQueryOwners } from "@/hooks/query/useQueryPets";
import { Loader } from "lucide-react";
import PetCard from "@/components/pet-card";

const Pets = () => {
  const { data: owners, isLoading, isError } = useQueryOwners();

  // Make a flat array of pets with owner details for easier category
  const flatPets = useMemo(() => {
    return owners?.flatMap((owner) =>
      (owner.pets || []).map((pet) => ({
        petName: pet.name,
        petType: pet.type,
        ownerName: owner.name,
        ownerAge: owner.age,
        ownerGender: owner.gender,
      })),
    );
  }, [owners]);

  if (isLoading) return <Loader className="animate-spin" />;
  if (isError) return <div>Error</div>;
  if (!owners) return <div>No Data</div>;

  console.log(flatPets);

  return (
    <div className="flex gap-2">
      {/* {pets.map(pet => (<PetCard key={pet.} name={pet.} />))}
       */}
      {flatPets?.map((pet) => (
        <PetCard
          key={pet.petName}
          name={pet.petName}
          type={pet.petType}
          ownerName={pet.ownerName}
          ownerAge={pet.ownerAge}
          ownerGender={pet.ownerGender}
        />
      ))}
    </div>
  );
};

export default Pets;
