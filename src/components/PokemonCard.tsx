import React from 'react';
import { Heart } from 'lucide-react';
import { PokemonDetail, TYPE_COLORS, PokemonType } from '../types/pokemon';
import { usePokemonContext } from '../contexts/PokemonContext';

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { isFavorite, addFavorite, removeFavorite } = usePokemonContext();
  
  const formatPokemonId = (id: number): string => {
    return `#${id.toString().padStart(3, '0')}`;
  };

  const formatPokemonName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  return (
    <div className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 transform">
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800">{formatPokemonName(pokemon.name)}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFavorite}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite(pokemon.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400'
                }`}
              />
            </button>
            <span className="text-sm font-semibold text-gray-500">
              {formatPokemonId(pokemon.id)}
            </span>
          </div>
        </div>
        
        <div className="flex-grow flex justify-center items-center my-2 bg-gray-100 rounded-lg p-2">
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
            alt={pokemon.name}
            className="h-32 w-32 object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {pokemon.types.map((typeInfo) => {
            const typeName = typeInfo.type.name as PokemonType;
            const backgroundColor = TYPE_COLORS[typeName] || '#777';
            
            return (
              <span 
                key={typeInfo.slot}
                className="px-3 py-1 text-xs font-medium text-white rounded-full"
                style={{ backgroundColor }}
              >
                {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;