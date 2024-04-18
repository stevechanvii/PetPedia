"use client";

import React, { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH2 } from "@/components/ui/typography";
import { PetType } from "@/types";
import { useStorePetSearch } from "@/hooks/store/useStorePetSearch";

const PetSearch = () => {
  const {
    selectedTypes,
    setSelectedType,
    searchedName: petName,
    setSearchedName: setPetName,
  } = useStorePetSearch();

  const typeToggle = useCallback(
    (type: PetType) => {
      setSelectedType(type);
    },
    [setSelectedType],
  );

  return (
    <div className="flex flex-col flex-1 border rounded p-6">
      <TypographyH2>Pet</TypographyH2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="pet">Search by Name</Label>
          <Input
            id="pet"
            placeholder="Pet Name"
            className="max-w-[300px]"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="type">Filter by Types</Label>
          <div className="flex gap-2">
            {Object.values(PetType).map((type) => (
              <Badge
                key={type}
                onClick={() => typeToggle(type)}
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer"
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetSearch;
