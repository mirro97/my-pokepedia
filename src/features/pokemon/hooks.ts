import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchPokemon,
  fetchPokemonByType,
  fetchPokemonList,
  fetchPokemonSpecies,
  fetchByUrl,
} from "@/features/pokemon/api";
import {
  PokemonDetailType,
  PokemonSpecies,
  EvolutionChain,
} from "@/types";

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
