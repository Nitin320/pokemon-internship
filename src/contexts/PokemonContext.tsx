import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PokemonDetail } from '../types/pokemon';

interface PokemonContextType {
  favorites: Set<number>;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    const stored = localStorage.getItem('pokemonFavorites');
    return new Set(stored ? JSON.parse(stored) : []);
  });

  const addFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: number) => {
    return favorites.has(id);
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  return (
    <PokemonContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};