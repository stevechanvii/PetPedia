import React from "react";

import OwnerSearch from "./owner-search";
import PetSearch from "./pet-search";

const SearchBar = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 p-3 sm:p-6">
      <OwnerSearch />
      <PetSearch />
    </div>
  );
};

export default SearchBar;
