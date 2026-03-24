'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { usePokemonSearchIndex, usePokemonSearchResults } from '@/hooks/useQueries';
import { isNumericOnly } from '@/lib/utils';

const MAX_SEARCH_RESULTS = 20;

export const usePokemonSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const isIdSearch = !!searchQuery && isNumericOnly(searchQuery);
  const isTextSearching = !!searchQuery && !isIdSearch;

  const searchIndex = usePokemonSearchIndex();
  const matchedIds = useMemo(() => {
    if (!searchQuery || isNumericOnly(searchQuery)) return [];
    return searchIndex
      .filter((entry) => entry.name.includes(searchQuery))
      .slice(0, MAX_SEARCH_RESULTS)
      .map((entry) => entry.id);
  }, [searchQuery, searchIndex]);

  const searchResults = usePokemonSearchResults(matchedIds);
  const isSearchIndexLoading = isTextSearching && searchIndex.length === 0;
  const hasNoResults = isTextSearching && searchIndex.length > 0 && matchedIds.length === 0;

  return {
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
  };
};
