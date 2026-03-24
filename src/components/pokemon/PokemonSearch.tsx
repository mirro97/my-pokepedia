'use client';

import { useDictionary } from '@/components/providers/DictionaryProvider';
import SearchInput from '@/components/ui/SearchInput';

interface PokemonSearchProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  onImmediateSearch: () => void;
}

export default function PokemonSearch({
  searchInput,
  setSearchInput,
  onImmediateSearch,
}: PokemonSearchProps) {
  const translate = useDictionary();

  return (
    <div className="mx-auto max-w-3xl py-4">
      <SearchInput
        value={searchInput}
        placeholder={translate('searchPokemonPlaceholder')}
        onChange={setSearchInput}
        onSearch={onImmediateSearch}
      />
    </div>
  );
}
