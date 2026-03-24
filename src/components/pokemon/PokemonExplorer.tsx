'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PokemonCard from '@/components/pokemon/PokemonCard';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import PokemonIdSearchResult from '@/components/pokemon/PokemonIdSearchResult';
import PokemonNameSearchResult from '@/components/pokemon/PokemonNameSearchResult';
import PokemonSearch from '@/components/pokemon/PokemonSearch';
import PokemonTypeNav from '@/components/pokemon/PokemonTypeNav';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { usePokemonList } from '@/hooks/useQueries';
export default function PokemonExplorer() {
  const [sentinelRef, isSentinelVisible] = useInView();
  const translate = useDictionary();

  const {
    searchInput,
    setSearchInput,
    searchQuery,
    handleImmediateSearch,
    resetSearch,
    isIdSearch,
    isTextSearching,
    isSearchIndexLoading,
    hasNoResults,
    searchResults,
  } = usePokemonSearch();

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
                {pokemonListData.pages.flatMap((group) =>
                  'results' in group
                    ? group.results.map((pokemon) => (
                        <PokemonCard key={pokemon.url} pokemonIndex={pokemon.name} />
                      ))
                    : [],
                )}
              </PokemonGrid>
            )}
          </>
        )}

        {isIdSearch && (
          <PokemonIdSearchResult
            status={listStatus}
            error={listError}
            pages={pokemonListData?.pages ?? []}
            onReset={resetSearch}
          />
        )}

        {isTextSearching && (
          <PokemonNameSearchResult
            isLoading={isSearchIndexLoading}
            hasNoResults={hasNoResults}
            searchResults={searchResults}
            onReset={resetSearch}
          />
        )}
      </div>
    </div>
  );
}
