'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useMemo } from 'react';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import PokemonSearch from '@/components/pokemon/PokemonSearch';
import PokemonTypeNav from '@/components/pokemon/PokemonTypeNav';
import { PokemonCardList, PokemonGrid } from '@/components/pokemon/PokemonGrid';
import { Button } from '@/components/ui/Button';
import {
  usePokemonList,
  usePokemonSearchIndex,
  usePokemonSearchResults,
} from '@/lib/hooks';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { isNumericOnly, getErrorStatus } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';

const MAX_SEARCH_RESULTS = 20;

interface MainPageClientProps {
  lang: Locale;
}

export default function MainPageClient({ lang }: MainPageClientProps) {
  const [sentinelRef, isSentinelVisible] = useInView();
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const translate = useDictionary();

  const debouncedSearchInput = useDebouncedValue(searchInput, 500);
  useEffect(() => {
    setSearchQuery(debouncedSearchInput.trim().toLowerCase());
  }, [debouncedSearchInput]);

  const handleImmediateSearch = () => {
    setSearchQuery(searchInput.trim().toLowerCase());
  };

  const resetSearch = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  const searchIndex = usePokemonSearchIndex();
  const matchedIds = useMemo(() => {
    if (!searchQuery || isNumericOnly(searchQuery)) return [];
    return searchIndex
      .filter((entry) => entry.name.includes(searchQuery))
      .slice(0, MAX_SEARCH_RESULTS)
      .map((entry) => entry.id);
  }, [searchQuery, searchIndex]);

  const searchResults = usePokemonSearchResults(matchedIds);
  const isIdSearch = !!searchQuery && isNumericOnly(searchQuery);

  const {
    data: pokemonListData,
    fetchNextPage,
    hasNextPage,
    status: listStatus,
    error: listError,
  } = usePokemonList(isIdSearch ? searchQuery : '');

  useEffect(() => {
    if (isSentinelVisible && hasNextPage && !searchQuery) fetchNextPage();
  }, [isSentinelVisible, fetchNextPage, hasNextPage, searchQuery]);

  const isTextSearching = !!searchQuery && !isIdSearch;
  const isSearchIndexLoading = isTextSearching && searchIndex.length === 0;
  const hasNoResults = isTextSearching && searchIndex.length > 0 && matchedIds.length === 0;

  return (
    <div className="py-24 px-4 sm:px-12 flex-1">
      <PokemonSearch
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onImmediateSearch={handleImmediateSearch}
      />
      <PokemonTypeNav />
      <div className="flex justify-center">
        {!searchQuery && (
          <>
            {listStatus === 'pending' && <p>{translate('loading')}</p>}
            {listStatus === 'success' && (
              <PokemonGrid sentinelRef={sentinelRef}>
                {pokemonListData.pages.map((group: any, index: number) => (
                  <PokemonCardList key={index} pokemons={group.results ?? []} />
                ))}
              </PokemonGrid>
            )}
          </>
        )}

        {isIdSearch && (
          <>
            {listStatus === 'pending' && <p>{translate('searching')}</p>}
            {listStatus === 'error' && (
              <div className="flex flex-col items-center">
                <p className="mb-14">
                  {getErrorStatus(listError) === 404 ? translate('noResults') : translate('searchFailed')}
                </p>
                <Button onClick={resetSearch}>{translate('searchAll')}</Button>
              </div>
            )}
            {listStatus === 'success' && (
              <PokemonGrid>
                {pokemonListData.pages.map((group: any, index: number) => (
                  <PokemonCard
                    key={index}
                    pokemonIndex={group.name ?? group.results?.[0]?.name ?? ''}
                  />
                ))}
              </PokemonGrid>
            )}
          </>
        )}

        {isTextSearching && (
          <>
            {isSearchIndexLoading && <p>{translate('searching')}</p>}
            {hasNoResults && (
              <div className="flex flex-col items-center">
                <p className="mb-14">{translate('noResults')}</p>
                <Button onClick={resetSearch}>{translate('searchAll')}</Button>
              </div>
            )}
            {matchedIds.length > 0 && (
              <PokemonGrid>
                {searchResults.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemonIndex={pokemon.name} />
                ))}
              </PokemonGrid>
            )}
          </>
        )}
      </div>
    </div>
  );
}
