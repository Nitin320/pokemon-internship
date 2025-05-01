import React from 'react';
import { X } from 'lucide-react';
import { PokemonDetail } from '../types/pokemon';

interface ComparisonModalProps {
  pokemon1: PokemonDetail | null;
  pokemon2: PokemonDetail | null;
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ pokemon1, pokemon2, onClose }) => {
  if (!pokemon1 || !pokemon2) return null;

  const formatStatName = (stat: string) => {
    return stat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Pokémon Comparison</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1" />
            <div className="text-center">
              <img
                src={pokemon1.sprites.other['official-artwork'].front_default}
                alt={pokemon1.name}
                className="w-32 h-32 mx-auto"
              />
              <h3 className="text-lg font-semibold mt-2">{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</h3>
            </div>
            <div className="text-center">
              <img
                src={pokemon2.sprites.other['official-artwork'].front_default}
                alt={pokemon2.name}
                className="w-32 h-32 mx-auto"
              />
              <h3 className="text-lg font-semibold mt-2">{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</h3>
            </div>

            {pokemon1.stats.map((stat, index) => (
              <React.Fragment key={stat.stat.name}>
                <div className="font-medium text-right pr-4 py-2 border-t">
                  {formatStatName(stat.stat.name)}
                </div>
                <div className="text-center py-2 border-t">
                  <span className={`font-semibold ${
                    stat.base_stat > pokemon2.stats[index].base_stat ? 'text-green-600' : 
                    stat.base_stat < pokemon2.stats[index].base_stat ? 'text-red-600' : ''
                  }`}>
                    {stat.base_stat}
                  </span>
                </div>
                <div className="text-center py-2 border-t">
                  <span className={`font-semibold ${
                    pokemon2.stats[index].base_stat > stat.base_stat ? 'text-green-600' : 
                    pokemon2.stats[index].base_stat < stat.base_stat ? 'text-red-600' : ''
                  }`}>
                    {pokemon2.stats[index].base_stat}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;