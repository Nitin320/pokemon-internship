import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonList from './components/PokemonList';
import FavoritesList from './components/FavoritesList';
import ErrorState from './components/ErrorState';
import ErrorBoundary from './components/ErrorBoundary';
import RandomPokemon from './components/RandomPokemon';
import ComparisonModal from './components/ComparisonModal';
import { usePokemon } from './hooks/usePokemon';
import { PokemonDetail } from './types/pokemon';
import { fetchAllPokemonTypes } from './api/pokemonApi';

function App() {
  const { pokemonList, isLoading, error } = usePokemon(150);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const loadPokemonTypes = async () => {
      try {
        const types = await fetchAllPokemonTypes();
        setPokemonTypes(types);
      } catch (error) {
        console.error('Failed to load Pokémon types:', error);
      }
    };

    loadPokemonTypes();
  }, []);

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === '' || 
        pokemon.types.some(typeInfo => typeInfo.type.name === selectedType);
      return matchesSearch && matchesType;
    });
  }, [pokemonList, searchTerm, selectedType]);

  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPokemon.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPokemon, currentPage, itemsPerPage]);

  const handlePokemonSelect = (pokemon: PokemonDetail) => {
    if (!compareMode) return;

    setSelectedPokemon(prev => {
      if (prev.length >= 2) return prev;
      if (prev.find(p => p.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  };

  const handleCompareClose = () => {
    setCompareMode(false);
    setSelectedPokemon([]);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Explore Pokémon</h2>
              <div className="flex gap-4">
                <RandomPokemon 
                  onPokemonSelect={handlePokemonSelect}
                  compareMode={compareMode}
                />
                <button
                  onClick={() => setCompareMode(!compareMode)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    compareMode
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {compareMode ? 'Cancel Compare' : 'Compare Pokémon'}
                </button>
              </div>
            </div>
            
            {error ? (
              <ErrorState 
                message={error.message || 'Failed to load Pokémon data'} 
                onRetry={handleRetry}
              />
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex-1">
                    <SearchBar 
                      searchTerm={searchTerm} 
                      onSearchChange={setSearchTerm} 
                    />
                  </div>
                  
                  <TypeFilter 
                    selectedType={selectedType} 
                    onTypeChange={setSelectedType} 
                    availableTypes={pokemonTypes}
                  />

                  <button
                    onClick={() => setShowFavorites(!showFavorites)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      showFavorites
                        ? 'bg-red-100 text-red-700'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {showFavorites ? 'Show All' : 'Show Favorites'}
                  </button>
                </div>
                
                {compareMode && selectedPokemon.length === 2 && (
                  <ComparisonModal
                    pokemon1={selectedPokemon[0]}
                    pokemon2={selectedPokemon[1]}
                    onClose={handleCompareClose}
                  />
                )}
                
                {showFavorites ? (
                  <FavoritesList 
                    pokemonList={pokemonList}
                    onPokemonSelect={handlePokemonSelect}
                    compareMode={compareMode}
                    selectedPokemon={selectedPokemon}
                  />
                ) : (
                  <PokemonList 
                    pokemonList={paginatedPokemon}
                    isLoading={isLoading}
                    onPokemonSelect={handlePokemonSelect}
                    compareMode={compareMode}
                    selectedPokemon={selectedPokemon}
                  />
                )}
              </>
            )}
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Pokédex Explorer. This app is created for educational purposes.
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;