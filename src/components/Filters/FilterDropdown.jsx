import React from "react";

const FilterDropdown = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <li className="relative group">
      <div className="cursor-pointer">
        <button className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none">
          {value
            ? options.find((o) => o.value === value)?.label
            : placeholder || label}
        </button>
      </div>
      <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
        <ul>
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                value === option.value
                  ? "bg-gray-200 font-semibold text-gray-900"
                  : "text-gray-600"
              }`}
              onClick={() => onChange(name, option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default FilterDropdown;
