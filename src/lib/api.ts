import { PokemonDetailType, PokemonAll, PokemonSpecies } from '@/lib/types';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

const fetchOptions: RequestInit = {
  next: { revalidate: 86400 },
} as RequestInit;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchByUrl<T>(url: string): Promise<T> {
  return fetchJson<T>(url);
}

export async function fetchPokemon(nameOrId: string): Promise<PokemonDetailType> {
  return fetchJson<PokemonDetailType>(`${POKEAPI_BASE}/pokemon/${nameOrId}`);
}

export async function fetchPokemonSpecies(id: string): Promise<PokemonSpecies> {
  return fetchJson<PokemonSpecies>(`${POKEAPI_BASE}/pokemon-species/${id}`);
}

export async function fetchPokemonByType(typeId: string): Promise<any> {
  return fetchJson<any>(`${POKEAPI_BASE}/type/${typeId}`);
}

export async function fetchPokemonList({
  pageParam = 0,
  search,
}: {
  pageParam?: number;
  search?: string;
}): Promise<PokemonAll | PokemonDetailType> {
  if (search) {
    return fetchJson<PokemonDetailType>(
      `${POKEAPI_BASE}/pokemon/${search.toLowerCase()}`
    );
  }
  return fetchJson<PokemonAll>(
    `${POKEAPI_BASE}/pokemon?offset=${pageParam}&limit=20`
  );
}

export async function fetchAllPokemonNames(): Promise<PokemonAll> {
  return fetchJson<PokemonAll>(`${POKEAPI_BASE}/pokemon?limit=100000&offset=0`);
}
