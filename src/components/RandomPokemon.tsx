import React from 'react';
import { Shuffle } from 'lucide-react';
import { fetchPokemonDetail } from '../api/pokemonApi';
import { PokemonDetail } from '../types/pokemon';

interface RandomPokemonProps {
  onPokemonSelect?: (pokemon: PokemonDetail) => void;
  compareMode?: boolean;
}

const RandomPokemon: React.FC<RandomPokemonProps> = ({ onPokemonSelect, compareMode }) => {
  const handleRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 150) + 1;
    
    if (compareMode && onPokemonSelect) {
      try {
        const pokemon = await fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        onPokemonSelect(pokemon);
      } catch (error) {
        console.error('Error fetching random Pokémon:', error);
      }
    } else {
      window.location.href = `/pokemon/${randomId}`;
    }
  };

  return (
    <button
      onClick={handleRandomPokemon}
      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      <Shuffle className="h-5 w-5" />
      Random Pokémon
    </button>
  );
};

export default RandomPokemon;