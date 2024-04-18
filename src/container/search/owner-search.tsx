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
import { Gender, Order, SortByOwner } from "@/types";
import { useStoreOwnerSearch } from "@/hooks/store/useStoreOwnerSearch";
import { useStoreSortBy } from "@/hooks/store/useStoreSortBy";
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import _ from "lodash";

type OrderIconProps = { isSelected: boolean; order: Order };
export const OrderIcon = ({ isSelected, order }: OrderIconProps) => {
  if (!isSelected) return null;
  return order === Order.Asc ? <ArrowUp size={18} /> : <ArrowDown size={18} />;
};

const OwnerSearch = () => {
  const {
    searchedName: ownerName,
    setSearchedName: setOwnerName,
    selectedGenders,
    setSelectedGender,
    reset,
  } = useStoreOwnerSearch();

  const {
    sortBy: sort,
    setSortBy: setSort,
    order,
    setOrder,
  } = useStoreSortBy();

  const genderToggle = useCallback(
    (gender: Gender) => {
      setSelectedGender(gender);
    },
    [setSelectedGender],
  );

  const sortToggle = useCallback(
    (sortByOwner: SortByOwner) => {
      // If the current sort is the same as the clicked sort, toggle the order
      if (sortByOwner === sort) {
        setOrder(order === Order.Asc ? Order.Desc : Order.Asc);
      } else {
        setSort(sortByOwner);
      }
    },
    [order, setOrder, setSort, sort],
  );

  return (
    <div className="flex flex-col flex-1 border rounded p-4">
      <div className="flex justify-between sm:justify-start gap-3">
        <TypographyH2>Owner</TypographyH2>
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
              (!_.isEmpty(selectedGenders) || ownerName) &&
                "group-hover:animate-spin",
            )}
          />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
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
            <Label htmlFor="group">Group by Genders</Label>
            <div className="flex gap-2">
              {Object.values(Gender).map((gen) => (
                <Badge
                  key={gen}
                  onClick={() => genderToggle(gen)}
                  variant={
                    selectedGenders.includes(gen) ? "default" : "outline"
                  }
                  className="px-3.5 py-1.5 cursor-pointer sm:text-sm"
                >
                  {gen}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4  flex-1">
          <div className="flex flex-col gap-2">
            <Label htmlFor="sort">Sort by</Label>
            <div className="flex gap-2">
              {Object.values(SortByOwner).map((sortByOwner) => (
                <Badge
                  key={sortByOwner}
                  onClick={() => sortToggle(sortByOwner)}
                  variant={sortByOwner === sort ? "default" : "outline"}
                  className="px-3.5 py-1.5 cursor-pointer gap-1"
                >
                  <TypographyP className="sm:text-sm">
                    {sortByOwner}
                  </TypographyP>
                  <OrderIcon isSelected={sortByOwner === sort} order={order} />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerSearch;
