import { useState, useEffect } from 'react';
import { PokemonDetail, PokemonListItem } from '../types/pokemon';
import { fetchPokemonList, fetchPokemonDetail } from '../api/pokemonApi';

interface UsePokemonResult {
  pokemonList: PokemonDetail[];
  isLoading: boolean;
  error: Error | null;
}

export const usePokemon = (limit: number = 150): UsePokemonResult => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch basic Pokémon list
        const listData = await fetchPokemonList(limit);
        
        // Fetch details for each Pokémon in parallel
        const detailsPromises = listData.results.map((pokemon: PokemonListItem) => 
          fetchPokemonDetail(pokemon.url)
        );
        
        const detailsData = await Promise.all(detailsPromises);
        
        // Sort by ID to ensure correct order
        const sortedPokemon = detailsData.sort((a, b) => a.id - b.id);
        
        setPokemonList(sortedPokemon);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPokemon();
  }, [limit]);

  return { pokemonList, isLoading, error };
};