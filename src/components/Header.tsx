import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-500 to-red-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-yellow-300" />
            <h1 className="ml-3 text-2xl font-bold text-white">Pokédex Explorer</h1>
          </div>
          <div className="text-white text-sm font-medium">
            Powered by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-200 transition-colors">PokeAPI</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;