import React from 'react';
import { PokemonDetail } from '../types/pokemon';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemonList: PokemonDetail[];
  isLoading: boolean;
  onPokemonSelect?: (pokemon: PokemonDetail) => void;
  compareMode?: boolean;
  selectedPokemon?: PokemonDetail[];
}

const PokemonList: React.FC<PokemonListProps> = ({ 
  pokemonList, 
  isLoading,
  onPokemonSelect,
  compareMode,
  selectedPokemon = []
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div 
            key={index} 
            className="bg-gray-100 rounded-lg shadow-md h-64 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (pokemonList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="rounded-full bg-yellow-100 p-6 mb-4">
          <svg 
            className="h-12 w-12 text-yellow-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No Pokémon Found</h3>
        <p className="text-gray-600 max-w-md">
          We couldn't find any Pokémon matching your search criteria. 
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon.id}
          onClick={() => onPokemonSelect?.(pokemon)}
          className={`cursor-pointer ${
            compareMode && selectedPokemon.some(p => p.id === pokemon.id)
              ? 'ring-2 ring-blue-500 rounded-lg'
              : ''
          }`}
        >
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default PokemonList;