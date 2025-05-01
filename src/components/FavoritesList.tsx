import React from 'react';
import { usePokemonContext } from '../contexts/PokemonContext';
import PokemonList from './PokemonList';
import { PokemonDetail } from '../types/pokemon';

interface FavoritesListProps {
  pokemonList: PokemonDetail[];
  onPokemonSelect?: (pokemon: PokemonDetail) => void;
  compareMode?: boolean;
  selectedPokemon?: PokemonDetail[];
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  pokemonList,
  onPokemonSelect,
  compareMode,
  selectedPokemon
}) => {
  const { favorites } = usePokemonContext();
  const favoritePokemon = pokemonList.filter(pokemon => favorites.has(pokemon.id));

  if (favoritePokemon.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="rounded-full bg-red-100 p-6 mb-4">
          <svg 
            className="h-12 w-12 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No Favorite Pokémon Yet</h3>
        <p className="text-gray-600 max-w-md">
          Click the heart icon on any Pokémon card to add it to your favorites!
        </p>
      </div>
    );
  }

  return (
    <PokemonList 
      pokemonList={favoritePokemon}
      isLoading={false}
      onPokemonSelect={onPokemonSelect}
      compareMode={compareMode}
      selectedPokemon={selectedPokemon}
    />
  );
};

export default FavoritesList;