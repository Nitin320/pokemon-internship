import React from 'react';
import { PokemonType, TYPE_COLORS } from '../types/pokemon';

interface TypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  availableTypes: string[];
}

const TypeFilter: React.FC<TypeFilterProps> = ({ 
  selectedType, 
  onTypeChange, 
  availableTypes 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(e.target.value);
  };

  return (
    <div className="relative">
      <select
        value={selectedType}
        onChange={handleChange}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none 
                  focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none
                  bg-white border shadow-sm"
        aria-label="Filter by type"
      >
        <option value="">All Types</option>
        {availableTypes.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default TypeFilter;