'use client';

import PokemonCard from '@/components/pokemon/PokemonCard';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import Button from '@/components/ui/Button';
import type { PokemonDetailType } from '@/lib/types';

interface PokemonNameSearchResultProps {
  isLoading: boolean;
  hasNoResults: boolean;
  searchResults: PokemonDetailType[];
  onReset: () => void;
}

export default function PokemonNameSearchResult({
  isLoading,
  hasNoResults,
  searchResults,
  onReset,
}: PokemonNameSearchResultProps) {
  const translate = useDictionary();

  if (isLoading) return <p>{translate('searching')}</p>;

  if (hasNoResults) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-14">{translate('noResults')}</p>
        <Button onClick={onReset}>{translate('searchAll')}</Button>
      </div>
    );
  }

  if (searchResults.length > 0) {
    return (
      <PokemonGrid>
        {searchResults.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemonIndex={pokemon.name} />
        ))}
      </PokemonGrid>
    );
  }

  return null;
}
