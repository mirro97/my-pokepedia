'use client';

import { useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PokemonCard from '@/components/pokemon/PokemonCard';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { POKEMON_TYPE_BG, POKEMON_TYPE_TEXT } from '@/constants/pokemon';
import { useLocalizedList } from '@/hooks/useLocalizedList';
import { usePokemonByType } from '@/hooks/useQueries';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import type { PokemonBasic } from '@/lib/types';

interface PokemonTypeItem {
  pokemon: PokemonBasic;
  slot: number;
}

interface TypeText {
  language: PokemonBasic;
  name: string;
}

const PAGE_SIZE = 20;

interface PokemonTypeExplorerProps {
  type: string;
}

export default function PokemonTypeExplorer({ type }: PokemonTypeExplorerProps) {
  const { data: typedPokemonList, isLoading } = usePokemonByType(type);
  const scrollPosition = useScrollPosition();
  const translate = useDictionary();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [sentinelRef] = useInView({
    onChange: (inView) => {
      if (inView) {
        setVisibleCount((prev) => prev + PAGE_SIZE);
      }
    },
  });

  const typeText: TypeText[] = useLocalizedList(typedPokemonList?.names);

  const allPokemon: PokemonTypeItem[] = typedPokemonList?.pokemon ?? [];
  const visiblePokemon = useMemo(
    () => allPokemon.slice(0, visibleCount),
    [allPokemon, visibleCount],
  );

  return (
    <div className="py-24 px-4 sm:px-12 flex-1">
      <div className="p-5 w-full bg-white rounded-2xl shadow-md">
        <div className="flex">
          <div className="w-8 mr-3">
            <img src={`/images/pokemon-type-images/${type}.svg`} alt={type} />
          </div>
          <span className={`text-2xl font-bold ${POKEMON_TYPE_TEXT[type] ?? ''}`}>
            {typeText?.[0]?.name}
          </span>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`fixed top-20 right-5 w-9 rounded-full overflow-hidden p-1 shadow-md ${
              POKEMON_TYPE_BG[type] ?? ''
            } ${scrollPosition < 200 ? 'hidden' : ''}`}
          >
            <img src={`/images/pokemon-type-images/${type}.svg`} alt={type} />
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center mt-10">
          <p>{translate('loading')}</p>
        </div>
      )}
      <PokemonGrid sentinelRef={visibleCount < allPokemon.length ? sentinelRef : undefined}>
        {visiblePokemon.map((data) => (
          <PokemonCard key={data.pokemon.name} pokemonIndex={data?.pokemon?.name} />
        ))}
      </PokemonGrid>
    </div>
  );
}
