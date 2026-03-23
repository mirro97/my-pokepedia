'use client';

import SearchInput from '@/components/ui/SearchInput';
import { useDictionary } from '@/components/providers/DictionaryProvider';

interface PokemonSearchProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  onImmediateSearch: () => void;
}

const PokemonSearch = ({ searchInput, setSearchInput, onImmediateSearch }: PokemonSearchProps) => {
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
};

export default PokemonSearch;
