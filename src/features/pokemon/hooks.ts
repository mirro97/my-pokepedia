import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchPokemon,
  fetchPokemonByType,
  fetchPokemonList,
  fetchPokemonSpecies,
  fetchByUrl,
} from "@/features/pokemon/api";

export const usePokemon = (nameOrId?: string) =>
  useQuery({
    queryKey: ["pokemon", nameOrId],
    queryFn: () => fetchPokemon(nameOrId as string),
    enabled: !!nameOrId,
  });

export const usePokemonSpecies = (nameOrId?: string) =>
  useQuery({
    queryKey: ["pokemon-species", nameOrId],
    queryFn: () => fetchPokemonSpecies(nameOrId as string),
    enabled: !!nameOrId,
  });

export const usePokemonByUrl = (url?: string) =>
  useQuery({
    queryKey: ["pokemon-url", url],
    queryFn: () => fetchByUrl(url as string),
    enabled: !!url,
  });

export const usePokemonByType = (type?: string) =>
  useQuery({
    queryKey: ["typed-pokemonList", type],
    queryFn: () => fetchPokemonByType(type as string),
    enabled: !!type,
  });

export const usePokemonList = (search: string) =>
  useInfiniteQuery({
    queryKey: ["pokemonList", search],
    queryFn: ({ pageParam }) => fetchPokemonList({ pageParam, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { next?: string }) => {
      const { next } = lastPage || {};
      if (!next) return undefined;
      return Number(new URL(next).searchParams.get("offset"));
    },
  });
