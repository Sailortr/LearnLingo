import React from "react";
import FilterDropdown from "./FilterDropdown";

const FilterGroup = ({ availableFilters, currentFilters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-6">
      <ul className="flex flex-wrap gap-4 list-none justify-start items-center">
        <FilterDropdown
          label="Language"
          name="language"
          options={availableFilters.languages}
          value={currentFilters.language}
          onChange={onFilterChange}
          placeholder="All Languages"
        />
        <FilterDropdown
          label="Level"
          name="level"
          options={availableFilters.levels}
          value={currentFilters.level}
          onChange={onFilterChange}
          placeholder="Any Level"
        />
        <FilterDropdown
          label="Price"
          name="price_per_hour"
          options={availableFilters.prices}
          value={currentFilters.price_per_hour}
          onChange={onFilterChange}
          placeholder="Any Price"
        />
      </ul>
    </div>
  );
};

export default FilterGroup;
