import axios from "axios";
import { PokemonDetailType, PokemonAll, PokemonSpecies } from "@/lib/types";

const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export async function fetchByUrl<T>(url: string): Promise<T> {
  const response = await instance.get<T>(url);
  return response.data;
}

export async function fetchPokemon(nameOrId: string): Promise<PokemonDetailType> {
  const response = await instance.get<PokemonDetailType>(`pokemon/${nameOrId}`);
  return response.data;
}

export async function fetchPokemonList({
  pageParam = 0,
  search,
}: {
  pageParam?: number;
  search?: string;
}): Promise<PokemonAll | PokemonDetailType> {
  if (search) {
    const response = await instance.get<PokemonDetailType>(
      `pokemon/${search.toLowerCase()}`
    );
    return response.data;
  }
  const response = await instance.get<PokemonAll>(
    `pokemon?offset=${pageParam}&limit=20`
  );
  return response.data;
}

export async function fetchPokemonByType(typeId: string): Promise<any> {
  const response = await instance.get(`type/${typeId}`);
  return response.data;
}

export async function fetchPokemonSpecies(id: string): Promise<PokemonSpecies> {
  const response = await instance.get<PokemonSpecies>(`pokemon-species/${id}`);
  return response.data;
}

export async function fetchAllPokemonNames(): Promise<PokemonAll> {
  const response = await instance.get<PokemonAll>(
    "pokemon?limit=100000&offset=0"
  );
  return response.data;
}
