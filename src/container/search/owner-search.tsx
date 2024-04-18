"use client";

import React, { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH2 } from "@/components/ui/typography";
import { Gender } from "@/types";
import { useOwnerSearch } from "@/hooks/useOwnerSearch";

const OwnerSearch = () => {
  const {
    searchedName: ownerName,
    setSearchedName: setOwnerName,
    selectedGenders,
    setSelectedGender,
  } = useOwnerSearch();

  const genderToggle = useCallback(
    (gender: Gender) => {
      setSelectedGender(gender);
    },
    [setSelectedGender],
  );

  return (
    <div className="flex flex-col flex-1 border rounded p-4">
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
          <Label htmlFor="owner">Group by Genders</Label>
          <div className="flex gap-2">
            {Object.values(Gender).map((gen) => (
              <Badge
                key={gen}
                onClick={() => genderToggle(gen)}
                variant={selectedGenders.includes(gen) ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer"
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
  );
};

export default OwnerSearch;
