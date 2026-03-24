'use client';

import { type InfiniteData, useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { POKEMON_NAMES_KO } from '@/constants/pokemonNames';
import { useLang } from '@/hooks/useLang';
import {
  fetchAllPokemonNames,
  fetchByUrl,
  fetchPokemon,
  fetchPokemonByType,
  fetchPokemonList,
  fetchPokemonSpecies,
} from '@/lib/api';
import type { EvolutionChain, PokemonAll, PokemonDetailType, PokemonSpecies } from '@/lib/types';
import { extractIdFromUrl } from '@/lib/utils';

export const usePokemon = (nameOrId?: string) =>
  useQuery<PokemonDetailType>({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemon(nameOrId as string),
    enabled: !!nameOrId,
  });

export const usePokemonSpecies = (nameOrId?: string) =>
  useQuery<PokemonSpecies>({
    queryKey: ['pokemon-species', nameOrId],
    queryFn: () => fetchPokemonSpecies(nameOrId as string),
    enabled: !!nameOrId,
  });

export const usePokemonByType = (type?: string) =>
  useQuery({
    queryKey: ['typed-pokemonList', type],
    queryFn: () => fetchPokemonByType(type as string),
    enabled: !!type,
  });

export const usePokemonList = (search: string) => {
  type PokemonListResponse = PokemonAll | PokemonDetailType;

  return useInfiniteQuery<
    PokemonListResponse,
    Error,
    InfiniteData<PokemonListResponse>,
    string[],
    number
  >({
    queryKey: ['pokemonList', search],
    queryFn: ({ pageParam }) => fetchPokemonList({ pageParam, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if ('next' in lastPage && lastPage.next) {
        return Number(new URL(lastPage.next).searchParams.get('offset'));
      }
      return undefined;
    },
  });
};

export const useEvolutionChain = (evolutionChainUrl?: string) =>
  useQuery<EvolutionChain>({
    queryKey: ['evolution-chain', evolutionChainUrl],
    queryFn: () => fetchByUrl<EvolutionChain>(evolutionChainUrl as string),
    enabled: !!evolutionChainUrl,
  });

export const useAllPokemonNames = () =>
  useQuery<PokemonAll>({
    queryKey: ['allPokemonNames'],
    queryFn: fetchAllPokemonNames,
    staleTime: Infinity,
  });

type SearchIndexEntry = { id: number; name: string };

export const usePokemonSearchIndex = (): SearchIndexEntry[] => {
  const language = useLang();
  const { data } = useAllPokemonNames();

  return useMemo(() => {
    if (!data?.results) return [];

    return data.results.map((pokemon) => {
      const id = Number(extractIdFromUrl(pokemon.url));
      const name = language === 'ko' ? (POKEMON_NAMES_KO[id] ?? pokemon.name) : pokemon.name;
      return { id, name: name.toLowerCase() };
    });
  }, [data, language]);
};

export const usePokemonSearchResults = (matchedIds: number[]) => {
  const results = useQueries({
    queries: matchedIds.map((id) => ({
      queryKey: ['pokemon', String(id)],
      queryFn: () => fetchPokemon(String(id)),
      staleTime: 1000 * 60 * 30,
    })),
  });

  return results
    .filter((r) => r.status === 'success' && r.data)
    .map((r) => r.data as PokemonDetailType)
    .sort((a, b) => a.id - b.id);
};
