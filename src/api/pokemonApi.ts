import { PokemonDetail, PokemonListResponse } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit: number = 150): Promise<PokemonListResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon list: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

export const fetchPokemonDetail = async (url: string): Promise<PokemonDetail> => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon details: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error;
  }
};

export const fetchAllPokemonTypes = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/type`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon types: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results.map((type: { name: string }) => type.name);
  } catch (error) {
    console.error('Error fetching Pokémon types:', error);
    throw error;
  }
};