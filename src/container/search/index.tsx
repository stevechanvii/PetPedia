import React from "react";

import OwnerSearch from "./owner-search";
import PetSearch from "./pet-search";

const SearchBar = () => {
  return (
    <div className="flex gap-8 p-6">
      <OwnerSearch />
      <PetSearch />
    </div>
  );
};

export default SearchBar;
