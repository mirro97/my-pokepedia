import { useInfiniteQuery, useQuery, useQueries } from "@tanstack/react-query";
import {
  fetchPokemon,
  fetchPokemonByType,
  fetchPokemonList,
  fetchPokemonSpecies,
  fetchByUrl,
  fetchAllPokemonNames,
} from "@/features/pokemon/api";
import {
  PokemonDetailType,
  PokemonSpecies,
  EvolutionChain,
  PokemonAll,
} from "@/types";
import { POKEMON_NAMES_KO } from "@/shared/constants/pokemonNames";
import { useLanguageValue } from "@/shared/hooks/useLanguage";

export const usePokemon = (nameOrId?: string) =>
  useQuery<PokemonDetailType>({
    queryKey: ["pokemon", nameOrId],
    queryFn: () => fetchPokemon(nameOrId as string),
    enabled: !!nameOrId,
  });

export const usePokemonSpecies = (nameOrId?: string) =>
  useQuery<PokemonSpecies>({
    queryKey: ["pokemon-species", nameOrId],
    queryFn: () => fetchPokemonSpecies(nameOrId as string),
    enabled: !!nameOrId,
  });

export const usePokemonByUrl = <T = PokemonDetailType>(url?: string) =>
  useQuery<T>({
    queryKey: ["pokemon-url", url],
    queryFn: () => fetchByUrl<T>(url as string),
    enabled: !!url,
  });

export const usePokemonByType = (type?: string) =>
  useQuery({
    queryKey: ["typed-pokemonList", type],
    queryFn: () => fetchPokemonByType(type as string),
    enabled: !!type,
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePokemonList = (search: string) =>
  useInfiniteQuery<any>({
    queryKey: ["pokemonList", search],
    queryFn: ({ pageParam }) => fetchPokemonList({ pageParam: pageParam as number, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { next?: string }) => {
      const { next } = lastPage || {};
      if (!next) return undefined;
      return Number(new URL(next).searchParams.get("offset"));
    },
  });

export const useEvolutionChain = (evolutionChainUrl?: string) =>
  useQuery<EvolutionChain>({
    queryKey: ["evolution-chain", evolutionChainUrl],
    queryFn: () => fetchByUrl<EvolutionChain>(evolutionChainUrl as string),
    enabled: !!evolutionChainUrl,
  });

export const useAllPokemonNames = () =>
  useQuery<PokemonAll>({
    queryKey: ["allPokemonNames"],
    queryFn: fetchAllPokemonNames,
    staleTime: Infinity,
  });

type SearchIndexEntry = { id: number; name: string };

export const usePokemonSearchIndex = (): SearchIndexEntry[] => {
  const lang = useLanguageValue();
  const { data } = useAllPokemonNames();

  if (!data?.results) return [];

  return data.results.map((pokemon) => {
    const id = Number(pokemon.url.split("/").filter(Boolean).pop());
    const name = lang === "ko" ? (POKEMON_NAMES_KO[id] ?? pokemon.name) : pokemon.name;
    return { id, name: name.toLowerCase() };
  });
};

export const usePokemonSearchResults = (matchedIds: number[]) => {
  const results = useQueries({
    queries: matchedIds.map((id) => ({
      queryKey: ["pokemon", String(id)],
      queryFn: () => fetchPokemon(String(id)),
      staleTime: 1000 * 60 * 30,
    })),
  });

  return results
    .filter((r) => r.status === "success" && r.data)
    .map((r) => r.data as PokemonDetailType)
    .sort((a, b) => a.id - b.id);
};
