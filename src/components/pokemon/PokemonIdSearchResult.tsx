'use client';

import PokemonCard from '@/components/pokemon/PokemonCard';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import Button from '@/components/ui/Button';
import type { PokemonDetailType } from '@/lib/types';
import { getErrorStatus } from '@/lib/utils';

interface PokemonIdSearchResultProps {
  status: string;
  error: Error | null;
  pages: (PokemonDetailType | { results: { name: string }[] })[];
  onReset: () => void;
}

export default function PokemonIdSearchResult({
  status,
  error,
  pages,
  onReset,
}: PokemonIdSearchResultProps) {
  const translate = useDictionary();

  if (status === 'pending') return <p>{translate('searching')}</p>;

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-14">
          {getErrorStatus(error) === 404 ? translate('noResults') : translate('searchFailed')}
        </p>
        <Button onClick={onReset}>{translate('searchAll')}</Button>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <PokemonGrid>
        {pages.map((group, index) => (
          <PokemonCard
            key={index}
            pokemonIndex={'name' in group ? group.name : (group.results?.[0]?.name ?? '')}
          />
        ))}
      </PokemonGrid>
    );
  }

  return null;
}
