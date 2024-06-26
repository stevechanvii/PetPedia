"use client";

import React, { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TypographyH2,
  TypographyP,
  TypographyP2,
} from "@/components/ui/typography";
import { Order, PetType, SortByPet } from "@/types";
import { useStorePetSearch } from "@/hooks/store/useStorePetSearch";
import { useStoreSortBy } from "@/hooks/store/useStoreSortBy";
import { OrderIcon } from "./owner-search";
import { Bone, Dog, Fish, PawPrint, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import _ from "lodash";

const PetIcon = ({ type }: { type: PetType }) => {
  switch (type) {
    case PetType.Cat:
      return <PawPrint size={18} />;
    case PetType.Dog:
      return <Bone size={18} />;
    case PetType.Fish:
      return <Fish size={18} />;
    default:
      return <Dog size={18} />;
  }
};

const PetSearch = () => {
  const {
    selectedTypes,
    setSelectedType,
    searchedName: petName,
    setSearchedName: setPetName,
    reset,
  } = useStorePetSearch();

  const {
    sortBy: sort,
    setSortBy: setSort,
    order,
    setOrder,
  } = useStoreSortBy();

  const typeToggle = useCallback(
    (type: PetType) => {
      setSelectedType(type);
    },
    [setSelectedType],
  );

  const sortToggle = useCallback(
    (sortByPet: SortByPet) => {
      // If the current sort is the same as the clicked sort, toggle the order
      if (sortByPet === sort) {
        setOrder(order === Order.Asc ? Order.Desc : Order.Asc);
      } else {
        setSort(sortByPet);
      }
    },
    [order, setOrder, setSort, sort],
  );

  return (
    <div className="flex flex-col flex-1 border rounded p-4">
      <div className="flex justify-between sm:justify-start gap-3">
        <TypographyH2>Pet</TypographyH2>
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          className="flex gap-1 group"
        >
          <TypographyP2>Reset</TypographyP2>
          <RefreshCw
            size={14}
            className={cn(
              (!_.isEmpty(selectedTypes) || petName) &&
                "group-hover:animate-spin",
            )}
          />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
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
                  data-testid={`badge-${type}`}
                  key={type}
                  onClick={() => typeToggle(type)}
                  variant={selectedTypes.includes(type) ? "default" : "outline"}
                  className="px-3.5 sm:text-sm py-1.5 cursor-pointer gap-1"
                >
                  <TypographyP>{type}</TypographyP>
                  <PetIcon type={type} />
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4  flex-1">
          <div className="flex flex-col gap-2">
            <Label htmlFor="sort">Sort by</Label>
            <div className="flex gap-2">
              {Object.values(SortByPet).map((sortByPet) => (
                <Badge
                  key={sortByPet}
                  onClick={() => sortToggle(sortByPet)}
                  variant={sortByPet === sort ? "default" : "outline"}
                  className="px-3.5 sm:text-sm py-1.5 cursor-pointer gap-1"
                >
                  <TypographyP>{sortByPet}</TypographyP>
                  <OrderIcon isSelected={sortByPet === sort} order={order} />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetSearch;
