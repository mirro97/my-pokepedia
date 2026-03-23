'use client';

import { useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { PokemonBasic } from '@/lib/types';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { PokemonGrid } from '@/components/pokemon/PokemonGrid';
import { useLocalizedList } from '@/lib/use-localized-list';
import { POKEMON_TYPE_BG, POKEMON_TYPE_TEXT } from '@/constants/pokemon';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { usePokemonByType } from '@/lib/hooks';
import { useDictionary } from '@/components/providers/DictionaryProvider';

interface PokemonTypeItem {
  pokemon: PokemonBasic;
  slot: number;
}

interface TypeText {
  language: PokemonBasic;
  name: string;
}

const PAGE_SIZE = 20;

interface Props {
  lang: string;
  type: string;
}

export default function PokemonTypeClient({ lang, type }: Props) {
  const { data: typedPokemonList, isLoading } = usePokemonByType(type);
  const scrollPosition = useScrollPosition();
  const t = useDictionary();
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
    [allPokemon, visibleCount]
  );

  return (
    <div className="py-24 px-4 sm:px-12 flex-1">
      <div className="p-5 w-full bg-[#fff] rounded-2xl shadow-md">
        <div className="flex">
          <div className="w-8 mr-3">
            <img src={`/images/pokemon-type-images/${type}.svg`} alt={type} />
          </div>
          <span className={`text-2xl font-bold ${POKEMON_TYPE_TEXT[type] ?? ''}`}>
            {typeText && typeText[0]?.name}
          </span>
          <button
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
          <p>{t('loading')}</p>
        </div>
      )}
      <PokemonGrid sentinelRef={visibleCount < allPokemon.length ? sentinelRef : undefined}>
        {visiblePokemon.map((data, index) => (
          <PokemonCard key={index} pokemonIndex={data?.pokemon?.name} />
        ))}
      </PokemonGrid>
    </div>
  );
}
