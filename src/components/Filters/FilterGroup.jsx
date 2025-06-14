import React from "react";
import FilterDropdown from "./FilterDropdown";

const FilterGroup = ({
  availableFilters,
  currentFilters,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <ul className="flex flex-wrap gap-4 list-none items-center">
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

        <button
          onClick={onClearFilters}
          className="text-sm font-medium text-red-600 hover:underline hover:text-red-800 transition-colors duration-200"
        >
          Tüm Filtreleri Temizle
        </button>
      </div>
    </div>
  );
};

export default FilterGroup;
