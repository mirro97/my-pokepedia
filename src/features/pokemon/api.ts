import axios from "@/plugins/axios";
import { PokemonDetailType, PokemonAll, PokemonSpecies } from "@/types";

export const fetchByUrl = async <T = unknown>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

export const fetchPokemon = async (
  nameOrId: string
): Promise<PokemonDetailType> => {
  const response = await axios.get<PokemonDetailType>(
    `/pokemon/${nameOrId}`
  );
  return response.data;
};

const OFFSET = 19;
export const fetchPokemonList = async ({
  pageParam = 0,
  search,
}: {
  pageParam?: number;
  search?: string;
}) => {
  if (search) {
    const response = await axios.get<PokemonDetailType>(`/pokemon/${search}`);
    return response.data;
  }

  const response = await axios.get<PokemonAll>(`/pokemon`, {
    params: { limit: OFFSET, offset: pageParam },
  });
  return response.data;
};

export const fetchPokemonByType = async (typeId: string) => {
  const response = await axios.get(`/type/${typeId}`);
  return response.data;
};

export const fetchPokemonSpecies = async (
  id: string
): Promise<PokemonSpecies> => {
  const response = await axios.get<PokemonSpecies>(`/pokemon-species/${id}`);
  return response.data;
};

export const fetchAllPokemonNames = async (): Promise<PokemonAll> => {
  const response = await axios.get<PokemonAll>(`/pokemon`, {
    params: { limit: 1025, offset: 0 },
  });
  return response.data;
};
