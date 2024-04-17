"use client";

import React, { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH2 } from "@/components/ui/typography";
import { Gender, PetType } from "@/types";
import { useSearch } from "@/hooks/useSearch";

const SearchBar = () => {
  const { ownerName, setOwnerName, setSelectedGender, selectedGenders } =
    useSearch();

  const genderToggle = useCallback(
    (gender: Gender) => {
      setSelectedGender(gender);
    },
    [setSelectedGender],
  );

  return (
    <div className="flex gap-8 p-6">
      <div className="flex flex-col flex-1 border rounded p-6">
        <TypographyH2>Owner</TypographyH2>
        <div className="flex flex-col  gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="owner">Search by Name</Label>
            <Input
              id="owner"
              placeholder="Owner Name"
              className="max-w-[300px]"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="owner">Group by Gender</Label>
            <div className="flex gap-2">
              {Object.values(Gender).map((gen) => (
                <Badge
                  key={gen}
                  onClick={() => genderToggle(gen)}
                  variant={
                    selectedGenders.includes(gen) ? "default" : "outline"
                  }
                  className="px-4 py-2"
                >
                  {gen}
                </Badge>
              ))}
            </div>
          </div>
          {/* <div className='flex flex-col gap-2'>
                        <Label htmlFor='owner'>Filter by Age</Label>
                    </div> */}
        </div>
      </div>
      <div className="flex flex-col flex-1 border rounded p-6">
        <TypographyH2>Pet</TypographyH2>
        <div className="flex flex-col  gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="pet">Search by Name</Label>
            <Input id="pet" placeholder="Pet Name" className="max-w-[300px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Group by Type</Label>
            <div className="flex gap-2">
              {Object.values(PetType).map((type) => (
                <Badge key={type} variant="outline" className="px-4 py-2">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
